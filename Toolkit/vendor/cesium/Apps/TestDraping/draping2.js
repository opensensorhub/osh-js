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
        destination : Cesium.Cartesian3.fromDegrees(-110.03, 39.27, 20000.0),
        //destination : Cesium.Cartesian3.fromDegrees(0.0, 0.0, 20000.0),
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

    var video = document.getElementById('vid');
    var oldPrimitive;

    var off = 0.0;
    function animate() {

        var camPos = Cesium.Cartesian3.fromDegrees(-110.03 + off, 39.27, 5000.0);
        //var camPos = Cesium.Cartesian3.fromDegrees(0.0 + off, 0.0, 5000.0);
        var camQuat = Cesium.Transforms.headingPitchRollQuaternion(camPos, 0.0, 0.0, Cesium.Math.toRadians(-150.0));
        var camRot = Cesium.Matrix3.fromQuaternion(camQuat);
        //var camRot = Cesium.Matrix4.getRotation(Cesium.Transforms.northEastDownToFixedFrame(camPos), new Cesium.Matrix3());
        var camProj = new Cesium.Matrix3(0.5,  0.0,  0.5,
                                         0.0,  1.0,  0.5,
                                         0.0,  0.0,  1.0);
        var camDistR = new Cesium.Cartesian3(-2.60e-01, 8.02e-02, 0.0);
        var camDistT = new Cesium.Cartesian2(-2.42e-04, 2.61e-04);

        if (oldPrimitive !== null) {
            viewer.scene.primitives.remove(oldPrimitive);
        }

        oldPrimitive = viewer.scene.primitives.add(new Cesium.ImageDrapingPrimitive({
            imageSrc: video,
            camPos: camPos,
            camRot: camRot,
            camProj: camProj,
            camDistR: camDistR,
            camDistT: camDistT,
            asynchronous : false
        }));

        off += 0.0002;
        setTimeout(animate, 100);
    }

    animate();


}, undefined, true);