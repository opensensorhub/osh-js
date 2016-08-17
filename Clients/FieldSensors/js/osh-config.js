function init() {

	var hostName = "bottsgeo.simple-url.com"
	
	// global time settings    
	var startTime = "now";
	var endTime = "2080-01-01";
	
	startTime = "2016-08-15T22:30:00Z";
    endTime = "2016-08-15T22:51:06Z";
    var sync = true;
    var dataStreamTimeOut = 2000;
	
    // menu ids
    var treeMenuId = "tree-menu-";
    var mapMenuId = "map-menu-";
    var menuGroupId = "allmenus";
    
		
	//---------------------------------------------------------------//
    //------------------- Data Sources Controller -------------------//
    //---------------------------------------------------------------//

    var dataSourceController = new OSH.DataReceiver.DataReceiverController({
        replayFactor: 1.0
    });
    
        
    //--------------------------------------------------------------//
    //-------------------------  Map View  -------------------------//
    //--------------------------------------------------------------//
    var mapView = new OSH.UI.LeafletView("main-container", [],
        {autoZoomOnFirstMarker: true}
    );
    
    
    //--------------------------------------------------------------//
    //-------------------- Video Camera Entities -------------------//
    //--------------------------------------------------------------//
    
    var treeItems = [];
    
    // urn:android:device:a0e0eac2fea3f614-sos = Alex Nexus5
    addAndroidPhone("android1", "Android Phone #1", "urn:android:device:89845ed469b7edc7-sos", "urn:flir:cam:flirone:android:89845ed469b7edc7-sos");
    //addAndroidPhone("android2", "Android Phone #2", "urn:android:device:8b65f9d7048a345a-sos", null);
    
    addGeoCam("geocam101", "Geocam #101", "urn:osh:system:geocam:0101-sos");
    addGeoCam("geocam102", "Geocam #102", "urn:osh:system:geocam:0102-sos");
    //addGeoCam("geocam103", "Geocam #103", "urn:osh:system:geocam:0103-sos");
    //addGeoCam("geocam105", "Geocam #105", "urn:osh:system:geocam:0105-sos");
    
    addVirbCam("virb1", "Virb Cam #1", "urn:osh:virb1", 0);
    addVirbCam("virb2", "Virb Cam #2", "urn:osh:virb2", 0);
    
    addSoloUav("solo1", "3DR Solo", "urn:osh:solo-nav", "urn:osh:solo-video")
    
    
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
    
    var entityTreeView = new OSH.UI.EntityTreeView(entityTreeDialog.popContentDiv.id, treeItems,
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
    var rangeSlider = new OSH.UI.RangeSlider("rangeSlider",{
        startTime: "2016-08-15T22:00:00Z",
        endTime: "2016-08-15T22:51:00Z",
        refreshRate:1
    });
    
    
    dataSourceController.connectAll();
    
    
    
    
    function addAndroidPhone(entityID, entityName, offeringID, flirOfferingID) {
        
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
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
        });
        
        var locationData = new OSH.DataReceiver.LatLonAlt("Location", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/Location",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
        });

        var attitudeData = new OSH.DataReceiver.OrientationQuaternion("Orientation", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
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
                syncMasterTime: sync,
                bufferingTime: 500,
                timeOut: dataStreamTimeOut
            });
        }
        
        // create entity
        var entity = {
            id: entityID,
            name: entityName,
            dataSources: [videoData, locationData, attitudeData]
        };
        
        if (flirVideo != null)
            entity.dataSources.push(flirVideo);
        
        dataSourceController.addEntity(entity);
        
        // add item to tree
        treeItems.push({
            entity : entity,
            path: "Body Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: treeMenuId + entity.id
        })
        
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
            }),
            contextMenuId: mapMenuId+entityID                     
        });
        
        // create video views
        var videoDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog-43",
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
            width: 800,
            height: 600
        });
        
        var flirVideoDialog = null;
        if (flirVideo != null) {
            flirVideoDialog = new OSH.UI.DialogView("dialog-main-container", {
                draggable: false,
                css: "video-dialog",
                name: "FLIR Cam #1",
                show: false,
                dockable: true,
                closeable: true,
                canDisconnect : true,
                swapId: "main-container",
                connectionIds: [flirVideo.getId()]
            });
            
            var flirVideoView = new OSH.UI.MjpegView(flirVideoDialog.popContentDiv.id, {
                dataSourceId: flirVideo.getId(),
                entityId : entity.id,
                css: "video",
                cssSelected: "video-selected",
                width: 640,
                height: 480
            });
        }
        
        // add tree and map context menus
        var menuItems = [];
        menuItems.push({
            name: "Show Video",
            viewId: videoDialog.getId(),
            css: "fa fa-video-camera",
            action: "show"
        });
        
        if (flirVideoDialog != null) {
            menuItems.push({
                name: "Show FLIR Video",
                viewId: flirVideoDialog.getId(),
                css: "fa fa-video-camera",
                action: "show"
            });
        }
    
        var markerMenu = new OSH.UI.ContextMenu.CircularMenu({id:mapMenuId+entityID, groupId: menuGroupId, items: menuItems});
        var treeMenu = new OSH.UI.ContextMenu.StackMenu({id: treeMenuId+entityID, groupId: menuGroupId, items: menuItems});
        
        return entity;
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
            timeShift: 5*3600*1000, // 5h shift to get to UTC
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
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
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
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
            timeShift: 5*3600*1000, // 5h shift to get to UTC
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
        });
        
        // create entity
        var entity = {
            id: entityID,
            name: entityName,
            dataSources: [videoData, locationData, attitudeData]
        };
        dataSourceController.addEntity(entity);
        
        // add item to tree
        treeItems.push({
            entity : entity,
            path: "GeoCams",
            treeIcon : "images/cameralook.png",
            contextMenuId: treeMenuId + entity.id
        })
        
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
            }),
            contextMenuId: mapMenuId+entityID
        });
        
        // create video views
        var videoDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog-43",
            name: entityName,
            show: false,
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
        
        // add tree and map context menus
        var menuItems = [{
            name: "Show Video",
            viewId: videoDialog.getId(),
            css: "fa fa-video-camera",
            action: "show"
        }];
    
        var markerMenu = new OSH.UI.ContextMenu.CircularMenu({id:mapMenuId+entityID, groupId: menuGroupId, items: menuItems});
        var treeMenu = new OSH.UI.ContextMenu.StackMenu({id: treeMenuId+entityID, groupId: menuGroupId, items: menuItems});
        
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
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
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
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
        });
        
        // create entity
        var entity = {
            id: entityID,
            name: entityName,
            dataSources: [videoData, locationData]
        };
        dataSourceController.addEntity(entity);
        
        // add item to tree
        treeItems.push({
            entity : entity,
            path: "Body Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: treeMenuId + entity.id
        })
        
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
            }),
            contextMenuId: mapMenuId+entityID
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
        
        var videoView = new OSH.UI.FFMPEGView(videoDialog.popContentDiv.id, {
            dataSourceId: videoData.getId(),
            entityId : entity.id,
            css: "video",
            cssSelected: "video-selected",
            width: 1280,
            height: 720
        });
        
        // add tree and map context menus
        var menuItems = [{
            name: "Show Video",
            viewId: videoDialog.getId(),
            css: "fa fa-video-camera",
            action: "show"
        }];
    
        var markerMenu = new OSH.UI.ContextMenu.CircularMenu({id:mapMenuId+entityID, groupId: menuGroupId, items: menuItems});
        var treeMenu = new OSH.UI.ContextMenu.StackMenu({id: treeMenuId+entityID, groupId: menuGroupId, items: menuItems});   
        
        return entity;
    }
    
    
    function addDahuaCam(entityID, entityName, offeringID, heading) {
        
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
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
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
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
        });
        
        // create entity
        var entity = {
            id: entityID,
            name: entityName,
            dataSources: [videoData, locationData]
        };
        dataSourceController.addEntity(entity);
        
        // add item to tree
        treeItems.push({
            entity : entity,
            path: "PTZ Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: treeMenuId + entity.id
        })
        
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
            }),
            contextMenuId: mapMenuId+entityID
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
        
        var videoView = new OSH.UI.FFMPEGView(videoDialog.popContentDiv.id, {
            dataSourceId: videoData.getId(),
            entityId : entity.id,
            css: "video",
            cssSelected: "video-selected",
            width: 1280,
            height: 720
        });
        
        // add tree and map context menus
        var menuItems = [{
            name: "Show Video",
            viewId: videoDialog.getId(),
            css: "fa fa-video-camera",
            action: "show"
        }];
    
        var markerMenu = new OSH.UI.ContextMenu.CircularMenu({id:mapMenuId+entityID, groupId: menuGroupId, items: menuItems});
        var treeMenu = new OSH.UI.ContextMenu.StackMenu({id: treeMenuId+entityID, groupId: menuGroupId, items: menuItems});   
        
        // tasking controller
        var dahua1Tasking = new OSH.DataSender.PtzTasking("video-tasking", {
            protocol: "http",
            service: "SPS",
            version: "2.0",
            endpointUrl: hostName + ":8181/sensorhub/sps",
            offeringID: "urn:dahua:cam:1G0215CGAK00046"
            //offeringID: "urn:axis:cam:00408CB95A55" // for axis
        });
        
        return entity;
    }
    
    
    function addSoloUav(entityID, entityName, navOfferingID, videoOfferingID) {
        
        // create data sources
        var videoData = new OSH.DataReceiver.VideoH264("Video", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: videoOfferingID,
            observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
        });
        
        var locationData = new OSH.DataReceiver.LatLonAlt("Location", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: navOfferingID,
            observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformLocation",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
        });
        
        var attitudeData = new OSH.DataReceiver.EulerOrientation("Orientation", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: navOfferingID,
            observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformOrientation",
            startTime: startTime,
            endTime: endTime,
            replaySpeed: "1",
            syncMasterTime: sync,
            bufferingTime: 500,
            timeOut: dataStreamTimeOut
        });
        
        // create entity
        var entity = {
            id: entityID,
            name: entityName,
            dataSources: [videoData, locationData, attitudeData]
        };
        dataSourceController.addEntity(entity);
        
        // add item to tree
        treeItems.push({
            entity : entity,
            path: "UAVs",
            treeIcon : "images/drone.png",
            contextMenuId: treeMenuId + entity.id
        })
        
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
                    dataSourceIds: [attitudeData.getId()],
                    handler : function(rec,timeStamp,options) {
                        return {
                            heading: rec.heading
                        }
                    }
                },
                icon : 'images/drone.png',
                iconAnchor: [32,32],
                iconFunc : {
                    dataSourceIds: [locationData.getId()],
                    handler : function(rec,timeStamp,options) {
                        if(options.selected) {
                            return 'images/drone-selected.png'
                        } else {
                            return 'images/drone.png';
                        }
                    }
                }
            }),
            contextMenuId: mapMenuId+entityID
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
        
        var videoView = new OSH.UI.FFMPEGView(videoDialog.popContentDiv.id, {
            dataSourceId: videoData.getId(),
            entityId : entity.id,
            css: "video",
            cssSelected: "video-selected",
            width: 1280,
            height: 720
        });
        
        // add tree and map context menus
        var menuItems = [{
            name: "Show Video",
            viewId: videoDialog.getId(),
            css: "fa fa-video-camera",
            action: "show"
        }];
    
        var markerMenu = new OSH.UI.ContextMenu.CircularMenu({id:mapMenuId+entityID, groupId: menuGroupId, items: menuItems});
        var treeMenu = new OSH.UI.ContextMenu.StackMenu({id: treeMenuId+entityID, groupId: menuGroupId, items: menuItems});   
        
        return entity;
    }
}
