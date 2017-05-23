window.OSH.Services = {};

OSH.Services.WFS = BaseClass.extend({
    initialize: function (properties) {

        this.options = {};

        this.url = "";

        if(typeof(properties) !== "undefined") {
            if(properties.featureNS) {
                this.featureNS = properties.featureNS;
                this.options['featureNS'] = properties.featureNS;
            }

            if(properties.featureType) {
                this.featureType = properties.featureType;
                this.options['featureType'] = properties.featureType;
            }

            if(properties.srsName) {
                this.srsName = properties.srsName;
                this.options['srsName'] = properties.srsName;
            }

            if(properties.featurePrefix) {
                this.featurePrefix = properties.featurePrefix;
                this.options['featurePrefix'] = properties.featurePrefix;
            }

            if(properties.url) {
                this.url = properties.url;
            }
        }

        this.DOCUMENT = document.implementation.createDocument('', '', null);

        this.geometryArray = [];

        // load feature from WFS and create cesium geometry
        this.httpConnector = new OSH.DataConnector.AjaxConnector(this.url,{
            method: 'GET',
            responseType:"text"
        });

        this.httpConnector.onError = this.onError;

        this.geomType = 0; // 0 = OpenLayer
                           // 1 = Cesium

        this.xs = new XMLSerializer();


    },

    readAsOlFeatures:function(request,callback) {
        this.geomType = 0;
        this.read(request,callback);
    },

    readAsCesiumPrimitives:function(request,callback) {
        this.geomType = 1;
        this.read(request,callback);
    },

    read:function(request,callback) {
        this.httpConnector.method = "GET";

        // default projection : 3857
        this.httpConnector.onMessage = function(response) {
            this.handleWFSReadResponse(response);
            callback(this.geometryArray);
        }.bind(this);

        // sends request
        this.httpConnector.sendRequest(null,request);
    },

    onError:function(response) {},

    handleWFSReadResponse:function(response) {
        var formatWFS = new ol.format.WFS();
        var features = formatWFS.readFeatures(response);

        this.geometryArray = [];

        if(this.geomType === 0) {
            this.geometryArray = features;
        } else if(this.geomType === 1) {
            let cesiumPrimitive;

            for(let i=0;i < features.length;i++) {
                var feature = features[i];

                console.log(feature.getGeometry().getType());
                if(feature.getGeometry().getType() === "Polygon") {
                    // ol polygon to cesium primitive
                    this.geometryArray.push(this.olPolygonToCesium(feature));
                } else  if(feature.getGeometry().getType() === "Point") {
                    this.geometryArray.push(this.olMarkerToCesium(feature));
                } else if(feature.getGeometry().getType() === "LineString") {
                    this.geometryArray.push(this.olPolylineToCesium(feature));
                }
            }
        }
    },

    olMarkerToCesium:function(feature) {
        let  olGeometry = this.olGeometryCloneTo4326(feature.getGeometry(), new ol.proj.Projection({code: WFS_PROJECTION}));

        var coordinates = olGeometry.getCoordinates();

         var point = {
            show : true,
            position : Cesium.Cartesian3.fromDegrees(coordinates[0],coordinates[1],0),
            pixelOffset : new Cesium.Cartesian2(0, 0),
            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
            horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
            verticalOrigin : Cesium.VerticalOrigin.CENTER,
            scale : 1.0,
            image: './img/glyphicons_242_google_maps.png',
            color : new Cesium.Color(1.0, 1.0, 1.0, 1.0),
            isPoint:true
        };

        return point;
    },

    olPolygonToCesium:function(feature) {
        let fillGeometry, outlineGeometry,olGeometry;

        olGeometry = this.olGeometryCloneTo4326(feature.getGeometry(), new ol.proj.Projection({code: WFS_PROJECTION}));

        const rings = olGeometry.getLinearRings();
        // always update Cesium externs before adding a property
        const hierarchy = {};
        const polygonHierarchy = hierarchy;

        for (let i = 0; i < rings.length; ++i) {
            const olPos = rings[i].getCoordinates();

            let positions = [];
            for(let k=0;k < olPos.length;k++) {
                let cProjPos = olPos[k];

                // project 4326 into cartesian
                positions.push(Cesium.Cartesian3.fromDegrees(cProjPos[0],cProjPos[1],cProjPos[2]));
            }
            if (i === 0) {
                hierarchy.positions = positions;
            } else {
                if (!hierarchy.holes) {
                    hierarchy.holes = [];
                }
                hierarchy.holes.push({
                    positions
                });
            }
        }

        var polygon = new DrawHelper.PolygonPrimitive({
            positions: hierarchy.positions
            // material : Cesium.Material.fromType('Checkerboard')
        });
       // polygon.setEditable();

        // save the id for update/delete
        polygon._id = feature.getId();

        return polygon;
    },


    olPolylineToCesium:function(feature) {
        let  olGeometry = this.olGeometryCloneTo4326(feature.getGeometry(), new ol.proj.Projection({code: WFS_PROJECTION}));

        var coordinates = olGeometry.getCoordinates();

        let positions = [];

        for (let i = 0; i < coordinates.length; ++i) {
            const olPos = coordinates[i];
            positions.push(Cesium.Cartesian3.fromDegrees(olPos[0],olPos[1],olPos[2]));
        }

        var polyline = new DrawHelper.PolylinePrimitive({
            positions: positions,
            width: 5,
            geodesic: true
        });

        polyline.isPolyline = true;
        return polyline;
    },

    cesiumMarkerToOl: function (cesiumMarker) {
        var cartesian = new Cesium.Cartesian3(cesiumMarker.position.x, cesiumMarker.position.y, cesiumMarker.position.z);
        var cartographic = cesiumView.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);

        var projCoordinates = ol.proj.fromLonLat(
            [
                Cesium.Math.toDegrees(cartographic.longitude),
                Cesium.Math.toDegrees(cartographic.latitude),
                Cesium.Math.toDegrees(cartographic.height)
            ],
            WFS_PROJECTION
        );

        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point([projCoordinates[0], projCoordinates[1],projCoordinates[2]]),
            name: 'Marker',
            color: "#e91e63"
        });

        return iconFeature;
    },

    cesiumPolylineToOl: function (cesiumPolyline) {
        var lineString = new ol.geom.LineString(null);

        // support only outer ring
        var flatCoordinates = [];

        for (let i = 0; i < cesiumPolyline.positions.length; i++) {
            var cartesian = new Cesium.Cartesian3(cesiumPolyline.positions[i].x, cesiumPolyline.positions[i].y, cesiumPolyline.positions[i].z);
            var cartographic = cesiumView.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);

            var projCoordinates = ol.proj.fromLonLat(
                [Cesium.Math.toDegrees(cartographic.longitude),
                    Cesium.Math.toDegrees(cartographic.latitude),
                    0
                ],
                WFS_PROJECTION
            );

            flatCoordinates.push(projCoordinates[0], projCoordinates[1], 0);
        }

        lineString.setFlatCoordinates(ol.geom.GeometryLayout.XYZ, flatCoordinates);

        var feature = new ol.Feature({
            geometry: lineString,
            color: "#e91e63"
        });

        return feature;
    },

    cesiumPolygonToOl: function (cesiumPolygon) {
        var polygon = new ol.geom.Polygon(null);

        // support only outer ring
        var flatCoordinates = [];

        for (let i = 0; i < cesiumPolygon.positions.length - 2; i++) {
            var cartesian = new Cesium.Cartesian3(cesiumPolygon.positions[i].x, cesiumPolygon.positions[i].y, cesiumPolygon.positions[i].z);
            var cartographic = cesiumView.viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);

            var projCoordinates = ol.proj.fromLonLat(
                [Cesium.Math.toDegrees(cartographic.longitude),
                    Cesium.Math.toDegrees(cartographic.latitude),
                    0
                ],
                WFS_PROJECTION
            );

            flatCoordinates.push(projCoordinates[0], projCoordinates[1], 0);
        }

        flatCoordinates.push(flatCoordinates[0], flatCoordinates[1], flatCoordinates[2]);

        var ends = [];
        ends.push(flatCoordinates.length);

        polygon.setFlatCoordinates(
            ol.geom.GeometryLayout.XYZ, flatCoordinates, ends);


        var feature = new ol.Feature({
            geometry: polygon,
            color: "#e91e63"
        });

        feature.setId(cesiumPolygon._id);
        return feature;
    },

    olGeometryCloneTo4326:function (geometry, projection) {
        const proj4326 = ol.proj.get('EPSG:4326');
        const proj = ol.proj.get(projection);
        if (proj !== proj4326) {
            const properties = geometry.getProperties();
            geometry = geometry.clone();
            geometry.transform(proj, proj4326);
            geometry.setProperties(properties);
        }
        return geometry;
    },

    writeTransactionAsCesiumPrimitives:function(inserts,updates,deletes,type,callback) {

        if(inserts !== null) {
            if(type === "polygon"){
                this.transactWFS("insert",this.cesiumPolygonToOl(inserts),callback);
            } else if(type === "Point") {
                this.transactWFS("insert",this.cesiumMarkerToOl(inserts),callback);
            } else if(type === "polyline") {
                this.transactWFS("insert",this.cesiumPolylineToOl(inserts),callback);
            }
        }

        if(updates !== null) {
            if(type === "polygon") {
                this.transactWFS("update",this.cesiumPolygonToOl(updates),callback);
            } else if(type === "marker") {
                this.transactWFS("update",this.cesiumMarkerToOl(updates),callback);
            } else if(type === "polyline") {
                this.transactWFS("insert",this.cesiumPolylineToOl(inserts),callback);
            }
        }

        if(deletes !== null) {
            if(type === "polygon") {
                //TODO:
            } else if(type === "marker") {
                //TODO:
            } else if(type === "polyline") {
                //TODO:
            }
        }
    },

    //--------- WRITE PART ------------//
    writeTransaction:function(inserts,updates,deletes) {
        var node = this.DOCUMENT.createElementNS('http://www.opengis.net/wfs', 'Transaction');
        node.setAttribute('service', 'WFS');
        node.setAttribute('version', '1.1.0');

        node.setAttributeNS('http://www.w3.org/2001/XMLSchema-instance','xsi:schemaLocation',"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd");

        var objectStack = [];

        var obj = {node: node, 'featureNS': this.featureNS,
            'featureType': this.featureType, 'featurePrefix': this.featurePrefix,
            'srsName': this.srsName};

        if (inserts) {
            this.assign(obj, new ol.format.GML(this.options));
            ol.xml.pushSerializeAndPop(
                obj,
                ol.format.WFS.TRANSACTION_SERIALIZERS_,
                ol.xml.makeSimpleNodeFactory('Insert'),
                inserts,
                objectStack);
        }

        if (updates) {
            this.assign(obj, new ol.format.GML(this.options));

            ol.xml.pushSerializeAndPop(obj,
                ol.format.WFS.TRANSACTION_SERIALIZERS_,
                ol.xml.makeSimpleNodeFactory('Update'),
                updates,
                objectStack);
        }

        if (deletes) {
            ol.xml.pushSerializeAndPop(obj,
                ol.format.WFS.TRANSACTION_SERIALIZERS_,
                ol.xml.makeSimpleNodeFactory('Delete'), deletes,
                objectStack);
        }

        return node;
    },

    //TODO: should be move into OSH.Utils
    assign:function(target,src) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var i = 1, ii = arguments.length; i < ii; ++i) {
            var source = arguments[i];
            if (source !== undefined && source !== null) {
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        output[key] = source[key];
                    }
                }
            }
        }
        return output;
    },

    transactWFS:function(mode,f,callback) {
        var node;

        switch (mode) {
            case 'insert':
                node = this.writeTransaction([f],null,null);
                break;
            case 'update':
                node = this.writeTransaction(null, [f], null);
                break;
            case 'delete':
                node = this.writeTransaction(null, null, [f]);
                break;
        }
        var payload = this.xs.serializeToString(node);
        this.httpConnector.method = "POST";
        console.log(payload);
        this.httpConnector.sendRequest(payload);
        this.httpConnector.onSuccess = function(message) {
            console.log(message);
            callback(message);
        };
    }
});