define(['dist/js/osh'], function() {
    describe('Test suite for OSH.DataConnector.DataConnector', function() {
        it('should have a constructor that initializes to the given url and auto generates an ID', function() {
            var dataSrc = new OSH.DataConnector.DataConnector('www.gmail.com');
            expect(dataSrc.id).not.toBeNull();
            expect(dataSrc.id).toBeDefined();
            expect(dataSrc.url).toEqual('www.gmail.com');
        });

        it('should have accessors that provide data that match the corresponding properties', function() {
            var dataSrc = new OSH.DataConnector.DataConnector('www.gmail.com');
            expect(dataSrc.getId()).toEqual(dataSrc.id);
            expect(dataSrc.getUrl()).toEqual(dataSrc.url);
        });
    });
});