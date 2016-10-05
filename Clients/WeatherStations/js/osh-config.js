function init() {

    var hostName = "localhost";
    var startTime = "now";
    var endTime = "2016-10-05T02:30:29Z";
    
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
    //-------------------- Add Weather Entities --------------------//
    //--------------------------------------------------------------//
    
    var treeItems = [];
  //addWeatherStation(entity ID, entity Name, offering ID, lat, lon, alt
    addWeatherStation("uahweatherA001", "UAH Weather A001", "urn:uahweather:A:001-sos", 34.6459722, -86.7713056, 206);
    
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
    //------------------------ Time Slider  ------------------------//
    //--------------------------------------------------------------//
    /*var rangeSlider = new OSH.UI.RangeSlider("rangeSlider",{
        startTime: "2016-10-03T010:20:00Z",
        endTime: "2016-10-03T12:22:00Z",
        refreshRate:1
    });*/
    
    
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

    function addWeatherStation(entityID, entityName, offeringID, lat, lon, alt) {
        console.log("Adding Weather Station", entityName);
        var weatherData = new OSH.DataReceiver.DataSourceUAHWeather("Weather", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/Weather",
            startTime: "now",
            endTime: "2116-10-05T02:30:29Z",
            replaySpeed: "1",
            syncMasterTime: false,
            bufferingTime: 60000,
            timeOut: 60000
        });

        /*var weatherData = new OSH.DataReceiver.DataSourceUAHWeather("Weather", {
            protocol : "ws",
            service: "SOS",
            endpointUrl: hostName + ":8181/sensorhub/sos",
            offeringID: offeringID,
            observedProperty: "http://sensorml.com/ont/swe/property/Weather",
            startTime: "2016-10-02T02:28:14Z",
            endTime: "2016-10-02T02:30:29Z",
            replaySpeed: "1",
            syncMasterTime: false,
            bufferingTime: 20000,
            timeOut: 60000
        });*/
        
        // create entity
        var entity = {
            id: entityID,
            name: entityName,
            dataSources: [weatherData]
        };
        dataSourceController.addEntity(entity);
        
        // add item to tree
        treeItems.push({
            entity : entity,
            path: "WeatherStations",
            treeIcon : "images/tornado.png",
            contextMenuId: treeMenuId + entity.id
        })
        
        // add marker to map
        leafletMapView.addViewItem({
            name: entityName,
            entityId : entity.id,
            styler : new OSH.UI.Styler.PointMarker({
                location: {
                    x : lon,
                    y : lat,
                    z : alt
                },
                icon : 'images/tornado.png',
                iconFunc : {
                    dataSourceIds: [weatherData.getId()],
                    handler : function(options) {
                        if(options.selected) {
                            return 'images/tornado-selected.png'
                        } else {
                            return 'images/tornado.png';
                        }
                    }
                }
            }),
            contextMenuId: mapMenuId+entityID
        });

        // pressure chart view        
        var pressureChartDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog",
            name: entityName + " - Pressure",
            show: true,
            dockable: true,
            closeable: true,
            canDisconnect : true,
            swapId: "main-container",
            connectionIds: [weatherData.getId()]
        });

        var pressureChartView = new OSH.UI.Nvd3CurveChartView(pressureChartDialog.popContentDiv.id,
        [{
            styler: new OSH.UI.Styler.Curve({
                valuesFunc: {
                    dataSourceIds: [weatherData.getId()],
                    handler: function (rec, timeStamp) {
                        return {
                            x : timeStamp,
                            y : rec.airPres
                        };
                    }
                }
            })
        }],
        {
            css: "chart-view",
            cssSelected: "video-selected",
            maxPoints: 100,
            yLabel: 'Pressure (mbar)',
        });

        // temperature chart view        
        var tempChartDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog",
            name: entityName + " - Temp",
            show: true,
            dockable: true,
            closeable: true,
            canDisconnect : true,
            swapId: "main-container",
            connectionIds: [weatherData.getId()]
        });

        var tempChartView = new OSH.UI.Nvd3CurveChartView(tempChartDialog.popContentDiv.id,
        [{
            styler: new OSH.UI.Styler.Curve({
                valuesFunc: {
                    dataSourceIds: [weatherData.getId()],
                    handler: function (rec, timeStamp) {
                        return {
                            x : timeStamp,
                            y : rec.airTemp
                        };
                    }
                }
            })
        }],
        {
            css: "chart-view",
            cssSelected: "video-selected",
            maxPoints: 100,
            yLabel: 'Temperature (' + String.fromCharCode(176) + 'C)'
        });

        // rel humidity chart view        
        var humidChartDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog",
            name: entityName + " - Rel Hum",
            show: true,
            dockable: true,
            closeable: true,
            canDisconnect : true,
            swapId: "main-container",
            connectionIds: [weatherData.getId()]
        });

        var humidChartView = new OSH.UI.Nvd3CurveChartView(humidChartDialog.popContentDiv.id,
        [{
            styler: new OSH.UI.Styler.Curve({
                valuesFunc: {
                    dataSourceIds: [weatherData.getId()],
                    handler: function (rec, timeStamp) {
                        return {
                            x : timeStamp,
                            y : rec.humidity
                        };
                    }
                }
            })
        }],
        {
            css: "chart-view",
            cssSelected: "video-selected",
            maxPoints: 100,
            yLabel: 'Relative Humidity (%)'
        });

        // wind speed chart view        
        var windSpeedChartDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog",
            name: entityName + " - Wind Speed",
            show: true,
            dockable: true,
            closeable: true,
            canDisconnect : true,
            swapId: "main-container",
            connectionIds: [weatherData.getId()]
        });

        var windSpeedChartView = new OSH.UI.Nvd3CurveChartView(windSpeedChartDialog.popContentDiv.id,
        [{
            styler: new OSH.UI.Styler.Curve({
                valuesFunc: {
                    dataSourceIds: [weatherData.getId()],
                    handler: function (rec, timeStamp) {
                        return {
                            x : timeStamp,
                            y : rec.windSpeed
                        };
                    }
                }
            })
        }],
        {
            css: "chart-view",
            cssSelected: "video-selected",
            maxPoints: 100,
            yLabel: 'Wind Speed (m/s)'
        });

        // wind dir chart view        
        var windDirChartDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog",
            name: entityName + " - Wind Dir",
            show: true,
            dockable: true,
            closeable: true,
            canDisconnect : true,
            swapId: "main-container",
            connectionIds: [weatherData.getId()]
        });

        var windDirChartView = new OSH.UI.Nvd3CurveChartView(windDirChartDialog.popContentDiv.id,
        [{
            styler: new OSH.UI.Styler.Curve({
                valuesFunc: {
                    dataSourceIds: [weatherData.getId()],
                    handler: function (rec, timeStamp) {
                        return {
                            x : timeStamp,
                            y : rec.windDir
                        };
                    }
                }
            })
        }],
        {
            css: "chart-view",
            cssSelected: "video-selected",
            maxPoints: 100,
            yLabel: 'Wind Direction (deg)'
        });

        // rain accum chart view        
        var rainChartDialog = new OSH.UI.DialogView("dialog-main-container", {
            draggable: false,
            css: "video-dialog",
            name: entityName + " - Rain",
            show: true,
            dockable: true,
            closeable: true,
            canDisconnect : true,
            swapId: "main-container",
            connectionIds: [weatherData.getId()]
        });

        var rainChartView = new OSH.UI.Nvd3CurveChartView(rainChartDialog.popContentDiv.id,
        [{
            styler: new OSH.UI.Styler.Curve({
                valuesFunc: {
                    dataSourceIds: [weatherData.getId()],
                    handler: function (rec, timeStamp) {
                        return {
                            x : timeStamp,
                            y : rec.rainCnt
                        };
                    }
                }
            })
        }],
        {
            css: "chart-view",
            cssSelected: "video-selected",
            maxPoints: 100,
            yLabel: 'Rain Accumulation (mm)'
        });

        // add tree and map context menus
        var menuItems = [{
            name: "Show Pressure",
            viewId: pressureChartDialog.getId(),
            css: "fa fa-bar-chart",
            action: "show"
        },
        {
            name: "Show Temperature",
            viewId: tempChartDialog.getId(),
            css: "fa fa-bar-chart",
            action: "show"
        },
        {
            name: "Show Humidity",
            viewId: humidChartDialog.getId(),
            css: "fa fa-bar-chart",
            action: "show"
        },
        {
            name: "Show Wind Speed",
            viewId: windSpeedChartDialog.getId(),
            css: "fa fa-bar-chart",
            action: "show"
        },
        {
            name: "Show Wind Direction",
            viewId: windDirChartDialog.getId(),
            css: "fa fa-bar-chart",
            action: "show"
        },
        {
            name: "Show Rain Accumulation",
            viewId: rainChartDialog.getId(),
            css: "fa fa-bar-chart",
            action: "show"
        }];
    
        var markerMenu = new OSH.UI.ContextMenu.CircularMenu({id:mapMenuId+entityID, groupId: menuGroupId, items: menuItems});
        var treeMenu = new OSH.UI.ContextMenu.StackMenu({id: treeMenuId+entityID, groupId: menuGroupId, items: menuItems});

        return entity;
    }
}
