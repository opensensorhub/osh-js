function init() {

    //--------------------------------------------------------------//
    //--------------------- Creates dataSources --------------------//
    //--------------------------------------------------------------//

    //TODO: to fix
    window.CESIUM_BASE_URL = '../../Toolkit/releases/v1.1/vendor';

    var replayFactor = 3;
    //--Android Phone Video
    var androidPhoneGpsDataSource = new OSH.DataReceiver.JSON("android-GPS", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/Location",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: replayFactor+"",
        syncMasterTime: true,
        bufferingTime: 1000,
        timeShift: -16000
    });

    var androidPhoneOrientationDataSource = new OSH.DataReceiver.JSON("android-Orientation", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: replayFactor+"",
        syncMasterTime: true,
        bufferingTime: 1000
    });

    var androidPhoneVideoDataSource = new OSH.DataReceiver.VideoMjpeg("android-Video", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: replayFactor+"",
        syncMasterTime: true,
        bufferingTime: 1000
    });

    var weatherDataSource = new OSH.DataReceiver.JSON("weather", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:mysos:offering03",
        observedProperty: "http://sensorml.com/ont/swe/property/Weather",
        startTime: "now",
        endTime: "2055-01-01Z",
        syncMasterTime: false,
        bufferingTime: 1000
    });

    /*var taskingVideoDataSource = new OSH.DataSender.Tasking("video-tasking", {
     protocol: "http",
     service: "SPS",
     version: "2.0",
     endpointUrl: "ENDPOINT_URL",
     offeringID: "OFFERING_ID"
     });*/

    //-----------------------------------------------------------//
    //--------------------- Creates menus -----------------------//
    //-----------------------------------------------------------//

    var circularContextMenuId = "menu-"+OSH.Utils.randomUUID();
    var stackContextMenuId = "menu-"+OSH.Utils.randomUUID();
    var androidMenuGroupId = "menu-"+OSH.Utils.randomUUID();

    //-----------------------------------------------------------//
    //--------------------- Creates entities --------------------//
    //-----------------------------------------------------------//

    var androidEntity = {
        id : "entity-"+OSH.Utils.randomUUID(),
        name: "Android Phone",
        dataSources: [androidPhoneGpsDataSource, androidPhoneOrientationDataSource,androidPhoneVideoDataSource/*,weatherDataSource*/]
    };

    //--------------------------------------------------------//
    //--------------------- Creates views --------------------//
    //--------------------------------------------------------//

    // creates Dialog Views
    var videoDialog         = createPtzDialog("dialog-main-container",[androidPhoneVideoDataSource.id],"Android Video 1",true);
    var videoDialog2        = createPtzDialog("dialog-main-container",[androidPhoneVideoDataSource.id],"Android Video 2",false);
    // var chartDialog         = createDialog("dialog-main-container",[weatherDataSource.id],"Chart Weather",true);
    var leafletMapDialog         = createDialog("dialog-main-container",[androidPhoneGpsDataSource.id,androidPhoneOrientationDataSource.id],"Leaflet 2D",true);
    var cesiumMapDialog         = createDialog("dialog-main-container",[androidPhoneGpsDataSource.id,androidPhoneOrientationDataSource.id],"Cesium 3D",true);
    var entityTreeDialog    = new OSH.UI.DialogView(document.body.id,{
        css: "tree-dialog",
        name: "Entities",
        show:true,
        draggable:true,
        dockable: false,
        closeable: false
    });

    // Video 1 View
    var videoView = new OSH.UI.MjpegView(videoDialog.popContentDiv.id, {
        dataSourceId: androidPhoneVideoDataSource.getId(),
        entityId : androidEntity.id,
        css: "video",
        cssSelected: "video-selected",
        name: "Android Video"
    });

    // Video 2 View
    var videoView2 = new OSH.UI.MjpegView(videoDialog2.popContentDiv.id, {
        dataSourceId: androidPhoneVideoDataSource.getId(),
        entityId : androidEntity.id,
        css: "video",
        cssSelected: "video-selected",
        name: "Android Video 2"
    });

    // Chart View
    /*var windSpeedChartView = new OSH.UI.Nvd3CurveChartView(chartDialog.popContentDiv.id,
     [{
     styler: new OSH.UI.Styler.Curve({
     valuesFunc: {
     dataSourceIds: [weatherDataSource.getId()],
     handler: function (rec, timeStamp) {
     return {
     x: timeStamp,
     y: parseFloat(rec[2])
     };
     }
     }
     })
     }],
     {
     name: "WindSpeed chart",
     yLabel: 'Wind Speed (m/s)',
     xLabel: 'Time',
     css:"chart-view",
     cssSelected: "video-selected",
     maxPoints:30
     }
     );*/

    var entityTreeView = new OSH.UI.EntityTreeView(entityTreeDialog.popContentDiv.id,
        [{
            entity : androidEntity,
            path: "Sensors/Toulouse",
            treeIcon : "images/android_icon.png",
            contextMenuId: stackContextMenuId
        }],
        {
            css: "tree-container"
        }
    );

    var pointMarker = new OSH.UI.Styler.PointMarker({
        location : {
            x : 1.42376557,
            y : 43.61758626,
            z : 100
        },
        locationFunc : {
            dataSourceIds : [androidPhoneGpsDataSource.getId()],
            handler : function(rec) {
                return {
                    x : rec.location.lon,
                    y : rec.location.lat,
                    z : rec.location.alt
                };
            }
        },
        orientationFunc : {
            dataSourceIds : [androidPhoneOrientationDataSource.getId()],
            handler : function(rec) {
                return {
                    heading : rec.orient.heading
                };
            }
        },
        icon : 'images/cameralook.png',
        iconFunc : {
            dataSourceIds: [androidPhoneGpsDataSource.getId()],
            handler : function(rec,timeStamp,options) {
                if(options.selected) {
                    return 'images/cameralook-selected.png'
                } else {
                    return 'images/cameralook.png';
                };
            }
        }
    });

    var leafletMapView = new OSH.UI.LeafletView("",
        [{
            styler :  pointMarker,
            contextMenuId: circularContextMenuId,
            name : "Android Phone GPS",
            entityId : androidEntity.id
        },
            {
                styler : new OSH.UI.Styler.Polyline({
                    locationFunc : {
                        dataSourceIds : [androidPhoneGpsDataSource.getId()],
                        handler : function(rec) {
                            return {
                                x : rec.location.lon,
                                y : rec.location.lat,
                                z : rec.location.alt
                            };
                        }
                    },
                    color : 'rgba(0,0,255,0.5)',
                    weight : 10,
                    opacity : .5,
                    smoothFactor : 1,
                    maxPoints : 200
                }),
                name : "Android Phone GPS Path",
                entityId : androidEntity.id
            }]
    );

    var cesiumMapView = new OSH.UI.CesiumView("",
        [{
            styler :  pointMarker,
            contextMenuId: circularContextMenuId,
            name : "Android Phone GPS",
            entityId : androidEntity.id
        },
            {
                styler : new OSH.UI.Styler.Polyline({
                    locationFunc : {
                        dataSourceIds : [androidPhoneGpsDataSource.getId()],
                        handler : function(rec) {
                            return {
                                x : rec.location.lon,
                                y : rec.location.lat,
                                z : rec.location.alt
                            };
                        }
                    },
                    color : 'rgba(0,0,255,0.5)',
                    weight : 10,
                    opacity : .5,
                    smoothFactor : 1,
                    maxPoints : 200
                }),
                name : "Android Phone GPS Path",
                entityId : androidEntity.id
            }]
    );

    leafletMapView.attachTo(leafletMapDialog.popContentDiv.id);
    cesiumMapView.attachTo(cesiumMapDialog.popContentDiv.id);

    //-----------------------------------------------------------//
    //----------------- Creates Contextual Menus------------------//
    //-----------------------------------------------------------//

    var menuItems = [{
        name: "Android Video",
        viewId: videoDialog.id,
        css: "fa fa-video-camera"
    },{
        name: "Same Android Video",
        viewId: videoDialog2.id,
        css: "fa fa-video-camera"
    }/*,{
     name: "Weather chart",
     viewId: chartDialog.id,
     css: "fa fa-bar-chart"
     }*/,{
        name: "Leaflet 2D",
        viewId: leafletMapDialog.id,
        css: "fa fa-map"
    },{
        name: "Cesium 3D",
        viewId: cesiumMapDialog.id,
        css: "fa fa-globe"
    },{
        name: "Tasking",
        viewId: "",
        css: "fa fa-arrows"
    }];

    var contextCircularMenu = new OSH.UI.ContextMenu.CircularMenu({id : circularContextMenuId,groupId: androidMenuGroupId,items : menuItems});
    var contextStackMenu = new OSH.UI.ContextMenu.StackMenu({id : stackContextMenuId,groupId: androidMenuGroupId,items : menuItems});

    var rangeSlider = new OSH.UI.RangeSlider("rangeSlider",{
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        refreshRate:1
    });

    //---------------------------------------------------------------//
    //--------------------- Creates DataProvider --------------------//
    //---------------------------------------------------------------//

    var dataProviderController = new OSH.DataReceiver.DataReceiverController({
        replayFactor : replayFactor
    });

    // We can add a group of dataSources and set the options
    dataProviderController.addEntity(androidEntity);
    //dataProviderController.addDataSource(weatherDataSource);



    //-------------------------------------------------------------//
    //---------------- Creates circular Nav menu -----------------//
    //-----------------------------------------------------------//

    cssCircleMenu('.js-menu');
    var currentIdView = "";
    var mainDiv = document.getElementById("center-container");

    var leafletMainView = new OSH.UI.LeafletView("",
        [{
            styler :  pointMarker,
            contextMenuId: circularContextMenuId,
            name : "Android Phone GPS",
            entityId : androidEntity.id
        },
            {
                styler : new OSH.UI.Styler.Polyline({
                    locationFunc : {
                        dataSourceIds : [androidPhoneGpsDataSource.getId()],
                        handler : function(rec) {
                            return {
                                x : rec.location.lon,
                                y : rec.location.lat,
                                z : rec.location.alt
                            };
                        }
                    },
                    color : 'rgba(0,0,255,0.5)',
                    weight : 10,
                    opacity : .5,
                    smoothFactor : 1,
                    maxPoints : 200
                }),
                name : "Android Phone GPS Path",
                entityId : androidEntity.id
            }]
    );

    var cesiumMainMapView = new OSH.UI.CesiumView("",
        [{
            styler :  pointMarker,
            contextMenuId: circularContextMenuId,
            name : "Android Phone GPS",
            entityId : androidEntity.id
        },
            {
                styler : new OSH.UI.Styler.Polyline({
                    locationFunc : {
                        dataSourceIds : [androidPhoneGpsDataSource.getId()],
                        handler : function(rec) {
                            return {
                                x : rec.location.lon,
                                y : rec.location.lat,
                                z : rec.location.alt
                            };
                        }
                    },
                    color : 'rgba(0,0,255,0.5)',
                    weight : 10,
                    opacity : .5,
                    smoothFactor : 1,
                    maxPoints : 200
                }),
                name : "Android Phone GPS Path",
                entityId : androidEntity.id
            }]
    );

    var discoveryDialog    = new OSH.UI.DialogView(document.body.id,{
        css: "discovery-dialog",
        name: "Discovery",
        show:false,
        draggable:true,
        dockable: false,
        closeable: true
    });

    var discoveryView = new OSH.UI.DiscoveryView("",{
        services: ["http://localhost:8181/","http://sensiasoft.net:8181/"],
        css: "discovery-view",
        dataReceiverController:dataProviderController,
        swapId: "center-container",
        entities: [androidEntity],
        views: [{
            name: 'Leaflet 2D Map',
            viewId: leafletMainView.id,
            type : OSH.UI.DiscoveryView.Type.MARKER_GPS
        }, {
            name: 'Cesium 3D Globe',
            viewId: cesiumMainMapView.id,
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
        }
        ]
    });

    discoveryView.attachTo(discoveryDialog.popContentDiv.id);

    document.getElementById("2D-view-button").onclick = function(event) {
        if(currentIdView != leafletMainView.divId){
            cesiumMainMapView.hide();
            leafletMainView.attachTo(mainDiv.id);
            currentIdView = leafletMainView.divId;
        }
    };

    document.getElementById("3D-view-button").onclick = function(event) {
        if(currentIdView != cesiumMainMapView.divId){
            leafletMainView.hide();
            cesiumMainMapView.attachTo(mainDiv.id);
            currentIdView = cesiumMainMapView.divId;
        }
    };

    document.getElementById("screenshot-button").onclick = function(event){
        OSH.Utils.takeScreeshot(mainDiv);
    };

    document.getElementById("add-entity-button").onclick = function(event){
        discoveryDialog.show({
            viewId : discoveryDialog.id
        });
    };

    // 2D view is set as default view
    currentIdView = leafletMainView.divId;
    leafletMainView.attachTo(mainDiv.id);

    //---------------------------------------------------------------//
    //---------------------------- Starts ---------------------------//
    //---------------------------------------------------------------//

    // starts streaming
    dataProviderController.connectAll();

}

function createPtzDialog(containerDivId,dataSources,title,defaultShow) {
    var ptzDialog = new OSH.UI.MultiDialogView(containerDivId, {
        draggable: false,
        css: "dialog",
        name: title,
        show:false,
        dockable: true,
        closeable: true,
        connectionIds : dataSources ,
        swapId: "center-container",
        keepRatio:true
    });

    var ptzView = new OSH.UI.PtzTaskingView();

    // by default the view is hidden because no div id has been defined
    // ptzDialog.appendView(ptzView.divId);

    return ptzDialog;

}

function createDialog(containerDivId,dataSources,title,defaultShow) {
    return new OSH.UI.DialogView(containerDivId, {
        draggable: false,
        css: "dialog",
        name: title,
        show:false,
        dockable: true,
        closeable: true,
        connectionIds : dataSources ,
        swapId: "center-container"
    });
}
