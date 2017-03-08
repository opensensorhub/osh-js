define(['dist/js/osh'], function() {
    var dataRcv;
    var buf;
    describe('OSH.DataReceiver.LatLonAlt', function() {
        beforeEach(function() {
            dataRcv = new OSH.DataReceiver.LatLonAlt('TestSource', {});
            var str = '2015-02-16T07:58:00Z, 1.1, 2.2, 3.3';
            buf = new ArrayBuffer(str.length);
            var bufView = new Uint8Array(buf);
            for (var i=0, strLen=str.length; i<strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }
        });

        describe('parseData()', function() {
            it('should parse and return data (lat,lon,alt) from the data array buffer', function() {
                var data = dataRcv.parseData(buf);
                expect(data.lat).toBe(1.1);
                expect(data.lon).toBe(2.2);
                expect(data.alt).toBe(3.3);
            });
        });

        describe('parseTimeStamp()', function() {
            it('should parse and return timestamp from the data array buffer', function() {
                var data = dataRcv.parseTimeStamp(buf);
                var d = new Date('2015-02-16T07:58:00Z');
                expect(data).toBe(d.getTime());
            });
        });
    });
});
