Make your own data receiver
===

# GetCapabitlities

Let's suppose we have the following information:

 * offeringId: `fake-offering`
 
 * startTime: `2016-08-30T19:00:40Z`
 
 * endTime: `2016-08-30T19:22:00Z`
 
 * observedProperty: `http://www.opengis.net/def/property/OGC/0/PlatformLocation`
 

The sos result stream looks like `timeStamp,fakeLat,fakeLon,fakeAlt`

## Create the new MyFakeLatLonAlt DataReceiver

The idea is to extract the timestamp and the date from the textual stream. The [OSH.DataReceiver.DataSource](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/OSH.DataReceiver.DataSource.html) can be extended:

```javascript
OSH.DataReceiver.MyFakeLatLonAlt= OSH.DataReceiver.DataSource.extend({

    parseTimeStamp: function($super,data){
        // do something
        // this part extracts the timestamp 
        // the data could be text, binary etc..
    },
    
    parseData: function($super,data){
        // do something
        // this part extracts only the data without timestamp
    }
});
```

## Extract the timeStamp

Every data sent by the server includes a timestamp, the client has to extract it. In this example, the server 
could send something like `"1977-04-22T06:00:00Z,2.464,5.278,30.0"`:

```javascript
parseTimeStamp: function($super,data){
    // get record from websocket
    var record = String.fromCharCode.apply(null, new Uint8Array(data));

    // split the record using "," as separator
    var tokens = record.trim().split(",");

    // return the timeStamp using Data JS Object and getTime (milliseconds)
    return new Date(tokens[0]).getTime();
}
```
## Extract the data

You need now to extract the `2.464,5.278,30.0` part:

```javascript
parseData: function($super,data){
    // get data from WebSocket
    var record = String.fromCharCode.apply(null, new Uint8Array(data));
    
    // split String using "," as separator
    var tokens = record.trim().split(",");

    // get lat, lon, alt
    var lat = parseFloat(tokens[1]);
    var lon = parseFloat(tokens[2]);
    var alt = parseFloat(tokens[3]);
    
    // return JS object
    return {
      lat : lat,
      lon : lon,
      alt : alt
    };
} 
```

## Instantiate your new DataReceiver

You can now instantiate your new class:

```javascript
var myFakeLatLonAlt = new OSH.DataReceiver.MyFakeLatLonAlt("Fake GPS", {
    protocol : "ws",
    service: "SOS",
    endpointUrl: hostname + "/sensorhub/sos",
    offeringID: "fake-offering", // the corresponding offering
    observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformLocation",
    startTime: "2016-08-30T19:00:40Z",
    endTime: "2016-08-30T19:22:00Z",
    replaySpeed: 1,
    syncMasterTime: true
});
```
