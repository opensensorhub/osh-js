function init() {

	var startTime = "now";
	var endTime = "2080-01-01";
	
	//---------------------------------------------------------------//
    //------------------- Data Sources Controller -------------------//
    //---------------------------------------------------------------//

    var dataSourceController = new OSH.DataReceiver.DataReceiverController({
        replayFactor: 1.0
    });
			
	//--------------------------------------------------------------//
    //------------------------ Dahua Camera  -----------------------//
    //--------------------------------------------------------------//
	var dahua1Video = new OSH.DataReceiver.VideoH264("Dahua1 Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:dahua1",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });
	
	var dahua1Loc = new OSH.DataReceiver.LatLonAlt("Dahua1 Location", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:dahua1",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorLocation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });

    var dahua1Att = new OSH.DataReceiver.EulerOrientation("Dahua1 Orientation", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:dahua1",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorOrientation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });
	
	var dahua1Entity = {
        id: "dahua1",
        name: "Dahua PTZ Cam #1",
        dataSources: [dahua1Video, dahua1Loc, dahua1Att]
    };
	
	dataSourceController.addEntity(dahua1Entity);
	
	var dahua1Tasking = new OSH.DataSender.PtzTasking("video-tasking", {
        protocol: "http",
        service: "SPS",
        version: "2.0",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sps",
        offeringID: "urn:dahua:cam:1G0215CGAK00046"
    });
	
    
	//--------------------------------------------------------------//
    //----------------------- Virb Camera #1 -----------------------//
    //--------------------------------------------------------------//
	var virb1Video = new OSH.DataReceiver.VideoH264("Virb1 Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:virb1",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });
	
	var virb1Loc = new OSH.DataReceiver.LatLonAlt("Virb1 Location", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:virb1",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorLocation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });

    /*var virb1Att = new OSH.DataReceiver.EulerOrientation("Virb1 Orientation", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:virb1",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorOrientation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });*/
	
	var virb1Entity = {
        id: "virb1",
        name: "Virb Cam #1",
        dataSources: [virb1Video, virb1Loc/*, virb1Att*/]
    };
	
	dataSourceController.addEntity(virb1Entity);
	
	
	//--------------------------------------------------------------//
    //----------------------- Virb Camera #2 -----------------------//
    //--------------------------------------------------------------//
	var virb2Video = new OSH.DataReceiver.VideoH264("Virb2 Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:virb2",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });
	
	var virb2Loc = new OSH.DataReceiver.LatLonAlt("Virb1 Location", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:virb2",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorLocation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });

    /*var virb2Att = new OSH.DataReceiver.EulerOrientation("Virb1 Orientation", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:virb2",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorOrientation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });*/
	
	var virb2Entity = {
        id: "virb2",
        name: "Virb Cam #2",
        dataSources: [virb2Video, virb2Loc/*, virb2Att*/]
    };
	
	dataSourceController.addEntity(virb2Entity);
	
	
	//--------------------------------------------------------------//
    //----------------------- Axis Camera #1 -----------------------//
    //--------------------------------------------------------------//
	var axis1Video = new OSH.DataReceiver.VideoMjpeg("Axis1 Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:axis1",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });
	
	var axis1Entity = {
        id: "axis1",
        name: "Axis PTZ Cam #1",
        dataSources: [axis1Video]
    };
	
	dataSourceController.addEntity(axis1Entity);

	var axis1Tasking = new OSH.DataSender.PtzTasking("video-tasking", {
        protocol: "http",
        service: "SPS",
        version: "2.0",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sps",
        offeringID: "urn:axis:cam:00408CB95A55"
    });
		
	
	//--------------------------------------------------------------//
    //------------------------ 3DR Solo UAV ------------------------//
    //--------------------------------------------------------------//
    
	var soloGPS = new OSH.DataReceiver.LatLonAlt("Solo GPS", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformLocation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1"
    });

    var soloAttitude = new OSH.DataReceiver.EulerOrientation("Solo Attitude", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformOrientation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1"
    });
    
    var soloGimbal = new OSH.DataReceiver.EulerOrientation("Solo Gimbal", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1"
    });

    var soloVideo = new OSH.DataReceiver.VideoH264("Solo Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "bottsgeo.simple-url.com:8181/sensorhub/sos",
        offeringID: "urn:osh:solo-video",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1"
    });
    
    var soloEntity = {
        id: "solo1",
        name: "3DR Solo",
        dataSources: [soloGPS, soloAttitude, soloGimbal, soloVideo]
    };
    
    dataSourceController.addEntity(soloEntity);


    //--------------------------------------------------------------//
    //--------------------------- Views  ---------------------------//
    //--------------------------------------------------------------//
    
    // menu ids
    var camTreeMenuId = "cam-tree-menu";
    var soloTreeMenuId = "solo-tree-menu";
    var soloMarkerMenuId = "solo-marker-menu";
    var menuGroupId = "allmenus";
    
    //--------------------------------------------------------------//
    //------------------------- Tree View  -------------------------//
    //--------------------------------------------------------------//
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
            entity : dahua1Entity,
            path: "PTZ Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: camTreeMenuId
        },{
            entity : axis1Entity,
            path: "PTZ Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: camTreeMenuId
        },{
            entity : virb1Entity,
            path: "Body Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: soloTreeMenuId
        },{
            entity : virb2Entity,
            path: "Body Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: soloTreeMenuId
        },{
            entity : soloEntity,
            path: "UAVs",
            treeIcon : "images/drone.png",
            contextMenuId: soloTreeMenuId
        }],
        {
            css: "tree-container"
        }
    );
    
    //--------------------------------------------------------------//
    //------------------------- Video Views  -----------------------//
    //--------------------------------------------------------------//
    // Dahua1
    var dahua1VideoDialog = new OSH.UI.DialogView("dialog-main-container", {
        draggable: false,
        css: "video-dialog",
        name: "Dahua PTZ Cam #1",
        show: true,
        dockable: true,
        closeable: true,
        canDisconnect : true,
        swapId: "main-container",
        connectionIds: [dahua1Video.getId()]
    });
    
    var dahua1VideoView = new OSH.UI.FFMPEGView(dahua1VideoDialog.popContentDiv.id, {
        dataSourceId: dahua1Video.getId(),
        entityId : dahua1Entity.id,
        css: "video",
        cssSelected: "video-selected",
        width: 1280,
        height: 720
    });
    
    // Virb1
    var virb1VideoDialog = new OSH.UI.DialogView("dialog-main-container", {
        draggable: false,
        css: "video-dialog",
        name: "Virb Cam #1",
        show: true,
        dockable: true,
        closeable: true,
        canDisconnect : true,
        swapId: "main-container",
        connectionIds: [virb1Video.getId()]
    });
    
    var virb1VideoView = new OSH.UI.FFMPEGView(virb1VideoDialog.popContentDiv.id, {
        dataSourceId: virb1Video.getId(),
        entityId : virb1Entity.id,
        css: "video",
        cssSelected: "video-selected",
        width: 1280,
        height: 720
    });
    
    // Virb2
    var virb2VideoDialog = new OSH.UI.DialogView("dialog-main-container", {
        draggable: false,
        css: "video-dialog",
        name: "Virb Cam #2",
        show: true,
        dockable: true,
        closeable: true,
        swapId: "main-container",
        connectionIds: [virb2Video.getId()]
    });
    
    var virb2VideoView = new OSH.UI.FFMPEGView(virb2VideoDialog.popContentDiv.id, {
        dataSourceId: virb2Video.getId(),
        entityId : virb2Entity.id,
        css: "video",
        cssSelected: "video-selected",
        width: 1280,
        height: 720
    });
    
    // Axis1
    var axis1VideoDialog = new OSH.UI.DialogView("dialog-main-container", {
        draggable: false,
        css: "video-dialog",
        name: "Axis Cam #1",
        show: false,
        dockable: true,
        closeable: true,
        swapId: "main-container",
        connectionIds: [axis1Video.getId()]
    });
    
    var axis1VideoView = new OSH.UI.MjpegView(axis1VideoDialog.popContentDiv.id, {
        dataSourceId: axis1Video.getId(),
        entityId : axis1Entity.id,
        css: "video",
        cssSelected: "video-selected",
        width: 800,
        height: 600
    });
    
    // video view    
    /*var soloVideoDialog = new OSH.UI.DialogView("dialog-main-container", {
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
    });*/
    
    
    //--------------------------------------------------------------//
    //-------------------- Markers on Map View  --------------------//
    //--------------------------------------------------------------//
    // leaflet map view
    var mapView = new OSH.UI.LeafletView("main-container",
        [{
        	name: "Dahua Cam #1",
        	entityId : dahua1Entity.id,
            styler : new OSH.UI.Styler.PointMarker({
            	locationFunc : {
                    dataSourceIds : [dahua1Loc.getId()],
                    handler : function(rec) {
                    	return {
                            x : rec.lon+4e-5,
                            y : rec.lat,
                            z : rec.alt
                        };
                    }
                },
                orientationFunc : {
                    dataSourceIds : [dahua1Loc.getId()],
                    handler : function(rec) {
                        return {
                            heading : 15
                        };
                    }
                },
                icon : 'images/cameralook.png',
                iconFunc : {
                    dataSourceIds: [dahua1Video.getId()],
                    handler : function(rec,timeStamp,options) {
                        if(options.selected) {
                            return 'images/cameralook-selected.png'
                        } else {
                            return 'images/cameralook.png';
                        }
                    }
                }
            }),
            contextMenuId: soloMarkerMenuId                     
        },
        {
            name: "Virb Cam #1",
        	entityId : virb1Entity.id,
            styler : new OSH.UI.Styler.PointMarker({
            	location: {
            		x: -86.728600,
                    y: 34.739252,
            	    z: 0
            	},
            	/*locationFunc : {
                    dataSourceIds : [virb1Loc.getId()],
                    handler : function(rec) {
                    	return {
                            x : rec.lon,
                            y : rec.lat,
                            z : rec.alt
                        };
                    }
                },*/
                orientation: {
                    heading : 185
                },
                icon : 'images/cameralook.png',
                iconFunc : {
                    dataSourceIds: [virb1Video.getId()],
                    handler : function(rec,timeStamp,options) {
                        if(options.selected) {
                            return 'images/cameralook-selected.png'
                        } else {
                            return 'images/cameralook.png';
                        }
                    }
                }
            }),
            contextMenuId: soloMarkerMenuId                     
        },
        {
            name: "Virb Cam #2",
        	entityId : virb2Entity.id,
            styler : new OSH.UI.Styler.PointMarker({
            	location: {
            		x: -86.728599,
                    y: 34.739305,
            	    z: 0
            	},
            	/*locationFunc : {
                    dataSourceIds : [virb2Loc.getId()],
                    handler : function(rec) {
                    	return {
                            x : rec.lon,
                            y : rec.lat,
                            z : rec.alt
                        };
                    }
                },*/
                orientation: {
                    heading : 5
                },
                icon : 'images/cameralook.png',
                iconFunc : {
                    dataSourceIds: [virb2Video.getId()],
                    handler : function(rec,timeStamp,options) {
                        if(options.selected) {
                            return 'images/cameralook-selected.png'
                        } else {
                            return 'images/cameralook.png';
                        }
                    }
                }
            }),
            contextMenuId: soloMarkerMenuId                     
        }],
        {autoZoomOnFirstMarker: true}
    );
    
    
    //--------------------------------------------------------------//
    //---------------------- Tasking Widget  -----------------------//
    //--------------------------------------------------------------//
    var taskingView = new OSH.UI.PtzTaskingView("tasking-container",{});
    //taskingView.register(dahua1Tasking);
    taskingView.register(axis1Tasking);
    
    
    //--------------------------------------------------------------//
    //------------------------ Time Slider  ------------------------//
    //--------------------------------------------------------------//
    var rangeSlider = new OSH.UI.RangeSlider("rangeSlider",{
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        refreshRate:1
    });
    
    
    //--------------------------------------------------------------//
    //--------------------- Contextual Menus  ----------------------//
    //--------------------------------------------------------------//

    /*var menuItems = [{
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
    var treeMenu = new OSH.UI.ContextMenu.StackMenu({id: soloTreeMenuId, groupId: menuGroupId, items: menuItems});*/

    
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
    
    dataSourceController.connectAll();
}

var takePicture = false;
function snapshotClick () {
	takePicture=true;
}
