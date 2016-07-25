OSH.Utils = function() {}

OSH.Utils.randomUUID = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

OSH.Utils.jsonix_XML2JSON = function(xmlStr) {
  var module = SOS_2_0_Module_Factory();
  var context = new Jsonix.Context([XLink_1_0, IC_2_0, SMIL_2_0, SMIL_2_0_Language, GML_3_1_1, SWE_1_0_1, GML_3_2_1, OWS_1_1_0, SWE_2_0, SWES_2_0, WSN_T_1, WS_Addr_1_0_Core, OM_2_0, ISO19139_GMD_20070417, ISO19139_GCO_20070417, ISO19139_GSS_20070417, ISO19139_GTS_20070417, ISO19139_GSR_20070417, Filter_2_0, SensorML_2_0, SOS_2_0]);
  var unmarshaller = context.createUnmarshaller();
  var jsonData = unmarshaller.unmarshalString(xmlStr);
  return jsonData;
};

//buffer is an ArrayBuffer object, the offset if specified in bytes, and the type is a string
//corresponding to an OGC data type.
//See http://def.seegrid.csiro.au/sissvoc/ogc-def/resource?uri=http://www.opengis.net/def/dataType/OGC/0/
OSH.Utils.ParseBytes = function(buffer, offset, type) {
  var view = new DataView(bytes);

  //Note: There exist types not listed in the map below that have OGC definitions, but no appropriate
  //methods or corresponding types available for parsing in javascript. They are float128, float16, signedLong,
  //and unsignedLong
  var typeMap = {
    double: function(buff, offset) {
      return { val:view.getFloat64(buff, offset), bytes: 8 };
    },
    float64: function(buff, offset) {
      return { val: view.getFloat64(buff, offset), bytes: 8 };
    },
    float32: function(buff, offset) {
      return { val: view.getFloat32(buff, offset), bytes: 4 };
    },
    signedByte: function(buff, offset) {
      return { val: view.getInt8(buff, offset), bytes: 1 };
    },
    signedInt: function(buff, offset) {
      return { val: view.getInt32(buff, offset), bytes: 4 };
    },
    signedShort: function(buff, offset) {
      return { val: view.getInt16(buff, offset), bytes: 2 };
    },
    unsignedByte: function(buff, offset) {
      return { val: view.getUint8(buff, offset), bytes: 1 };
    },
    unsignedInt: function(buff, offset) {
      return { val: view.getUint32(buff, offset), bytes: 4 };
    },
    unsignedShort: function(buff, offset) {
      return { val: view.getUint16(buff, offset), bytes: 2 };
    },
    //TODO: string-utf-8:
  };

  return typeMap['type'](buffer, offset);
}

OSH.Utils.isOpera = function() {
  return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
};

OSH.Utils.isFirefox = function() {
  return typeof InstallTrigger !== 'undefined';
};

OSH.Utils.isSafari = function() {
  return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
};

OSH.Utils.isIE = function() {
  return /*@cc_on!@*/false || !!document.documentMode;
};

OSH.Utils.isChrome = function() {
  return !!window.chrome && !!window.chrome.webstore;
};

OSH.Utils.isBlink = function() {
  return (isChrome || isOpera) && !!window.CSS;
};
