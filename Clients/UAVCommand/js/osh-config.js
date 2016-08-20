function init() {

	//--------------------------------------------------------------//
    //------------------- Real-Time Data Sources -------------------//
    //--------------------------------------------------------------//
    /*var soloGPS = new OSH.DataReceiver.LatLonAlt("Solo GPS", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "localhost:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformLocation",
        startTime: "now",
        endTime: "2080-01-01"
    });

    var soloAttitude = new OSH.DataReceiver.EulerOrientation("Solo Attitude", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "localhost:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformOrientation",
        startTime: "now",
        endTime: "2080-01-01"
    });
    
    var soloGimbal = new OSH.DataReceiver.EulerOrientation("Solo Gimbal", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "localhost:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation",
        startTime: "now",
        endTime: "2080-01-01"
    });

    var soloVideo = new OSH.DataReceiver.VideoH264("Solo Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "localhost:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-video",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "now",
        endTime: "2080-01-01"
    });*/
	
    /*var soloGPS = new OSH.DataReceiver.LatLonAlt("Solo GPS", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformLocation",
        startTime: "now",
        endTime: "2080-01-01"
    });

    var soloAttitude = new OSH.DataReceiver.EulerOrientation("Solo Attitude", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformOrientation",
        startTime: "now",
        endTime: "2080-01-01"
    });
    
    var soloGimbal = new OSH.DataReceiver.EulerOrientation("Solo Gimbal", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation",
        startTime: "now",
        endTime: "2080-01-01"
    });

    var soloVideo = new OSH.DataReceiver.VideoH264("Solo Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-video",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "now",
        endTime: "2080-01-01"
    });*/
	
	
	//--------------------------------------------------------------//
    //------------------- Historical Data Sources ------------------//
    //--------------------------------------------------------------//
	
	/*var soloGPS = new OSH.DataReceiver.LatLonAlt("Solo GPS", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "localhost:8181/sensorhub/sos",
        offeringID: "urn:mysos:solo:nav3",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformLocation",
        startTime: "2015-12-18T14:19:11Z",
        endTime: "2015-12-18T14:30:00Z",
        replaySpeed: "1"
    });
	soloGPS.id = "gps";

    var soloAttitude = new OSH.DataReceiver.EulerOrientation("Solo Attitude", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "localhost:8181/sensorhub/sos",
        offeringID: "urn:mysos:solo:nav3",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformOrientation",
        startTime: "2015-12-18T14:19:11Z",
        endTime: "2015-12-18T14:30:00Z",
        replaySpeed: "1"
    });
    soloAttitude.id = "att";
    
    var soloGimbal = new OSH.DataReceiver.EulerOrientation("Solo Gimbal", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "localhost:8181/sensorhub/sos",
        offeringID: "urn:mysos:solo:nav3",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/GimbalOrientation__",
        startTime: "2015-12-18T14:19:11Z",
        endTime: "2015-12-18T14:30:00Z",
        replaySpeed: "1"
    });
    soloGimbal.id = "gim";

    var soloVideo = new OSH.DataReceiver.VideoH264("Solo Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "localhost:8181/sensorhub/sos",
        offeringID: "urn:mysos:solo:video3",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2015-12-18T14:19:11Z",
        endTime: "2015-12-18T14:30:00Z",
        replaySpeed: "1"
    });
    soloVideo.id = "vid";*/
    
	// Madison - Wide
	//var startTime = "2016-08-02T22:06:50Z";
	//var endTime = "2016-08-02T22:37:00Z";
	
	// Madison - Medium
	//var startTime = "2016-08-03T00:23:30Z";
	//var endTime = "2016-08-03T00:27:40Z";
	
	// Airport Road - Medium
	var startTime = "2016-08-03T18:02:00Z";
	var endTime = "2016-08-03T18:30:00Z"; //"2016-08-02T22:37:00Z";
	
	var soloGPS = new OSH.DataReceiver.LatLonAlt("Solo GPS", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformLocation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });

    var soloAttitude = new OSH.DataReceiver.EulerOrientation("Solo Attitude", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformOrientation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });
    
    var soloGimbal = new OSH.DataReceiver.EulerOrientation("Solo Gimbal", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });

    var soloVideo = new OSH.DataReceiver.VideoH264("Solo Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-video",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });
    
    
    //--------------------------------------------------------------//
    //-------------------------- Tasking ---------------------------//
    //--------------------------------------------------------------//
    /*var uavTasking = new OSH.DataSender.UavMapTasking("UAV Tasking", {
      protocol: "http",
      service: "SPS",
      version: "2.0",
      endpointUrl: "localhost:8181/sensorhub/sps",
      offeringID: "urn:osh:sensor:mavlink:solo:12345"
    });*/

    
    //--------------------------------------------------------------//
    //-------------------------- Entities --------------------------//
    //--------------------------------------------------------------//
    var soloEntity = {
        id: "solo1",
        name: "3DR Solo",
        dataSources: [soloGPS, soloAttitude, soloGimbal, soloVideo]
    };


    //--------------------------------------------------------------//
    //--------------------------- Views  ---------------------------//
    //--------------------------------------------------------------//
    
    // MSL to Ellipsoid correction
    //var mslToWgs84 = 53.5; // Toulouse
    var mslToWgs84 = -29.5+5; // Huntsville Airport Road
    //var mslToWgs84 = -29+5; // Madison
    
    // menu ids
    var soloTreeMenuId = "solo-tree-menu";
    var soloMarkerMenuId = "solo-marker-menu";
    var menuGroupId = "allmenus";
    
    // tree view
    var entityTreeDialog = new OSH.UI.DialogView(document.body.id, {
        css: "tree-dialog",
        name: "Entities",
        show: true,
        draggable: true,
        dockable: false,
        closeable: true
    });
    
    var entityTreeView = new OSH.UI.EntityTreeView(entityTreeDialog.popContentDiv.id,
        [{
            entity : soloEntity,
            path: "Sensors/Solo",
            treeIcon : "images/drone.png",
            contextMenuId: soloTreeMenuId
        }],
        {
            css: "tree-container"
        }
    );    
    
    // video view    
    var soloVideoDialog = new OSH.UI.DialogView("dialog-main-container", {
        draggable: false,
        css: "video-dialog",
        name: "UAV Video",
        show: true,
        dockable: true,
        closeable: true,
        canDisconnect : false,
        swapId: "main-container"
    });
    
    var soloVideoView = new OSH.UI.FFMPEGView(soloVideoDialog.popContentDiv.id, {
        dataSourceId: soloVideo.getId(),
        entityId : soloEntity.id,
        css: "video",
        cssSelected: "video-selected"
    });
    
    // chart view
    var altChartDialog = new OSH.UI.DialogView("dialog-main-container", {
        draggable: false,
        css: "dialog",
        name: "Solo Altitude",
        show: false,
        dockable: true,
        closeable: true,
        canDisconnect : false,
        swapId: "main-container"
    });
    
    /*var count = 0;
    var altChartView = new OSH.UI.Nvd3CurveChartView(altChartDialog.popContentDiv.id,
    [{
        styler: new OSH.UI.Styler.Curve({
            valuesFunc: {
                dataSourceIds: [soloGPS.getId()],
                handler: function (rec, timeStamp) {
                	if (rec.alt < 1)
                	    rec.alt *= 1e4; // *10^4 due to bug in Toulouse dataset
                    return {
                        x: timeStamp,
                        y: rec.alt+mslToWgs84
                    };
                }
            }
        })
    }],
    {
        yLabel: 'Altitude (m)',
        xLabel: 'Time',
        css:"chart-view",
        cssSelected: "video-selected"
    });*/

    
    
    // common point marker
    var pointMarker = new OSH.UI.Styler.PointMarker({
    	label: "3DR Solo",
        locationFunc : {
            dataSourceIds : [soloGPS.getId()],
            handler : function(rec) {
            	if (rec.alt < 1)
            	    rec.alt *= 1e4; // *10^4 due to bug in Toulouse dataset
                return {
                    x : rec.lon,
                    y : rec.lat,
                    z : rec.alt+mslToWgs84-10. // model offset
                };
            }
        },
        orientationFunc : {
            dataSourceIds : [soloAttitude.getId()],
            handler : function(rec) {
                return {
                    heading : rec.heading
                };
            }
        },
        icon: "./models/Drone+06B.glb"
    });
    
    // leaflet map view
    /*var mapView = new OSH.UI.LeafletView("main-container",
        [{
            name : "3DR Solo",
            entityId : soloEntity.id,
            styler : pointMarker,
            contextMenuId: soloMarkerMenuId                     
        }],
        {autoZoomOnFirstMarker: true}
    );*/
    
    // cesium map view
    var mapView = new OSH.UI.CesiumView("main-container",
	    [{
	    	name: "3DR Solo",
	        entityId: soloEntity.id,
	        styler:  pointMarker,
	        contextMenuId: soloMarkerMenuId
	    },
	    {
	    	name: "Geolocated Imagery",
	        entityId: soloEntity.id,
	        styler:  new OSH.UI.Styler.ImageDraping({
	        	platformLocationFunc: {
	                dataSourceIds: [soloGPS.getId()],
	                handler: function(rec) {
	                	if (rec.alt < 1)
	                	    rec.alt *= 1e4; // *10^4 due to bug in Toulouse dataset
	                    return {
	                        x: rec.lon,
	                        y: rec.lat,
	                        z: rec.alt+mslToWgs84 
	                    };
	                }
	            },
	            platformOrientationFunc: {
	                dataSourceIds: [soloAttitude.getId()],
	                handler: function(rec) {
	                    return {
	                        heading: rec.heading,
	                        pitch: rec.pitch,
	                        roll: rec.roll
	                    };
	                }
	            },
	            gimbalOrientationFunc: {
	                dataSourceIds: [soloGimbal.getId()],
	                handler: function(rec) {
	                    return {
	                        heading: rec.heading,
	                        pitch: rec.pitch,
	                        roll: rec.roll
	                    };
	                }
	            },
	            snapshotFunc: function() {
                    var enabled = takePicture;
                    takePicture = false;
                    return enabled;
	            },
	            /*GoPro Alex*/
	            /*cameraModel: {
	            	camProj: new Cesium.Matrix3(435.48/752.,     0.0,      370.20/752.,
	                                               0.0,       436.62/423.,  216.52/423.,
	                                               0.0,          0.0,        1.0),
	                camDistR: new Cesium.Cartesian3(-2.60e-01, 8.02e-02, 0.0),
	                camDistT: new Cesium.Cartesian2(-2.42e-04, 2.61e-04)
	            },*/
	            /*GoPro Mike*/
	            cameraModel: {
	            	camProj: new Cesium.Matrix3(747.963/1280.,     0.0,       650.66/1280.,
	                                               0.0,        769.576/738.,  373.206/738.,
	                                               0.0,            0.0,          1.0),
	                camDistR: new Cesium.Cartesian3(-2.644e-01, 8.4e-02, 0.0),
	                camDistT: new Cesium.Cartesian2(-8.688e-04, 6.123e-04)
	            },
	            imageSrc: $$('#' + soloVideoView.getId() + ' canvas')[0]
	        })
	    }]
    );
    
    // add snapshot button
    var snapshotBtn = new Element('a', { 'class': 'snapshot-btn fa fa-camera fa-3x', 'onclick': 'snapshotClick()' });
    var parentDiv = $('body');
    parentDiv.insertBefore(snapshotBtn, parentDiv.children[0]);
    
    
    // time slider view
    /*var rangeSlider = new OSH.UI.RangeSlider("rangeSlider",{
        startTime: soloGPS.options.startTime,
        endTime: soloGPS.options.endTime,
        dataSourcesId: [soloGPS.id]
    });*/
    
    
    //--------------------------------------------------------------//
    //--------------------- Contextual Menus  ----------------------//
    //--------------------------------------------------------------//

    var menuItems = [{
        name: "Show Video",
        viewId: soloVideoDialog.getId(),
        css: "fa fa-video-camera",
        action: "show"
    },{
        name: "Show Altitude Chart",
        viewId: altChartDialog.getId(),
        css: "fa fa-bar-chart",
        action: "show"
    },{
        name: "TakeOff",
        viewId: "",
        css: "fa fa-upload",
        action: "uav:takeoff"
    },{
        name: "Land",
        viewId: "",
        css: "fa fa-download",
        action: "uav:land"
    }];
    
    var markerMenu = new OSH.UI.ContextMenu.CircularMenu({id: soloMarkerMenuId, groupId: menuGroupId, items: menuItems});
    var treeMenu = new OSH.UI.ContextMenu.StackMenu({id: soloTreeMenuId, groupId: menuGroupId, items: menuItems});

    
    // create map menu
    var mapmenu = new OSH.UI.ContextMenu.CircularMenu({
    	id: "map-menu",
    	groupId: menuGroupId,
        items: [{
            name: "Go Here",
            viewId: mapView.getId(),
            css: "fa fa-crosshairs fa-3x",
            action: "uav:goto"
        },{
            name: "Orbit Here",
            viewId: mapView.getId(),
            css: "fa fa-undo fa-3x",
            action: "uav:orbit"
        },{
            name: "Look Here",
            viewId: mapView.getId(),
            css: "fa fa-eye fa-3x",
            action: "uav:lookat"
        },{
            name: "Land Here",
            viewId: mapView.getId(),
            css: "fa fa-download fa-3x",
            action: "uav:land"
        }]
    });
    
    /*mapView.map.on('contextmenu', function (e) {
        if (e.originalEvent.preventDefault != undefined)
            e.originalEvent.preventDefault();
        if (e.originalEvent.stopPropagation != undefined)
            e.originalEvent.stopPropagation();
        mapmenu.show({
            div: document.getElementById("main-container"),
            x: e.originalEvent.clientX,
            y: e.originalEvent.clientY,
            geoLat: e.latlng.lat,
            geoLon: e.latlng.lng
        });
    });*/

    
    //---------------------------------------------------------------//
    //------------------- Data Sources Controller -------------------//
    //---------------------------------------------------------------//

    var dataSourceController = new OSH.DataReceiver.DataReceiverController({
        replayFactor: 1.0
    });

    dataSourceController.addEntity(soloEntity, true);
    dataSourceController.connectAll();
}

var takePicture = false;
function snapshotClick () {
	takePicture=true;
}
