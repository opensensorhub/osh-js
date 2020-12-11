var UTCAndroidShiftTime = 16 * 1000;

/**
 * Utility class to extract timeStamp from various data.
 */ 
OSH.TimeStampParser = function() {}


/**
 *  Parses the text to extract timeStamp. This method is specific for android timeStamp because of the UTC shift time used by android.
 */  
OSH.TimeStampParser.parseAndroidText = function(data) {
  var rec = String.fromCharCode.apply(null, new Uint8Array(data));
  var tokens = rec.trim().split(",");
  var date = new Date(tokens[0]);
  return date.getTime() - UTCAndroidShiftTime;
};

/**
 * Parses the binary data to extract timeStamp. This method will extract the first 64 bits from the binary value given as parameter.
 */ 
OSH.TimeStampParser.parseVideo = function(data) {
   return new DataView(data).getFloat64(0, false) * 1000; // read double time stamp as big endian
};
