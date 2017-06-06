// universal module definition
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.CesiumWFS = factory();
    }
}(this, function () {
    'use strict';

    var VERSION = "1.0.0";

    function CesiumWFS(properties) {

        properties = properties || {};

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

        this.geomType = 0; // 0 = OpenLayer
                           // 1 = Cesium

        this.xs = new XMLSerializer();
    }

    CesiumWFS.prototype.readAsOlFeatures = function(request,callback) {
        this.geomType = 0;
        this.read(request,callback);
    };

    CesiumWFS.prototype.readAsCesiumPrimitives = function(request,callback) {
        this.geomType = 1;
        this.read(request,callback);
    };

    CesiumWFS.prototype.read  = function(request,callback) {
        var httpConnector = new XMLHttpRequest();
        httpConnector.timeout = 60000;
        httpConnector.responseType = "text";

        httpConnector.onerror = this.onError;

        httpConnector.open("GET", this.url+"?"+request, true);
        var self = this;

        httpConnector.onload = function (oEvent) {
            if (httpConnector.response) {
                self.handleWFSReadResponse(httpConnector.response);
                callback(self.geometryArray);
            }
        };

        httpConnector.ontimeout = function (e) {
            console.log("Timeout");
        };

        httpConnector.send(null);
    };

    CesiumWFS.prototype.onError = function(response) {};

    CesiumWFS.prototype.handleWFSReadResponse = function(response) {
        var formatWFS = new ol.format.WFS();
        var features = formatWFS.readFeatures(response);

        this.geometryArray = [];

        if(this.geomType === 0) {
            this.geometryArray = features;
        } else if(this.geomType === 1) {
            var cesiumPrimitive;

            for(var i=0;i < features.length;i++) {
                var feature = features[i];

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
    };

    CesiumWFS.prototype.olMarkerToCesium = function(feature) {
        var  olGeometry = this.olGeometryCloneTo4326(feature.getGeometry(), new ol.proj.Projection({code: WFS_PROJECTION}));

        var coordinates = olGeometry.getCoordinates();

        return {
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
    };

    CesiumWFS.prototype.olPolygonToCesium = function(feature) {
        var fillGeometry, outlineGeometry,olGeometry;

        olGeometry = this.olGeometryCloneTo4326(feature.getGeometry(), new ol.proj.Projection({code: WFS_PROJECTION}));

        var rings = olGeometry.getLinearRings();
        // always update Cesium externs before adding a property
        var hierarchy = {};
        var polygonHierarchy = hierarchy;

        for (var i = 0; i < rings.length; ++i) {
            var olPos = rings[i].getCoordinates();

            var positions = [];
            for(var k=0;k < olPos.length;k++) {
                var cProjPos = olPos[k];

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
                    positions:positions
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
    };

    CesiumWFS.prototype.olPolylineToCesium = function(feature) {
        var  olGeometry = this.olGeometryCloneTo4326(feature.getGeometry(), new ol.proj.Projection({code: WFS_PROJECTION}));

        var coordinates = olGeometry.getCoordinates();

        var positions = [];

        for (var i = 0; i < coordinates.length; ++i) {
            var olPos = coordinates[i];
            positions.push(Cesium.Cartesian3.fromDegrees(olPos[0],olPos[1],olPos[2]));
        }

        var polyline = new DrawHelper.PolylinePrimitive({
            positions: positions,
            width: 5,
            geodesic: true
        });

        polyline.isPolyline = true;
        return polyline;
    };

    CesiumWFS.prototype.cesiumMarkerToOl = function (cesiumMarker) {
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

        return new ol.Feature({
            geometry: new ol.geom.Point([projCoordinates[0], projCoordinates[1],projCoordinates[2]]),
            name: 'Marker',
            color: "#e91e63"
        });
    };

    CesiumWFS.prototype.cesiumPolylineToOl = function (cesiumPolyline) {
        var lineString = new ol.geom.LineString(null);

        // support only outer ring
        var flatCoordinates = [];

        for (var i = 0; i < cesiumPolyline.positions.length; i++) {
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
    };

    CesiumWFS.prototype.cesiumPolygonToOl = function (cesiumPolygon) {
        var polygon = new ol.geom.Polygon(null);

        // support only outer ring
        var flatCoordinates = [];

        for (var i = 0; i < cesiumPolygon.positions.length - 2; i++) {
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
    };

    CesiumWFS.prototype.olGeometryCloneTo4326 = function (geometry, projection) {
        var proj4326 = ol.proj.get('EPSG:4326');
        var proj = ol.proj.get(projection);
        if (proj !== proj4326) {
            var properties = geometry.getProperties();
            geometry = geometry.clone();
            geometry.transform(proj, proj4326);
            geometry.setProperties(properties);
        }
        return geometry;
    };

    CesiumWFS.prototype.writeTransactionAsCesiumPrimitives = function(inserts,updates,deletes,type,callback) {

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
    };

    //--------- WRITE PART ------------//
    CesiumWFS.prototype.writeTransaction = function(inserts,updates,deletes) {
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
    };

    CesiumWFS.prototype.assign = function(target,src) {
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
    };

    CesiumWFS.prototype.transactWFS = function(mode,f,callback) {
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

        var httpConnector = new XMLHttpRequest();
        httpConnector.timeout = 60000;
        httpConnector.responseType = "text";

        httpConnector.onerror = this.onError;

        httpConnector.open("POST", this.url, true);
        httpConnector.setRequestHeader('Content-Type', 'text/xml');

        httpConnector.send(payload);

        httpConnector.onreadystatechange = function() {
            if (httpConnector.readyState < 4) {
                // while waiting response from server
            }  else if (httpConnector.readyState === 4) {                // 4 = Response from server has been completely loaded.
                if (httpConnector.status === 200 && httpConnector.status < 300) { // http status between 200 to 299 are all successful
                    callback(httpConnector.responseText);
                } else {
                    this.onError("");
                }
            }
        }.bind(this);
    };

    return CesiumWFS;
}));