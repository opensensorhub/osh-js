function init() {

	var hostName = "bottsgeo.simple-url.com"
	var startTime = "now";
	var endTime = "2080-01-01";
	
	//---------------------------------------------------------------//
    //------------------- Data Sources Controller -------------------//
    //---------------------------------------------------------------//

    var dataSourceController = new OSH.DataReceiver.DataReceiverController({
        replayFactor: 1.0
    });
    
        
    //--------------------------------------------------------------//
    //-------------------------  Map View  -------------------------//
    //--------------------------------------------------------------//
    // leaflet map view
    var mapView = new OSH.UI.LeafletView("main-container", [],
        {autoZoomOnFirstMarker: true}
    );
    
    
    // menu ids
    var camTreeMenuId = "cam-tree-menu";
    var menuGroupId = "allmenus";
    
    
    //--------------------------------------------------------------//
    //-------------------- Video Camera Entities -------------------//
    //--------------------------------------------------------------//
    
    // urn:android:device:a0e0eac2fea3f614-sos = Alex Nexus5
    var android1Entity = addAndroidPhone("android1", "Android Phone #1", "urn:android:device:89845ed469b7edc7-sos", "urn:flir:cam:flirone:android:89845ed469b7edc7-sos");
    var android2Entity = addAndroidPhone("android2", "Android Phone #2", "urn:android:device:8b65f9d7048a345a-sos", null);
    
    var geocam101Entity = addGeoCam("geocam101", "Geocam #101", "urn:osh:system:geocam:0101-sos");
    var geocam102Entity = addGeoCam("geocam102", "Geocam #102", "urn:osh:system:geocam:0102-sos");
    var geocam103Entity = addGeoCam("geocam103", "Geocam #103", "urn:osh:system:geocam:0103-sos");
    var geocam105Entity = addGeoCam("geocam105", "Geocam #105", "urn:osh:system:geocam:0105-sos");
    
    var virb1Entity = addVirbCam("vrib1", "Virb Cam #1", "urn:osh:virb1", 95);
    var virb2Entity = addVirbCam("vrib2", "Virb Cam #2", "urn:osh:virb2", 185);
    
    
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
            entity : geocam101Entity,
            path: "GeoCams",
            treeIcon : "images/cameralook.png",
            contextMenuId: camTreeMenuId
        },{
            entity : geocam102Entity,
            path: "GeoCams",
            treeIcon : "images/cameralook.png",
            contextMenuId: camTreeMenuId
        },{
            entity : geocam105Entity,
            path: "GeoCams",
            treeIcon : "images/cameralook.png",
            contextMenuId: camTreeMenuId
        },{
            entity : geocam105Entity,
            path: "GeoCams",
            treeIcon : "images/cameralook.png",
            contextMenuId: camTreeMenuId
        },{
            entity : android1Entity,
            path: "Body Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: camTreeMenuId
        },{
            entity : android2Entity,
            path: "Body Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: camTreeMenuId
        },{
            entity : virb1Entity,
            path: "Body Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: camTreeMenuId
        },{
            entity : virb2Entity,
            path: "Body Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: camTreeMenuId
        }],
        {
            css: "tree-container"
        }
    );
    
    
    //--------------------------------------------------------------//
    //---------------------- Tasking Widget  -----------------------//
    //--------------------------------------------------------------//
    /*var taskingView = new OSH.UI.PtzTaskingView("tasking-container",{});
    taskingView.register(dahua1Tasking);
    //taskingView.register(axis1Tasking);*/
    
    
    //--------------------------------------------------------------//
    //------------------------ Time Slider  ------------------------//
    //--------------------------------------------------------------//
    /*var rangeSlider = new OSH.UI.RangeSlider("rangeSlider",{
        startTime: "2016-08-09T17:00:00Z",
        endTime: "2016-08-14T00:00:00Z",
        refreshRate:1
    });*/
    
    
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

    dataSourceController.connectAll();
    
    
    
    
    function addAndroidPhone(entityID, entityName, offeringID, flirOfferingID) {
        
        // create data sources
        var androidVideo = new OSH.DataReceiver.VideoMjpeg("Android Video", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: false,
            bufferingTime: 500
        });
        
        var androidLoc = new OSH.DataReceiver.LatLonAlt("Android Location", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/Location",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: false,
            bufferingTime: 500
        });

        var androidAtt = new OSH.DataReceiver.OrientationQuaternion("Android Orientation", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: false,
            bufferingTime: 500
        });
        
        var flirVideo = null;
        if (typeof(flirOfferingID) != "undefined" && flirOfferingID != null) {
            flirVideo = new OSH.DataReceiver.VideoMjpeg("FLIR Video", {
                protocol : "ws",
                service: "SOS",
                endpointUrl: hostName + ":8181/sensorhub/sos",
                offeringID: flirOfferingID,
                observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
                startTime: startTime,
                endTime: endTime,
                replaySpeed: "1",
                syncMasterTime: false,
                bufferingTime: 500
            });
        }
        
        // create entity
        var androidEntity = {
            id: entityID,
            name: entityName,
            dataSources: [androidVideo, androidLoc, androidAtt]
        };
        
        if (flirVideo != null)
            androidEntity.dataSources.push(flirVideo);
        
        dataSourceController.addEntity(androidEntity);
        
        // add marker to map
        mapView.addViewItem({
            name: entityName,
            entityId : androidEntity.id,
            styler : new OSH.UI.Styler.PointMarker({
                locationFunc : {
                    dataSourceIds : [androidLoc.getId()],
                    handler : function(rec) {
                        return {
                            x : rec.lon,
                            y : rec.lat,
                            z : rec.alt
                        };
                    }
                },
                orientationFunc : {
                    dataSourceIds : [androidAtt.getId()],
                    handler : function(rec) {
                        return {
                            heading : rec.heading
                        };
                    }
                },
                icon : 'images/cameralook.png',
                iconFunc : {
                    dataSourceIds: [androidLoc.getId()],
                    handler : function(rec,timeStamp,options) {
                        if(options.selected) {
                            return 'images/cameralook-selected.png'
                        } else {
                            return 'images/cameralook.png';
                        }
                    }
                }
            })                     
        });
        
        // create video views
        var androidVideoDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "android-video-dialog",
            name: entityName,
            show: true,
            dockable: true,
            closeable: true,
            canDisconnect : true,
            swapId: "main-container",
            connectionIds: [androidVideo.getId()]
        });
        
        var androidVideoView = new OSH.UI.MjpegView(androidVideoDialog.popContentDiv.id, {
            dataSourceId: androidVideo.getId(),
            entityId : androidEntity.id,
            css: "video",
            cssSelected: "video-selected",
            width: 800,
            height: 600
        });
        
        if (flirVideo != null) {
            var flirVideoDialog = new OSH.UI.DialogView("dialog-main-container", {
                draggable: false,
                css: "video-dialog",
                name: "FLIR Cam #1",
                show: true,
                dockable: true,
                closeable: true,
                canDisconnect : true,
                swapId: "main-container",
                connectionIds: [flirVideo.getId()]
            });
            
            var flirVideoView = new OSH.UI.MjpegView(flirVideoDialog.popContentDiv.id, {
                dataSourceId: flirVideo.getId(),
                entityId : androidEntity.id,
                css: "video",
                cssSelected: "video-selected",
                width: 640,
                height: 480
            });
        }
        
        return androidEntity;
    }
    
    
    function addGeoCam(entityID, entityName, offeringID) {
        
        // create data sources
        var videoData = new OSH.DataReceiver.VideoMjpeg("Video", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: false,
            bufferingTime: 500
        });
        
        var locationData = new OSH.DataReceiver.LatLonAlt("Location", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorLocation",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: false,
            bufferingTime: 500
        });

        var attitudeData = new OSH.DataReceiver.OrientationQuaternion("Orientation", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/ImuData",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: false,
            bufferingTime: 500
        });
        
        // create entity
        var entity = {
            id: entityID,
            name: entityName,
            dataSources: [videoData, locationData, attitudeData]
        };
        dataSourceController.addEntity(entity);
        
        // add marker to map
        mapView.addViewItem({
            name: entityName,
            entityId : entity.id,
            styler : new OSH.UI.Styler.PointMarker({
                locationFunc : {
                    dataSourceIds : [locationData.getId()],
                    handler : function(rec) {
                        return {
                            x : rec.lon,
                            y : rec.lat,
                            z : rec.alt
                        };
                    }
                },
                orientationFunc : {
                    dataSourceIds : [attitudeData.getId()],
                    handler : function(rec) {
                        return {
                            heading : rec.heading
                        };
                    }
                },
                icon : 'images/cameralook.png',
                iconFunc : {
                    dataSourceIds: [locationData.getId()],
                    handler : function(rec,timeStamp,options) {
                        if(options.selected) {
                            return 'images/cameralook-selected.png'
                        } else {
                            return 'images/cameralook.png';
                        }
                    }
                }
            })                     
        });
        
        // create video views
        var videoDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog",
            name: entityName,
            show: true,
            dockable: true,
            closeable: true,
            canDisconnect : true,
            swapId: "main-container",
            connectionIds: [videoData.getId()]
        });
        
        var videoView = new OSH.UI.MjpegView(videoDialog.popContentDiv.id, {
            dataSourceId: videoData.getId(),
            entityId : entity.id,
            css: "video",
            cssSelected: "video-selected",
            width: 640,
            height: 480
        });
        
        return entity;
    }

    
    function addVirbCam(entityID, entityName, offeringID, heading) {
        
        // create data sources
        var videoData = new OSH.DataReceiver.VideoH264("Video", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: false,
            bufferingTime: 500
        });
        
        var locationData = new OSH.DataReceiver.LatLonAlt("Location", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorLocation",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: false,
            bufferingTime: 500
        });
        
        // create entity
        var entity = {
            id: entityID,
            name: entityName,
            dataSources: [videoData, locationData]
        };
        dataSourceController.addEntity(entity);
        
        // add marker to map
        mapView.addViewItem({
            name: entityName,
            entityId : entity.id,
            styler : new OSH.UI.Styler.PointMarker({
                locationFunc : {
                    dataSourceIds : [locationData.getId()],
                    handler : function(rec) {
                        return {
                            x : rec.lon,
                            y : rec.lat,
                            z : rec.alt
                        };
                    }
                },
                orientation : {
                    heading : heading
                },
                icon : 'images/cameralook.png',
                iconFunc : {
                    dataSourceIds: [locationData.getId()],
                    handler : function(rec,timeStamp,options) {
                        if(options.selected) {
                            return 'images/cameralook-selected.png'
                        } else {
                            return 'images/cameralook.png';
                        }
                    }
                }
            })                     
        });
        
        // create video views
        var videoDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog",
            name: entityName,
            show: true,
            dockable: true,
            closeable: true,
            canDisconnect : true,
            swapId: "main-container",
            connectionIds: [videoData.getId()]
        });
        
        var virb1VideoView = new OSH.UI.FFMPEGView(videoDialog.popContentDiv.id, {
            dataSourceId: videoData.getId(),
            entityId : entity.id,
            css: "video",
            cssSelected: "video-selected",
            width: 1280,
            height: 720
        });
        
        return entity;
    }
    
    
    
    // TODO encapsulate these in methods
    
    /*
    //--------------------------------------------------------------//
    //------------------------ Dahua Camera  -----------------------//
    //--------------------------------------------------------------//
    var dahua1Video = new OSH.DataReceiver.VideoH264("Dahua1 Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: hostName + ":8181/sensorhub/sos",
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
        endpointUrl: hostName + ":8181/sensorhub/sos",
        offeringID: "urn:osh:dahua1",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorLocation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });
    
    var dahua1Entity = {
        id: "dahua1",
        name: "Dahua PTZ Cam #1",
        dataSources: [dahua1Video, dahua1Loc]
    };
    
    dataSourceController.addEntity(dahua1Entity);
    
    var dahua1Tasking = new OSH.DataSender.PtzTasking("video-tasking", {
        protocol: "http",
        service: "SPS",
        version: "2.0",
        endpointUrl: hostName + ":8181/sensorhub/sps",
        offeringID: "urn:dahua:cam:1G0215CGAK00046"
    });
    
    
    //--------------------------------------------------------------//
    //----------------------- Axis Camera #1 -----------------------//
    //--------------------------------------------------------------//
    var axis1Video = new OSH.DataReceiver.VideoMjpeg("Axis1 Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: hostName + ":8181/sensorhub/sos",
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
        endpointUrl: hostName + ":8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformLocation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1"
    });

    var soloAttitude = new OSH.DataReceiver.EulerOrientation("Solo Attitude", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: hostName + ":8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformOrientation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1"
    });
    
    var soloGimbal = new OSH.DataReceiver.EulerOrientation("Solo Gimbal", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: hostName + ":8181/sensorhub/sos",
        offeringID: "urn:osh:solo-nav",
        observedProperty: "http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1"
    });

    var soloVideo = new OSH.DataReceiver.VideoH264("Solo Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: hostName + ":8181/sensorhub/sos",
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
    
    dataSourceController.addEntity(soloEntity);*/

}
