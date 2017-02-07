define(['vendor/leaflet/dist/leaflet','dist/js/osh'], function() {
    describe("Test suite for OSH.DataReceiver.LatLonAlt", function() {
        it("should have a constructor that correctly initializes a valid object", function() {
            var latLondataSource = new OSH.DataReceiver.LatLonAlt('android-GPS', {
                protocol: 'ws',
                service: 'SOS',
                endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
                offeringID: 'urn:android:device:060693280a28e015-sos',
                observedProperty: 'http://sensorml.com/ont/swe/property/Location',
                startTime: '2015-02-16T07:58:00Z',
                endTime: '2015-02-16T08:09:00Z',
                replaySpeed: '3',
                syncMasterTime: true,
                bufferingTime: 1000,
                timeShift: -16000
            });
            expect(latLondataSource).not.toBeNull();
            expect(latLondataSource).toBeDefined();
            expect(latLondataSource.timeShift).toEqual(-16000);
        });
    });
});