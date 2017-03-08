define(['dist/js/osh'], function() {
    var dataRcv;
    var buf;
    describe('OSH.DataReceiver.VideoMjpeg', function() {
        beforeEach(function() {
            dataRcv = new OSH.DataReceiver.VideoMjpeg('TestSource', {});
            buf = new ArrayBuffer(16);
            var dv = new DataView(buf);
            dv.setFloat64(0, 3.14, false /* bigEndian */);
            //frame length (666), needs to be present with a false value for parseData to work
            dv.setUint32(8, 666, false /* bigEndian */);
            dv.setUint8(12, 1, false /* bigEndian */);
            dv.setUint8(13, 2, false /* bigEndian */);
            dv.setUint8(14, 3, false /* bigEndian */);
            dv.setUint8(15, 4, false /* bigEndian */);
        });

        describe('parseData()', function() {
            it('should parse and create blob from data buffer and return an object url', function() {
                spyOn(window.URL, 'createObjectURL').and.callThrough();
                var url = dataRcv.parseData(buf);
                expect(url.indexOf('http')).not.toBe(-1);
            });
        });

        describe('parseTimeStamp()', function() {
            it('should parse and return timestamp from the data buffer converted to ms (i.e. x1000)', function() {
                var time = dataRcv.parseTimeStamp(buf);
                expect(time).toBe(3140);
            });
        });
    });
});
