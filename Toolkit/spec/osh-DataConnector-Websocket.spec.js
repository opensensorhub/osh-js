define(['dist/js/osh'], function() {
    var dataSrc;
    var wsUrl = 'ws://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:android:device:060693280a28e015-sos&observedProperty=http://sensorml.com/ont/swe/property/Location&temporalFilter=phenomenonTime,2015-02-16T07:58:00Z/2015-02-16T08:09:00Z&replaySpeed=3';
    describe('Test suite for OSH.DataConnector.WebSocketDataConnector', function() {
        describe('connect()', function() {
            beforeEach(function(done) {
                dataSrc = new OSH.DataConnector.WebSocketDataConnector(wsUrl);
                dataSrc.connect();
                spyOn(dataSrc, "onMessage").and.callFake(function(data) {
                    done();
                });
            }, 5000);

            it('should set init property to true if successful', function() {
                expect(dataSrc.init).toBe(true);
            });

            it('should execute callback onMessage if data is received from the websocket url', function() {
                expect(dataSrc.onMessage).toHaveBeenCalled();
            });
        });

        describe('disconnect()', function() {
            beforeEach(function(done) {
                dataSrc = new OSH.DataConnector.WebSocketDataConnector(wsUrl);
                dataSrc.connect();
                spyOn(dataSrc, "onMessage").and.callFake(function(data) {
                    done();
                });
                if (OSH.Utils.isWebWorker() && dataSrc.worker != null)
                    spyOn(dataSrc.worker, "terminate").and.callFake(function() {});
                else if (dataSrc.ws != null)
                    spyOn(dataSrc.ws, "close").and.callFake(function() {});

            }, 5000);

            it('should release websocket or webworker resources when called', function() {
                dataSrc.disconnect();
                if (OSH.Utils.isWebWorker() && dataSrc.worker != null) {
                    expect(dataSrc.init).toBe(false);
                    expect(dataSrc.worker.terminate).toHaveBeenCalled();
                } else if (dataSrc.ws != null) {
                    expect(dataSrc.init).toBe(false);
                    expect(dataSrc.ws.close).toHaveBeenCalled();
                }
            });
        });
    });
});
