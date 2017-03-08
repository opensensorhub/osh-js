define(['dist/js/osh'], function() {
    var dataRcv;
    var buf;
    describe('OSH.DataReceiver.OrientationQuaternion', function() {
        beforeEach(function() {
            dataRcv = new OSH.DataReceiver.OrientationQuaternion('TestSource', {});

            //send 90 heading rotation for quaternion data (x,y,z,w)
            var str = '2015-02-16T07:58:00Z, 0.0, -0.7071, 0.0, 0.7071';
            buf = new ArrayBuffer(str.length);
            var bufView = new Uint8Array(buf);
            for (var i=0, strLen=str.length; i<strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }
        });

        describe('parseData()', function() {
            it('should parse and return data (heading,pitch,roll) from the data array buffer', function() {
                var data = dataRcv.parseData(buf);
                expect(data.heading).toBe(90);

                //TODO: currently roll and pitch aren't calculated by the library but will be
                //expect(data.pitch).toBe(0.0);
                //expect(data.roll).toBe(0.0);
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
