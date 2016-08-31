function init() {

	var hostName = "bottsgeo.simple-url.com";
	
	// global time settings    
	//var startTime = "now";
	//var endTime = "2080-01-01";
	
	// 1st field test Madison
	//var startTime = "2016-08-15T22:30:00Z";
    //var endTime = "2016-08-15T22:51:06Z";
	
	// 2nd field test Madison
	var startTime = "2016-08-30T18:42:20Z";
	var endTime = "2016-08-30T19:21:09Z";
	
    var sync = true;
    var dataStreamTimeOut = 4000;
    var useFFmpegWorkers = true;
    var mslToWgs84 = -29+5; // Madison
    
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
    var leafletMapView = new OSH.UI.LeafletView("main-container", [],
        {autoZoomOnFirstMarker: true}
    );
    
    //--------------------------------------------------------------//
    //-------------------- Video Camera Entities -------------------//
    //--------------------------------------------------------------//
    
    var treeItems = [];
    
    // urn:android:device:a0e0eac2fea3f614-sos = Alex Nexus5
    addAndroidPhone("android1", "Botts - Nexus5", "urn:android:device:89845ed469b7edc7-sos", "urn:flir:cam:flirone:android:89845ed469b7edc7-sos", 110/*45*/);
    //addAndroidPhone("android2", "Botts - Nexus9", "urn:android:device:8b65f9d7048a345a-sos", null);
    
    addGeoCam("geocam101", "Geocam #101", "urn:osh:system:geocam:0101-sos", 3600*24*15, 3600*24*15+43*60+23, 90);
    addGeoCam("geocam102", "Geocam #102", "urn:osh:system:geocam:0102-sos", 3600*24*14, 3600*24*14+25*60-15, 160);
    //addGeoCam("geocam103", "Geocam #103", "urn:osh:system:geocam:0103-sos");
    //addGeoCam("geocam105", "Geocam #105", "urn:osh:system:geocam:0105-sos");
    
    addVirbCam("virb1", "Drop Cam - Virb #1", "urn:osh:virb1", 0, true);
    addVirbCam("virb2", "Butler - Virb #2", "urn:osh:virb2", NaN, false);
    
    //addDahuaCam("dahua1", "Dahua PTZ", "urn:osh:dahua1", 0);
    //addAxisCam("axis1", "Axis PTZ", "urn:osh:axis1", 0);
    
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
    
    /*var axis1Tasking = new OSH.DataSender.PtzTasking("video-tasking", {
        protocol: "http",
        service: "SPS",
        version: "2.0",
        endpointUrl: hostName + ":8181/sensorhub/sps",
        offeringID: "urn:axis:cam:00408CB95A55"
    });*/
    
    var dahua1Tasking = new OSH.DataSender.PtzTasking("video-tasking", {
        protocol: "http",
        service: "SPS",
        version: "2.0",
        endpointUrl: hostName + ":8181/sensorhub/sps",
        offeringID: "urn:dahua:cam:1G0215CGAK00046"
    });
    
    var taskingView = new OSH.UI.PtzTaskingView("tasking-container",{});
    taskingView.register(dahua1Tasking);
    //taskingView.register(axis1Tasking);
    
    
    //--------------------------------------------------------------//
    //------------------------ Time Slider  ------------------------//
    //--------------------------------------------------------------//
    var rangeSlider = new OSH.UI.RangeSlider("rangeSlider",{
        startTime: "2016-08-30T18:20:00Z",
        endTime: "2016-08-30T19:22:00Z",
        refreshRate:1
    });
    
    
    //--------------------------------------------------------------//
    //------------------ Discovery Dialog and Menu -----------------//
    //--------------------------------------------------------------//
    cssCircleMenu('.js-menu');
    
    var discoveryDialog    = new OSH.UI.DialogView(document.body.id,{
        css: "discovery-dialog",
        name: "Discovery",
        show:false,
        draggable:true,
        dockable: false,
        closeable: true
    });

    var discoveryView = new OSH.UI.DiscoveryView("",{
        services: ["http://" + hostName + ":8181/"],
        css: "discovery-view",
        dataReceiverController: dataSourceController,
        swapId: "main-container",
        entities: [],
        views: [{
            name: 'Leaflet 2D Map',
            viewId: leafletMapView.id,
            type : OSH.UI.DiscoveryView.Type.MARKER_GPS
        },{
            name: 'Video dialog(H264)',
            type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_H264
        },{
            name: 'Video dialog(MJPEG)',
            type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_MJPEG
        },{
            name: 'Chart dialog',
            type : OSH.UI.DiscoveryView.Type.DIALOG_CHART
        }]
    });

    discoveryView.attachTo(discoveryDialog.popContentDiv.id);

    $("add-entity-button").on("click",function(event){
        discoveryDialog.show({
            viewId : discoveryDialog.id
        });
    });
    
    
    dataSourceController.connectAll();   
    
    
    
    //--------------------------------------------------------------//
    //------ Helper methods to add specific types of sensors -------//
    //--------------------------------------------------------------//
    
    function addAndroidPhone(entityID, entityName, offeringID, flirOfferingID, headingOffset) {
        
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
        leafletMapView.addViewItem({
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
                            heading : rec.heading + headingOffset
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
        
        // video view
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
        
        var videoView = new OSH.UI.FFMPEGView(videoDialog.popContentDiv.id, {
            dataSourceId: videoData.getId(),
            entityId : entity.id,
            css: "video",
            cssSelected: "video-selected",
            useWorker: useFFmpegWorkers,
            width: 800,
            height: 600
        });
        
        var flirVideoDialog = null;
        if (flirVideo != null) {
            flirVideoDialog = new OSH.UI.DialogView("dialog-main-container", {
                draggable: false,
                css: "video-dialog",
                name: entityName + " - FLIR Cam",
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
    
    
    function addGeoCam(entityID, entityName, offeringID, gpsTimeOffset, sysTimeOffset, headingOffset) {
        
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
            timeShift: sysTimeOffset*1000, // 5h shift to get to UTC
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
            timeShift: gpsTimeOffset*1000,
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
            timeShift: sysTimeOffset*1000, // 5h shift to get to UTC
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
        leafletMapView.addViewItem({
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
                            heading : rec.heading + headingOffset
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
        
        // video view
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

    
    function addVirbCam(entityID, entityName, offeringID, heading, hasHeartRate) {
        
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
        
        // heart rate
        if (hasHeartRate) {
            var heartRateData = new OSH.DataReceiver.Chart("Heart Rate", {
                protocol : "ws",
                service: "SOS",
                endpointUrl: hostName + ":8181/sensorhub/sos",
                offeringID: offeringID,
                observedProperty: "http://sensorml.com/ont/swe/property/heartRate",
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
            dataSources: [videoData, locationData]
        };
        
        if (hasHeartRate)
            entity.dataSources.push(heartRateData);
        
        dataSourceController.addEntity(entity);
        
        // add item to tree
        treeItems.push({
            entity : entity,
            path: "Body Cams",
            treeIcon : "images/cameralook.png",
            contextMenuId: treeMenuId + entity.id
        })
        
        // add marker to map
        leafletMapView.addViewItem({
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
                            if (isNaN(heading))
                                return 'images/camera-selected.png';
                            else
                                return 'images/cameralook-selected.png';
                        } else {
                            if (isNaN(heading))
                                return 'images/camera.png';
                            else
                                return 'images/cameralook.png';
                        }
                    }
                }
            }),
            contextMenuId: mapMenuId+entityID
        });
        
        // video view
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
            useWorker: useFFmpegWorkers,
            width: 1280,
            height: 720
        });
        
        // chart view
        if (hasHeartRate) {
            var heartRateDialog = new OSH.UI.DialogView("dialog-main-container", {
                draggable: false,
                css: "dialog",
                name: "Heart Rate - " + entityName,
                show: false,
                dockable: true,
                closeable: true,
                canDisconnect : true,
                swapId: "main-container"
            });
            
            var count = 0;
            var heartRateView = new OSH.UI.Nvd3CurveChartView(heartRateDialog.popContentDiv.id,
            [{
                styler: new OSH.UI.Styler.Curve({
                    valuesFunc: {
                        dataSourceIds: [heartRateData.getId()],
                        handler: function (rec, timeStamp) {
                            return {
                                x: timeStamp,
                                y: rec[0]
                            };
                        }
                    }
                })
            }],
            {
                yLabel: 'Heart Rate (BPM)',
                xLabel: 'Time',
                css:"chart-view",
                cssSelected: "video-selected"
            });
        }
        
        // add tree and map context menus
        var menuItems = [{
            name: "Show Video",
            viewId: videoDialog.getId(),
            css: "fa fa-video-camera",
            action: "show"
        }];
        
        if (heartRateDialog != null) {
            menuItems.push({
                name: "Show Heart Rate",
                viewId: heartRateDialog.getId(),
                css: "fa fa-video-camera",
                action: "show"
            });
        }
    
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
        leafletMapView.addViewItem({
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
        
        // video view
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
            useWorker: useFFmpegWorkers,
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
    
    
    function addAxisCam(entityID, entityName, offeringID, heading) {
        
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
        leafletMapView.addViewItem({
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
        
        // video view
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
            useWorker: useFFmpegWorkers,
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
        leafletMapView.addViewItem({
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
        
        // video view
        var videoDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog",
            name: entityName,
            show: false,
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
            useWorker: useFFmpegWorkers,
            width: 1280,
            height: 720
        });
        
        // altitude chart view        
        var altChartDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog",
            name: entityName + " - Altitude",
            show: false,
            dockable: true,
            closeable: true,
            canDisconnect : true,
            swapId: "main-container",
            connectionIds: [locationData.getId()]
        });
        
        var count = 0;
        var altChartView = new OSH.UI.Nvd3CurveChartView(altChartDialog.popContentDiv.id,
        [{
            styler: new OSH.UI.Styler.Curve({
                valuesFunc: {
                    dataSourceIds: [locationData.getId()],
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
        });
        
        // add tree and map context menus
        var menuItems = [{
            name: "Show Video",
            viewId: videoDialog.getId(),
            css: "fa fa-video-camera",
            action: "show"
        },{
            name: "Show Altitude",
            viewId: altChartDialog.getId(),
            css: "fa fa-bar-chart",
            action: "show"
        }];
    
        var markerMenu = new OSH.UI.ContextMenu.CircularMenu({id:mapMenuId+entityID, groupId: menuGroupId, items: menuItems});
        var treeMenu = new OSH.UI.ContextMenu.StackMenu({id: treeMenuId+entityID, groupId: menuGroupId, items: menuItems});   
        
        return entity;
    }
}
