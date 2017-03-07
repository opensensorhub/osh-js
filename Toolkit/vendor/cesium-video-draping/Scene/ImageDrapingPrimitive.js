/*global define*/
define([
        '../Core/BoundingSphere',
        '../Core/Cartesian3',
        '../Core/Cartographic',
        '../Core/combine',
        '../Core/defaultValue',
        '../Core/defined',
        '../Core/defineProperties',
        '../Core/destroyObject',
        '../Core/DeveloperError',
        '../Core/EncodedCartesian3',
        '../Core/Ellipsoid',
        '../Core/GeometryInstance',
        '../Core/GeometryPipeline',
        '../Core/IntersectionTests',
        '../Core/isArray',
        '../Core/Math',
        '../Core/Matrix3',
        '../Core/Matrix4',
        '../Core/OrientedBoundingBox',
        '../Core/PolygonGeometry',
        '../Core/Quaternion',
        '../Core/Ray',
        '../Core/Rectangle',
        '../Renderer/DrawCommand',
        '../Renderer/RenderState',
        '../Renderer/ShaderProgram',
        '../Renderer/ShaderSource',
        '../Shaders/ImageDrapingFS',
        '../Shaders/ImageDrapingVS',
        '../Scene/GroundPrimitive',
        '../Scene/Material',
        '../Scene/MaterialAppearance',
        '../ThirdParty/when',
        './BlendingState',
        './DepthFunction',
        './Pass',
        './PerInstanceColorAppearance',
        './Primitive',
        './SceneMode',
        './StencilFunction',
        './StencilOperation'
    ], function(
        BoundingSphere,
        Cartesian3,
        Cartographic,
        combine,
        defaultValue,
        defined,
        defineProperties,
        destroyObject,
        DeveloperError,
        EncodedCartesian3,
        Ellipsoid,
        GeometryInstance,
        GeometryPipeline,
        IntersectionTests,
        isArray,
        CesiumMath,
        Matrix3,
        Matrix4,
        OrientedBoundingBox,
        PolygonGeometry,
        Quaternion,
        Ray,
        Rectangle,
        DrawCommand,
        RenderState,
        ShaderProgram,
        ShaderSource,
        ImageDrapingFS,
        ImageDrapingVS,
        GroundPrimitive,
        Material,
        MaterialAppearance,
        when,
        BlendingState,
        DepthFunction,
        Pass,
        PerInstanceColorAppearance,
        Primitive,
        SceneMode,
        StencilFunction,
        StencilOperation) {
    "use strict";

    /**
     * An image draping primitive represents an image or video as viewed from a camera and draped over the globe primitive (ellipsoid or terrain) in the {@link Scene}.
     * <p>
     * This is a specialized primitive with a hard coded appearance. The texture is projected on terrain by computing texture coordinates directly in the fragment
     * shader w/o relying on a ray terrain-intersection computation. For this to work, the globe depth texture must be available by setting {@link Scene#scene.copyGlobeDepth}
     * and {@link Scene#_environmentState.useGlobeDepthFramebuffer} to <code>true</code>;
     * </p>
     *
     * @alias GroundPrimitive
     * @constructor
     *
     * @param {Object} [options] Object with the following properties:
     * @param {String} [options.imageSrc] Path to image, or canvas or video element.
     * @param {Cartesian3} [options.camPos] Position of camera in the globe coordinate system.
     * @param {Matrix3} [options.camRot] Rotation matrix giving orientation of camera in the globe coordinate system (this matrix is used to transform coordinates from Earth's fixed frame to camera frame).
     * @param {Matrix3} [options.camProj] Camera projection matrix (pinhole model intrisic parameters).
     * @param {Array<Double>} [options.camDist] Camera distortion coefficients.
     * @param {Boolean} [options.show=true] Determines if this primitive will be shown.
     * @param {Boolean} [options.vertexCacheOptimize=false] When <code>true</code>, geometry vertices are optimized for the pre and post-vertex-shader caches.
     * @param {Boolean} [options.interleave=false] When <code>true</code>, geometry vertex attributes are interleaved, which can slightly improve rendering performance but increases load time.
     * @param {Boolean} [options.compressVertices=true] When <code>true</code>, the geometry vertices are compressed, which will save memory.
     * @param {Boolean} [options.releaseGeometryInstances=true] When <code>true</code>, the primitive does not keep a reference to the input <code>geometryInstances</code> to save memory.
     * @param {Boolean} [options.allowPicking=false] When <code>true</code>, each geometry instance will only be pickable with {@link Scene#pick}.  When <code>false</code>, GPU memory is saved.
     * @param {Boolean} [options.asynchronous=true] Determines if the primitive will be created asynchronously or block until ready.
     * @param {Boolean} [options.debugShowBoundingVolume=false] For debugging only. Determines if this primitive's commands' bounding spheres are shown.
     *
     * @see Primitive
     *
     * @example
     * scene.primitives.add(new Cesium.ImageDrapingPrimitive({
     *   imageSrc : "mypicture.png"
     *   camAtt :
     * }));
     */
    function ImageDrapingPrimitive(options) {
        options = defaultValue(options, defaultValue.EMPTY_OBJECT);

        /**
         * Determines if the primitive will be shown.  This affects all geometry
         * instances in the primitive.
         *
         * @type Boolean
         *
         * @default true
         */
        this.show = defaultValue(options.show, true);

        /**
         * This property is for debugging only; it is not for production use nor is it optimized.
         * <p>
         * Draws the bounding sphere for each draw command in the primitive.
         * </p>
         *
         * @type {Boolean}
         *
         * @default false
         */
        this.debugShowBoundingVolume = defaultValue(options.debugShowBoundingVolume, false);

        this._imageSrc = options.imageSrc;
        this._camPos = options.camPos;
        this._camRot = defaultValue(options.camRot, new Quaternion());
        this._camProj = defaultValue(options.camProj, new Matrix3());
        this._camDistR = defaultValue(options.camDistR, [0.0, 0.0, 0.0]);
        this._camDistT = defaultValue(options.camDistT, [0.0, 0.0]);

        this._sp = undefined;
        this._spPick = undefined;

        this._rsColorPass = undefined;
        this._rsPickPass = undefined;

        this._boundingVolumes = [];
        this._boundingVolumes2D = [];

        this._ready = false;
        this._readyPromise = when.defer();

        this._primitive = undefined;

        var appearance = defaultValue(options.appearance, new PerInstanceColorAppearance({
            flat : true
        }));

        this._primitiveOptions = {
            geometryInstances : undefined,
            appearance : appearance,
            vertexCacheOptimize : defaultValue(options.vertexCacheOptimize, false),
            interleave : defaultValue(options.interleave, false),
            releaseGeometryInstances : defaultValue(options.releaseGeometryInstances, true),
            allowPicking : defaultValue(options.allowPicking, true),
            asynchronous : defaultValue(options.asynchronous, true),
            compressVertices : defaultValue(options.compressVertices, true),
            _createRenderStatesFunction : undefined,
            _createShaderProgramFunction : undefined,
            _createCommandsFunction : undefined
        };
    }

    defineProperties(ImageDrapingPrimitive.prototype, {
        /**
         * When <code>true</code>, geometry vertices are optimized for the pre and post-vertex-shader caches.
         *
         * @memberof GroundPrimitive.prototype
         *
         * @type {Boolean}
         * @readonly
         *
         * @default true
         */
        vertexCacheOptimize : {
            get : function() {
                return this._primitiveOptions.vertexCacheOptimize;
            }
        },

        /**
         * Determines if geometry vertex attributes are interleaved, which can slightly improve rendering performance.
         *
         * @memberof GroundPrimitive.prototype
         *
         * @type {Boolean}
         * @readonly
         *
         * @default false
         */
        interleave : {
            get : function() {
                return this._primitiveOptions.interleave;
            }
        },

        /**
         * When <code>true</code>, the primitive does not keep a reference to the input <code>geometryInstances</code> to save memory.
         *
         * @memberof GroundPrimitive.prototype
         *
         * @type {Boolean}
         * @readonly
         *
         * @default true
         */
        releaseGeometryInstances : {
            get : function() {
                return this._primitiveOptions.releaseGeometryInstances;
            }
        },

        /**
         * When <code>true</code>, each geometry instance will only be pickable with {@link Scene#pick}.  When <code>false</code>, GPU memory is saved.
         *
         * @memberof GroundPrimitive.prototype
         *
         * @type {Boolean}
         * @readonly
         *
         * @default true
         */
        allowPicking : {
            get : function() {
                return this._primitiveOptions.allowPicking;
            }
        },

        /**
         * Determines if the geometry instances will be created and batched on a web worker.
         *
         * @memberof GroundPrimitive.prototype
         *
         * @type {Boolean}
         * @readonly
         *
         * @default true
         */
        asynchronous : {
            get : function() {
                return this._primitiveOptions.asynchronous;
            }
        },

        /**
         * When <code>true</code>, geometry vertices are compressed, which will save memory.
         *
         * @memberof GroundPrimitive.prototype
         *
         * @type {Boolean}
         * @readonly
         *
         * @default true
         */
        compressVertices : {
            get : function() {
                return this._primitiveOptions.compressVertices;
            }
        },

        /**
         * Determines if the primitive is complete and ready to render.  If this property is
         * true, the primitive will be rendered the next time that {@link GroundPrimitive#update}
         * is called.
         *
         * @memberof GroundPrimitive.prototype
         *
         * @type {Boolean}
         * @readonly
         */
        ready : {
            get : function() {
                return this._ready;
            }
        },

        /**
         * Gets a promise that resolves when the primitive is ready to render.
         * @memberof GroundPrimitive.prototype
         * @type {Promise.<GroundPrimitive>}
         * @readonly
         */
        readyPromise : {
            get : function() {
                return this._readyPromise.promise;
            }
        }
    });

    /**
     * Determines if ImageDrapingPrimitive rendering is supported.
     *
     * @param {Scene} scene The scene.
     * @returns {Boolean} <code>true</code> if ImageDrapingPrimitives are supported; otherwise, returns <code>false</code>
     */
    ImageDrapingPrimitive.isSupported = function(scene) {
        return scene.context.depthTexture;
    };

    function computeMaximumHeight(granularity, ellipsoid) {
        /*var r = ellipsoid.maximumRadius;
        var delta = (r / Math.cos(granularity * 0.5)) - r;
        return GroundPrimitive._maxHeight + delta;*/
        return GroundPrimitive._defaultMaxTerrainHeight;
    }

    function computeMinimumHeight(granularity, ellipsoid) {
        //return GroundPrimitive._minHeight;
        return 0.0;
    }

    var colorRenderState = {
        depthTest : {
            enabled : false
        },
        depthMask : false,
        blending : BlendingState.ALPHA_BLEND
    };

    var pickRenderState = {
        depthTest : {
            enabled : false
        },
        depthMask : false
    };

    var scratchBVCartesianHigh = new Cartesian3();
    var scratchBVCartesianLow = new Cartesian3();
    var scratchBVCartesian = new Cartesian3();
    var scratchBVCartographic = new Cartographic();
    var scratchBVRectangle = new Rectangle();

    function createBoundingVolume(primitive, frameState, geometry) {
        var highPositions = geometry.attributes.position3DHigh.values;
        var lowPositions = geometry.attributes.position3DLow.values;
        var length = highPositions.length;

        var ellipsoid = frameState.mapProjection.ellipsoid;

        var minLat = Number.POSITIVE_INFINITY;
        var minLon = Number.POSITIVE_INFINITY;
        var maxLat = Number.NEGATIVE_INFINITY;
        var maxLon = Number.NEGATIVE_INFINITY;

        for (var i = 0; i < length; i +=3) {
            var highPosition = Cartesian3.unpack(highPositions, i, scratchBVCartesianHigh);
            var lowPosition = Cartesian3.unpack(lowPositions, i, scratchBVCartesianLow);

            var position = Cartesian3.add(highPosition, lowPosition, scratchBVCartesian);
            var cartographic = ellipsoid.cartesianToCartographic(position, scratchBVCartographic);

            var latitude = cartographic.latitude;
            var longitude = cartographic.longitude;

            minLat = Math.min(minLat, latitude);
            minLon = Math.min(minLon, longitude);
            maxLat = Math.max(maxLat, latitude);
            maxLon = Math.max(maxLon, longitude);
        }

        var rectangle = scratchBVRectangle;
        rectangle.north = maxLat;
        rectangle.south = minLat;
        rectangle.east = maxLon;
        rectangle.west = minLon;

        var obb = OrientedBoundingBox.fromRectangle(rectangle, GroundPrimitive._defaultMaxTerrainHeight, 0.0, ellipsoid);
        primitive._boundingVolumes.push(obb);

        if (!frameState.scene3DOnly) {
            var projection = frameState.mapProjection;
            var boundingVolume = BoundingSphere.fromRectangleWithHeights2D(rectangle, projection, GroundPrimitive._maxHeight, GroundPrimitive._minOBBHeight);
            Cartesian3.fromElements(boundingVolume.center.z, boundingVolume.center.x, boundingVolume.center.y, boundingVolume.center);
            primitive._boundingVolumes2D.push(boundingVolume);
        }
    }

    function createRenderStates(primitive, context, appearance, twoPasses) {
        if (defined(primitive._rsColorPass)) {
            return;
        }

        primitive._rsColorPass = RenderState.fromCache(colorRenderState);
        primitive._rsPickPass = RenderState.fromCache(pickRenderState);
    }


    function createShaderProgram(primitive, frameState, appearance) {
        if (defined(primitive._sp)) {
            return;
        }

        var context = frameState.context;

        var vs = Primitive._modifyShaderPosition(primitive, appearance.vertexShaderSource, frameState.scene3DOnly);
        vs = Primitive._appendShowToShader(primitive._primitive, vs);

        var fs = appearance.getFragmentShaderSource();
        var attributeLocations = primitive._primitive._attributeLocations;

        primitive._sp = ShaderProgram.replaceCache({
            context : context,
            shaderProgram : primitive._sp,
            vertexShaderSource : vs,
            fragmentShaderSource : fs,
            attributeLocations : attributeLocations
        });

        /*if (primitive._primitive.allowPicking) {
            var pickFS = new ShaderSource({
                sources : [fs],
                pickColorQualifier : 'varying'
            });
            primitive._spPick = ShaderProgram.replaceCache({
                context : context,
                shaderProgram : primitive._spPick,
                vertexShaderSource : ShaderSource.createPickVertexShaderSource(vs),
                fragmentShaderSource : pickFS,
                attributeLocations : attributeLocations
            });
        } else {
            primitive._spPick = ShaderProgram.fromCache({
                context : context,
                vertexShaderSource : vs,
                fragmentShaderSource : fs,
                attributeLocations : attributeLocations
            });
        }*/
    }

    function createCommands(groundPrimitive, appearance, material, translucent, twoPasses, colorCommands, pickCommands) {
        var primitive = groundPrimitive._primitive;

        // Create uniform map by combining uniforms from the appearance and material if either have uniforms.
        var materialUniformMap = defined(material) ? material._uniforms : undefined;
        var appearanceUniformMap = {};
        var appearanceUniforms = appearance.uniforms;
        if (defined(appearanceUniforms)) {
            // Convert to uniform map of functions for the renderer
            for (var name in appearanceUniforms) {
                if (appearanceUniforms.hasOwnProperty(name)) {
                    if (defined(materialUniformMap) && defined(materialUniformMap[name])) {
                        // Later, we could rename uniforms behind-the-scenes if needed.
                        throw new DeveloperError('Appearance and material have a uniform with the same name: ' + name);
                    }
                    appearanceUniformMap[name] = getUniformFunction(appearanceUniforms, name);
                }
            }
        }
        var uniforms = combine(appearanceUniformMap, materialUniformMap);
        if (defined(primitive.rtcCenter)) {
            uniforms.u_modifiedModelView = function() {
                return primitive._modifiedModelView;
            };
        }

        // prepare command list
        var length = primitive._va.length;
        colorCommands.length = length;
        pickCommands.length = length;
        var vaIndex = 0;

        for (var i = 0; i < length; i++) {
            var vertexArray = primitive._va[vaIndex];

            // color command
            var command = colorCommands[i];
            if (!defined(command)) {
                command = colorCommands[i] = new DrawCommand({
                    owner : groundPrimitive,
                    primitiveType : primitive._primitiveType
                });
            }

            command.vertexArray = vertexArray;
            command.renderState = groundPrimitive._rsColorPass;
            command.shaderProgram = groundPrimitive._sp;
            command.uniformMap = uniforms;
            command.pass = Pass.GROUND;

            // pick command
            command = pickCommands[i];
            if (!defined(command)) {
                command = pickCommands[i] = new DrawCommand({
                    owner : groundPrimitive,
                    primitiveType : primitive._primitiveType
                });
            }

            command.vertexArray = vertexArray;
            command.renderState = groundPrimitive._rsPickPass;
            command.shaderProgram = groundPrimitive._spPick;
            command.uniformMap = {};
            command.pass = Pass.GROUND;
        }
    }

    function updateAndQueueCommands(primitive, frameState, colorCommands, pickCommands, modelMatrix, cull, debugShowBoundingVolume, twoPasses) {

        var boundingVolumes;
        if (frameState.mode === SceneMode.SCENE3D) {
            boundingVolumes = primitive._boundingVolumes;
        } else if (frameState.mode !== SceneMode.SCENE3D && defined(primitive._boundingVolumes2D)) {
            boundingVolumes = primitive._boundingVolumes2D;
        }

        var commandList = frameState.commandList;
        var passes = frameState.passes;

        if (passes.render) {
            var colorLength = colorCommands.length;
            for (var j = 0; j < colorLength; ++j) {
                colorCommands[j].modelMatrix = modelMatrix;
                colorCommands[j].boundingVolume = boundingVolumes[Math.floor(j / 3)];
                colorCommands[j].cull = cull;
                colorCommands[j].debugShowBoundingVolume = debugShowBoundingVolume;
                commandList.push(colorCommands[j]);
            }
        }

        /*if (passes.pick) {
            var pickLength = pickCommands.length;
            for (var k = 0; k < pickLength; ++k) {
                pickCommands[k].modelMatrix = modelMatrix;
                pickCommands[k].boundingVolume = boundingVolumes[Math.floor(k / 3)];
                pickCommands[k].cull = cull;
                commandList.push(pickCommands[k]);
            }
        }*/
    }

    /**
     * Called when {@link Viewer} or {@link CesiumWidget} render the scene to
     * get the draw commands needed to render this primitive.
     * <p>
     * Do not call this function directly.  This is documented just to
     * list the exceptions that may be propagated when the scene is rendered:
     * </p>
     *
     * @exception {DeveloperError} Appearance and material have a uniform with the same name.
     */
    ImageDrapingPrimitive.prototype.update = function(frameState) {
        var context = frameState.context;
        if (!context.depthTexture || !this.show) {
            return;
        }

        if (!defined(GroundPrimitive._maxHeight)) {
            var exaggeration = frameState.terrainExaggeration;
            GroundPrimitive._maxHeight = GroundPrimitive._maxTerrainHeight * exaggeration;
            GroundPrimitive._minHeight = 0.0;//GroundPrimitive._minTerrainHeight * exaggeration;
            GroundPrimitive._minOBBHeight = GroundPrimitive._minOBBTerrainHeight * exaggeration;
        }

        if (!defined(this._primitive)) {

            // compute ground footprint on ellipsoid
            var coords = [];
            var lookDir = new Cartesian3();
            var invCamProj = Matrix3.inverse(this._camProj, new Matrix3());

            for (var i = 0; i < 4; i++) {

                var corner;
                if (i === 0) {
                    //corner = new Cartesian3(0.0, 0.0, 1.0);
                    corner = new Cartesian3(-0.5, -0.5, 1.0);
                }
                else if (i === 1) {
                    //corner = new Cartesian3(1.0, 0.0, 1.0);
                    corner = new Cartesian3(1.5, -0.5, 1.0);
                }
                else if (i === 2) {
                    //corner = new Cartesian3(1.0, 1.0, 1.0);
                    corner = new Cartesian3(1.5, 1.5, 1.0);
                }
                else if (i === 3) {
                    //corner = new Cartesian3(0.0, 1.0, 1.0);
                    corner = new Cartesian3(-0.5, 1.5, 1.0);
                }

                // transform normalized coordinates to look direction in camera frame
                Matrix3.multiplyByVector(invCamProj, corner, lookDir);

                // transform look dir to globe frame
                Matrix3.multiplyByVector(this._camRot, lookDir, lookDir);

                // intersect ray
                var ground;
                var ray = new Ray(this._camPos, lookDir);
                var intersects = IntersectionTests.rayEllipsoid(ray, Ellipsoid.WGS84);
                if (intersects == null) {
                   //ground = IntersectionTests.grazingAltitudeLocation(ray, Cesium.Ellipsoid.WGS84);
                   ground = Ray.getPoint(ray, 1000.0);
                }
                else {
                   ground = Ray.getPoint(ray, intersects.start);
                }
                coords[i] = ground;
            }

            var geometry = new PolygonGeometry({
                polygonHierarchy : {
                  positions : coords
                }
            });

            // create texture appearance w/ special shader
            var encCamPos = EncodedCartesian3.fromCartesian(this._camPos);
            var appearance = new MaterialAppearance({
                material : new Material({
                    fabric : {
                        type : 'Image',
                        uniforms : {
                            image : this._imageSrc,
                            camPosHigh : encCamPos.high,
                            camPosLow : encCamPos.low,
                            camAtt: Matrix3.toArray(Matrix3.transpose(this._camRot, new Matrix3())),
                            camProj: Matrix3.toArray(this._camProj),
                            camDistR: this._camDistR,
                            camDistT: this._camDistT
                        }
                    }
                }),
                vertexShaderSource: ImageDrapingVS,
                fragmentShaderSource: ImageDrapingFS
            });

            /*// debug appearance
            var appearance = new MaterialAppearance({
                material : new Material({
                    fabric : {
                        type: 'Color'
                    }
                })
            });*/

            var instance;
            var instanceType = geometry.constructor;
            if (defined(instanceType) && defined(instanceType.createShadowVolume)) {
                instance = new GeometryInstance({
                    geometry : instanceType.createShadowVolume(geometry, computeMinimumHeight, computeMaximumHeight)
                });
            }

            var primitiveOptions = this._primitiveOptions;
            primitiveOptions.geometryInstances = instance;
            primitiveOptions.appearance = appearance;

            var that = this;
            this._primitiveOptions._createBoundingVolumeFunction = function(frameState, geometry) {
                createBoundingVolume(that, frameState, geometry);
            };
            this._primitiveOptions._createRenderStatesFunction = function(primitive, context, appearance, twoPasses) {
                createRenderStates(that, context, appearance);
            };
            this._primitiveOptions._createShaderProgramFunction = function(primitive, frameState, appearance) {
                createShaderProgram(that, frameState, appearance);
            };
            this._primitiveOptions._createCommandsFunction = function(primitive, appearance, material, translucent, twoPasses, colorCommands, pickCommands) {
                createCommands(that, appearance, material, true, false, colorCommands, pickCommands);
            };
            this._primitiveOptions._updateAndQueueCommandsFunction = function(primitive, frameState, colorCommands, pickCommands, modelMatrix, cull, debugShowBoundingVolume, twoPasses) {
                updateAndQueueCommands(that, frameState, colorCommands, pickCommands, modelMatrix, cull, debugShowBoundingVolume, twoPasses);
            };

            this._primitive = new Primitive(primitiveOptions);
            this._primitive.readyPromise.then(function(primitive) {
                that._ready = true;

                if (that.releaseGeometryInstances) {
                    that.geometryInstance = undefined;
                }

                var error = primitive._error;
                if (!defined(error)) {
                    that._readyPromise.resolve(that);
                } else {
                    that._readyPromise.reject(error);
                }
            });
        }

        this._primitive.debugShowBoundingVolume = this.debugShowBoundingVolume;
        this._primitive.update(frameState);
    };

    /**
     * Returns the modifiable per-instance attributes for a {@link GeometryInstance}.
     *
     * @param {Object} id The id of the {@link GeometryInstance}.
     * @returns {Object} The typed array in the attribute's format or undefined if the is no instance with id.
     *
     * @exception {DeveloperError} must call update before calling getGeometryInstanceAttributes.
     *
     * @example
     * var attributes = primitive.getGeometryInstanceAttributes('an id');
     * attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUA);
     * attributes.show = Cesium.ShowGeometryInstanceAttribute.toValue(true);
     */
    ImageDrapingPrimitive.prototype.getGeometryInstanceAttributes = function(id) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(this._primitive)) {
            throw new DeveloperError('must call update before calling getGeometryInstanceAttributes');
        }
        //>>includeEnd('debug');
        return this._primitive.getGeometryInstanceAttributes(id);
    };

    /**
     * Returns true if this object was destroyed; otherwise, false.
     * <p>
     * If this object was destroyed, it should not be used; calling any function other than
     * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.
     * </p>
     *
     * @returns {Boolean} <code>true</code> if this object was destroyed; otherwise, <code>false</code>.
     *
     * @see ImageDrapingPrimitive#destroy
     */
    ImageDrapingPrimitive.prototype.isDestroyed = function() {
        return false;
    };

    /**
     * Destroys the WebGL resources held by this object.  Destroying an object allows for deterministic
     * release of WebGL resources, instead of relying on the garbage collector to destroy this object.
     * <p>
     * Once an object is destroyed, it should not be used; calling any function other than
     * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.  Therefore,
     * assign the return value (<code>undefined</code>) to the object as done in the example.
     * </p>
     *
     * @returns {undefined}
     *
     * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
     *
     * @see ImageDrapingPrimitive#isDestroyed
     *
     * @example
     * e = e && e.destroy();
     */
    ImageDrapingPrimitive.prototype.destroy = function() {
        this._primitive = this._primitive && this._primitive.destroy();
        this._sp = this._sp && this._sp.destroy();
        this._spPick = this._spPick && this._spPick.destroy();
        return destroyObject(this);
    };

    return ImageDrapingPrimitive;
});
