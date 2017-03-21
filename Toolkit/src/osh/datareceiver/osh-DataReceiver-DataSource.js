/**
 * @classdesc The DataSource is the abstract class used to create different datasources.
 * @class
 * @abstract
 * @param {string} name the datasource name
 * @param {Object} properties the datasource properties
 * @param {boolean} properties.timeShift fix some problem with some android devices with some timestamp shift to 16 sec
 * @param {boolean} properties.syncMasterTime defines if the datasource is synchronize with the others one
 * @param {number} properties.bufferingTime defines the time during the data has to be buffered
 * @param {number} properties.timeOut defines the limit time before data has to be skipped
 * @param {string} properties.protocol defines the protocol of the datasource. @see {@link OSH.DataConnector.DataConnector}
 *
 */
OSH.DataReceiver.DataSource = Class.create({
  initialize: function(name,properties) {
    this.id = "DataSource-"+OSH.Utils.randomUUID();
    this.name = name;
    this.properties = properties;
    this.timeShift = 0;
    this.connected = false;

    this.initDataSource(properties);
  },

  /**
   * Inits the datasource with the constructor properties.
   * @param properties
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   */
  initDataSource: function(properties) {
    
    if(typeof(properties.timeShift) != "undefined") {
        this.timeShift = properties.timeShift;
    }

    if(typeof properties.syncMasterTime != "undefined") {
      this.syncMasterTime = properties.syncMasterTime;
    } else {
      this.syncMasterTime = false;
    }

    if(typeof properties.bufferingTime != "undefined") {
      this.bufferingTime = properties.bufferingTime;
    }

    if(typeof properties.timeOut != "undefined") {
      this.timeOut = properties.timeOut;
    }
    
    // checks if type is WebSocket
    if(properties.protocol == "ws") {
      this.connector = new OSH.DataConnector.WebSocketDataConnector(this.buildUrl(properties));
      // connects the callback
      this.connector.onMessage = this.onMessage.bind(this);
    }
  },
  /**
   * Disconnect the dataSource then the connector will be closed as well.
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   */
  disconnect : function() {
    this.connector.disconnect();
    this.connected = false;
    
    // send data reset event
    OSH.EventManager.fire(OSH.EventManager.EVENT.DATA+"-"+this.id,{
        dataSourceId: this.id,
        reset: true
    });
  },

  /**
   * Connect the dataSource then the connector will be opened as well.
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   */
  connect: function() {
    this.connector.connect();
    this.connected = true;
  },

  /**
   * The callback which receives data.
   * @callback
   * @param data
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   */
  onMessage: function(data) {
    var data = {
      timeStamp: this.parseTimeStamp(data) + this.timeShift,
      data: this.parseData(data)
    };
    this.onData(data);
  },

  /**
   * The default timestamp parser
   * @param data the full data message returned by the connector
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   * @returns {number} the formatted timestamp
   */
  parseTimeStamp: function(data){
    return new Date().getTime();
  },

  /**
   * The default timestamp parser
   * @param data the full data message returned by the connector
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   * @returns {String|Object|number|ArrayBuffer|*} data the formatted data
   */
  parseData: function(data){
    return data;
  },
  
  /**
   * @param {Object} data the data object
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   * @example
   * data is represented as 
   * data = { 
   *    timeStamp: timeStamp // number
   *    data: data // data to render
   * };
   */ 
  onData:function(data) {},

  /**
   * Gets the datasource id.
   * @returns {string} the datasource id
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   */
  getId: function() {
    return this.id;
  },

  /**
   * Gets the datasource name.
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   * @returns {*}
   */
  getName: function() {
    return this.name;
  },

  /**
   * Builds the full url.
   * @param {object} properties
   * @param {string} properties.protocol the connector protocol
   * @param {string} properties.endpointUrl the endpoint url
   * @param {string} properties.service the service
   * @param {string} properties.offeringID the offeringID
   * @param {string} properties.observedProperty the observed property
   * @param {string} properties.startTime the start time (ISO format)
   * @param {string} properties.endTime the end time (ISO format)
   * @param {number} properties.replaySpeed the replay factor
   * @param {number} properties.responseFormat the response format (e.g video/mp4)
   * @instance
   * @memberof OSH.DataReceiver.DataSource
   * @returns {string} the full url
   */
  buildUrl: function(properties) {
	  var url = "";
	  
	  // adds protocol
	  url += properties.protocol + "://";
	  
	  // adds endpoint url
	  url += properties.endpointUrl+"?";
	  
	  // adds service
	  url += "service="+properties.service+"&";
	  
	  // adds version
	  url += "version=2.0&";
	  
	  // adds request
	  url += "request=GetResult&";
	  
	  // adds offering
	  url += "offering="+properties.offeringID+"&";
	  
	  // adds observedProperty
	  url += "observedProperty="+properties.observedProperty+"&";
	  
	  // adds temporalFilter
	  var startTime = properties.startTime;
	  var endTime = properties.endTime;
	  if (startTime !== "now" && this.timeShift != 0) {	      
	      // HACK: don't do it for old Android dataset that is indexed differently
	      if (properties.offeringID !== "urn:android:device:060693280a28e015-sos") {
	         // apply time shift
	         startTime = new Date(Date.parse(startTime) - this.timeShift).toISOString();
	         endTime = new Date(Date.parse(endTime) - this.timeShift).toISOString();
	      }
	  }
	  url += "temporalFilter=phenomenonTime,"+startTime+"/"+endTime+"&";
	  
	  if(properties.replaySpeed) {
		  // adds replaySpeed
		  url += "replaySpeed="+properties.replaySpeed;
	  }
	  
	  // adds responseFormat (optional)
	  if(properties.responseFormat) {
		  url += "&responseFormat="+properties.responseFormat;
	  }
	  
	  return url;
  }
});
