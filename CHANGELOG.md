# Changelog

## **3.1.5**
### Fixes
Add forgotten offset parameter to `DataStream`'s `searchObservations()` method

## **3.1.4**
### Fixes
Allow specification of page offset in collection requests.

## **3.1.3**
### Fixes
Fixed DataStream stream connector using MQTT `shared` property.

## **3.1.2**
### Fixes
- Uncomment `obsFormat` in `parseDataBlock()` which broke live data streams.

## **3.1.1**
### Fixes
- Add headers to collection requests made using the Connected Systems API. This fixes authentication issues when collection requests are made.
- Fixed command and command status collection parsing.
- Corrected `ObservationFilter` to use accurate default query parameters according to OGC API - Connected Systems specification.
### Additions
- Added Jest for unit testing.
- Added control stream and data stream collection tests.

## **3.1.0**
### Changes
Added `addImageOverlay()` method to `LeafletView` for adding image overlay onto Leaflet map.

## **3.0.0**
### Changes
Refactored SWE API code to use naming conventions, query parameters, and correct paths of newer OGC API - Connected Systems standard.
OGC API - Connected Systems is the newest, OGC compliant version of the old Sensor Web Enablement (SWE) API.

## **2.1.0**

## **2.0.1**

## **1.0.0**
