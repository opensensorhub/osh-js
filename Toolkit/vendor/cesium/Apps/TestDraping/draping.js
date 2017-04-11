/*global require*/
require([
        '../../Source/Cesium'
    ], function(Cesium) {
    "use strict";


    var viewer = new Cesium.Viewer('cesiumContainer', {
        targetFrameRate : 10
    });

    var terrainProvider = new Cesium.CesiumTerrainProvider({
        url : '//assets.agi.com/stk-terrain/world'
    });
    viewer.terrainProvider = terrainProvider;

    viewer.camera.setView({
        destination : Cesium.Cartesian3.fromDegrees(-110.03, 39.27, 30000.0),
        orientation: {
            heading : Cesium.Math.toRadians(0),
            pitch : Cesium.Math.toRadians(-90),
            roll : 0.0
        }
    });
    viewer.clock.shouldAnimate = false;
    viewer.clock.multiplier = 1;

    var scene = viewer.scene;
    scene.copyGlobeDepth = true;
    scene._environmentState.useGlobeDepthFramebuffer = true;

    var ellipsoid = scene.globe.ellipsoid;
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement) {
        var cartesian = scene.camera.pickEllipsoid(movement.endPosition, ellipsoid);
        if (cartesian) {
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            var coords = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6) + ', ' + Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
            document.getElementById('coords').innerHTML = '<p style="display: block" />'+ coords +'<br/><p/>';
        }
     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // material
    var video = document.getElementById('vid');

//    var appearance = new Cesium.DebugAppearance({
//        attributeName : 'st'
//    })

    var oldPolygon;

    var off = 0.0;
    function animate() {

        var coords = Cesium.Cartesian3.fromDegreesArray([-110.04 + off, 39.25, -110.06 + off, 39.29, -110.00 + off, 39.29, -110.02 + off, 39.25, -110.04 + off, 39.25]);
        off += 0.0002;

        var polygon = new Cesium.PolygonGeometry({
            polygonHierarchy : {
                positions : coords
            },
            vertexFormat : Cesium.VertexFormat.POSITION,
            height: 4000,
            extrudedHeight: -10000,
            granularity : 4.0
        });

        //var geometry = Cesium.PolygonGeometry.createGeometry(polygon);

        // drone cam pos
        var camPos = Cesium.Cartesian3.fromDegrees(-110.03 + off, 39.27, 3000.0);
        var encCamPos = Cesium.EncodedCartesian3.fromCartesian(camPos);
        //var camQuat = Cesium.Transforms.headingPitchRollQuaternion(camPos, 0.0, Cesium.Math.toRadians(-180.0), 0.0);
        //var camAtt = Cesium.Matrix3.fromQuaternion(camQuat);
        var camAtt = Cesium.Matrix4.getRotation(Cesium.Transforms.northEastDownToFixedFrame(camPos), new Cesium.Matrix3());

        var appearance = new Cesium.MaterialAppearance({
            material : new Cesium.Material({
                fabric : {
                    type : 'Image',
                    uniforms : {
                        image : video,
                        //image : '../../Source/Assets/Textures/moonSmall.jpg',
                        camPosHigh : encCamPos.high,
                        camPosLow : encCamPos.low,
                        camAtt: Cesium.Matrix3.toArray(Cesium.Matrix3.transpose(camAtt, camAtt))
                    },
                    /*type: 'Color',
                    uniforms : {
                        color : new Cesium.Color(1.0, 0.0, 0.0, 0.5)
                    }*/
                    /*type : 'Checkerboard',
                    uniforms : {
                        darkColor : new Cesium.Color(1.0, 0.0, 0.0, 1.0),
                        repeat : {x:10, y:10}
                    }*/
                }
            }),
            vertexShaderSource: Cesium._shaders.ImageDrapingVS,
            fragmentShaderSource: Cesium._shaders.ImageDrapingFS
        });

        if (oldPolygon !== null) {
            viewer.scene.primitives.remove(oldPolygon);
        }

        oldPolygon = viewer.scene.primitives.add(new Cesium.Primitive({
        //oldPolygon = viewer.scene.primitives.add(new Cesium.GroundPrimitive({
            geometryInstances : new Cesium.GeometryInstance({
                geometry : polygon,
                /*attributes : {
                    color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5)
                }*/
            }),
            asynchronous : false,
            appearance : appearance
        }));


        //setTimeout(animate, 100);
    }

    animate();


}, undefined, true);