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
    //----------------------- Axis Camera #1 -----------------------//
    //--------------------------------------------------------------//
	var nexradData = new OSH.DataReceiver.Nexrad("Axis1 Video", {
        protocol : "ws",
        service: "SOS",
        endpointUrl: "54.243.185.44:8282/sensorhub/sos",
        offeringID: "urn:mysos:nexrad",
        observedProperty: "http://sensorml.com/ont/swe/propertyx/NexradRadial",
        startTime: startTime,
        endTime: endTime,
        replaySpeed: "1",
        syncMasterTime: false,
        bufferingTime: 500
    });
	
	var nexradEntity = {
        id: "nexrad",
        name: "KHTX Weather Radar",
        dataSources: [nexradData]
    };
	
	dataSourceController.addEntity(nexradEntity);
    
    
    //--------------------------------------------------------------//
    //-------------------- Markers on Map View  --------------------//
    //--------------------------------------------------------------//
    // leaflet map view
    var mapView = new OSH.UI.CesiumView("main-container",
        [{
        	name: "KHTX Weather Radar",
        	entityId : nexradEntity.id,
            styler : new OSH.UI.Styler.PointMarker({
            	location: {
                    x : -86.083495,
                    y : 34.930536,
                    z : 536+15
                },
                icon : 'images/radar.png'
            })                   
        },
        {
        	name: "Reflectivity",
        	entityId : nexradEntity.id,
            styler : new OSH.UI.Styler.Nexrad({
            	location: {
                    x : -86.083495,
                    y : 34.930536,
                    z : 536+15
                },
                radialDataFunc: {
                    dataSourceIds : [nexradData.getId()],
                    handler : function(rec) {
                        return rec;
                    }
                }
            })                   
        }],
        {autoZoomOnFirstMarker: true}
    );
    
    
    //--------------------------------------------------------------//
    //------------------------ Time Slider  ------------------------//
    //--------------------------------------------------------------//
    var rangeSlider = new OSH.UI.RangeSlider("rangeSlider",{
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        refreshRate:1
    });
    
    dataSourceController.connectAll();
}
