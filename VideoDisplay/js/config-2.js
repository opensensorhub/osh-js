function init() {
    // creates dataSources
    //--Android Phone Video
    var androidPhoneGpsDataSource = new OSH.DataReceiver.LatLonAlt("android-GPS", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/Location",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: "1"
    });

    var androidPhoneOrientationDataSource = new OSH.DataReceiver.OrientationQuaternion("android-Orientation", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: "1"
    });


    var androidPhoneVideoDataSource = new OSH.DataReceiver.VideoMjpeg("android-Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: "1"
    });

    var weatherDataSource = new OSH.DataReceiver.Chart("weather", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:mysos:offering03",
        observedProperty: "http://sensorml.com/ont/swe/property/Weather",
        startTime: "now",
        endTime: "2055-01-01Z"
    });

    var taskingVideoDataSource = new OSH.DataSender.Tasking("video-tasking", {
        protocol: "http",
        service: "SPS",
        version: "2.0",
        endpointUrl: "ENDPOINT_URL",
        offeringID: "OFFERING_ID"
    });

    var videoDialog = new OSH.UI.DialogView("box-1", {
        draggable: false,
        css: "dialog",
        name: "Android Video 1",
        show:false,
        dockable: true,
        closeable: true
    });

    var videoView2 = new OSH.UI.MjpegView("box-2", {
        dataSourceId: androidPhoneVideoDataSource.getId(),
        css: "video",
        cssSelected: "video-selected",
        name: "Android Video 2"
    });

    var videoDialog2 = new OSH.UI.DialogView("box-2", {
        draggable: false,
        css: "dialog",
        name: "Android Video 2",
        show:false,
        dockable: true,
        closeable: true
    });


    var windSpeedChartView = new OSH.UI.Nvd3CurveChartView("box-3",
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
            cssSelected: "video-selected"
        });

    var chartDialog = new OSH.UI.DialogView("box-3", {
        draggable: false,
        css: "dialog",
        name: "Chart Weather",
        show:false,
        dockable: true,
        closeable: true
    });

    var  menuItems = [{
        name: "Android Video",
        viewId: videoDialog.getId(),
        css: "fa fa-video-camera fa-2x",
        action: "show"
    },{
        name: "Same Android Video",
        viewId: videoDialog2.getId(),
        css: "fa fa-video-camera fa-2x",
        action: "show"
    },{
        name: "Weather chart",
        viewId: chartDialog.getId(),
        css: "fa fa-bar-chart fa-2x",
        action: "show"
    },{
        name: "Tasking",
        viewId: "",
        css: "fa fa-arrows fa-2x",
        action: "show"
    }];

    var menuId = "menu-"+OSH.Utils.randomUUID();

    var contextCircularMenu = new OSH.UI.ContextMenu.CircularMenu({
        id : menuId,
        items: menuItems
    });

    var contextStackMenu = new OSH.UI.ContextMenu.StackMenu({
        id: menuId,
        items: menuItems
    });

    var androidEntity = {
        id : "entity-"+OSH.Utils.randomUUID(),
        name: "Android Phone",
        dataSources: [androidPhoneGpsDataSource, androidPhoneOrientationDataSource,androidPhoneVideoDataSource,weatherDataSource],
        path: "Sensors/Toulouse",
        treeIcon : "images/android_icon.png",
        contextMenu: contextStackMenu
    };

    var videoView = new OSH.UI.MjpegView("box-1", {
        dataSourceId: androidPhoneVideoDataSource.getId(),
        entityId : androidEntity.id,
        css: "video",
        cssSelected: "video-selected",
        name: "Android Video"
    });

    // creates views
    var mapView = new OSH.UI.LeafletView("main-container",
        [{
            styler :  new OSH.UI.Styler.PointMarker({
                location : {
                    x : 1.42376557,
                    y : 43.61758626,
                    z : 100
                },
                locationFunc : {
                    dataSourceIds : [androidPhoneGpsDataSource.getId()],
                    handler : function(rec) {
                        return {
                            x : rec.lon,
                            y : rec.lat,
                            z : rec.alt
                        };
                    }
                },
                orientationFunc : {
                    dataSourceIds : [androidPhoneOrientationDataSource.getId()],
                    handler : function(rec) {
                        return {
                            heading : rec.heading
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
            }),
            contextmenu: contextCircularMenu,
            name : "Android Phone GPS",
            entityId : androidEntity.id
        },
        {
            styler : new OSH.UI.Styler.Polyline({
                locationFunc : {
                    dataSourceIds : [androidPhoneGpsDataSource.getId()],
                    handler : function(rec) {
                        return {
                            x : rec.lon,
                            y : rec.lat,
                            z : rec.alt
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

    var taskingView = new OSH.UI.TaskingView("tasking-container",{
        dataSourceId : ""
    });


    // test tree
    var entityTree = new OSH.UI.EntityTreeView("tree-container",[androidEntity],{});

    // adds datasources to dataProviderController
    var dataProviderController = new OSH.DataReceiver.DataReceiverController({
        bufferingTime : 0*1000, // 2 seconds
        synchronizedTime : false // true to sync the data
    });
    dataProviderController.addEntity(androidEntity);
    dataProviderController.addDataSource(weatherDataSource);

    // registers the view into the data provider
    dataProviderController.registerObserver(mapView);
    dataProviderController.registerObserver(videoView);
    dataProviderController.registerObserver(videoView2);
    dataProviderController.registerObserver(windSpeedChartView);
    //dataProviderController.registerObserver(videoView);

    /*var dataSenderController = new OSH.DataSender.DataSenderController({});

    // adds datasources to dataSenderController
    dataSenderController.addDataSource(taskingVideoDataSource);

    // registers the view into the data provider
    taskingView.register(dataSenderController);*/

    // starts streaming
    dataProviderController.connectAll();

    var entityTreeDialog = new OSH.UI.DialogView("tree-container", {
        css: "tree-dialog",
        name: "Entities",
        show:true,
        draggable:true,
        dockable: false,
        closeable: false
    });
    // inits rangeSlider
    /*var rangeSlider = new OSH.UI.JQRangeSlider("rangeSlider", {
        startDate: "2015-02-16T07:58:00Z",
        endDate: "2015-02-16T08:09:00Z"
    });*/
}