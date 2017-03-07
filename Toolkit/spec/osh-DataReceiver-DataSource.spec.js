define(['dist/js/osh'], function() {
    var dataRcv;
    var wsUrl = 'ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/Location&temporalFilter=phenomenonTime,2015-02-16T07:58:00Z/2015-02-16T08:09:00Z&replaySpeed=3';
    describe('Test suite for OSH.DataReceiver.DataSource', function() {
        beforeEach(function() {
            dataRcv = new OSH.DataReceiver.DataSource('TestSource', {
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

        });

        describe('constructor()', function() {
            it('should initialize the object with the given name and properties', function() {
                expect(dataRcv.id).toBeDefined();
                expect(dataRcv.name).toBe('TestSource');
                expect(dataRcv.timeShift).toBe(-16000);
                expect(dataRcv.bufferingTime).toBe(1000);
                expect(dataRcv.syncMasterTime).toBe(true);
            });

            it('should create the appropriate data connector if the protocol is \'ws\'', function() {
                expect(dataRcv.connector).toBeDefined();
            });
        });

        describe('buildUrl()', function() {
            it('should build a full string url for websocket based on object properties', function() {
                expect(dataRcv.buildUrl(dataRcv.properties)).toBe(wsUrl);
            });
        });

        describe('connect()', function() {
            beforeEach(function() {
                spyOn(dataRcv.connector, 'connect').and.callFake(function() {});
                dataRcv.connect();
            });

            it('should set the connected flag to true', function() {
                expect(dataRcv.connected).toBe(true);
            });

            it('should call the connect method on the underlying connector object', function() {
                expect(dataRcv.connector.connect).toHaveBeenCalled();
            });
        });

        describe('disconnect()', function() {
            beforeEach(function() {
                spyOn(dataRcv.connector, 'disconnect').and.callFake(function() {});
                spyOn(OSH.EventManager, 'fire').and.callFake(function() {});
                dataRcv.disconnect();
            });

            it('should set the connected flag to false', function() {
                expect(dataRcv.connected).toBe(false);
            });

            it('should call the disconnect method on the underlying connector object', function() {
                expect(dataRcv.connector.disconnect).toHaveBeenCalled();
            });

            it('should publish a data reset event', function() {
                expect(OSH.EventManager.fire).toHaveBeenCalled();
                expect(OSH.EventManager.fire).toHaveBeenCalledWith(OSH.EventManager.EVENT.DATA+"-"+dataRcv.id, { dataSourceId: dataRcv.id, reset: true });
            });
        });
    });
});
