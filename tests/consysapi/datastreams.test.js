import DataStreams from "../../source/core/consysapi/datastream/DataStreams";
import DataStreamFilter from "../../source/core/consysapi/datastream/DataStreamFilter";

describe('DataStreams and DataStream API helpers', () => {
    // TODO: Use a test node that has all resource types on it
    const networkProperties = {
        endpointUrl: "localhost:8282/sensorhub/api",
        tls: false,
        connectorOpts: {
            username: "admin",
            password: "admin"
        }
    };

    describe('DataStreams', () => {
        let api;

        beforeEach(() => {
            api = new DataStreams(networkProperties);
        });

        test("Should instantiate DataStreams API", () => {
            expect(api).toBeInstanceOf(DataStreams);
            expect(api.conSysApiDataStreamParser).toBeDefined();
        });

        test('should build a valid Collection in searchDataStreams', async () => {
            const collection = await api.searchDataStreams();
            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
            console.log(page);
        });

    });

    describe('DataStream class', () => {
        let api;
        let dataStream;

        async function testCollection(fn) {
            const collection = await fn;
            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
            console.log(page);
        }

        beforeEach(async () => {
            api = new DataStreams(networkProperties);
            const collection = await api.searchDataStreams();
            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
            expect(page.length).toBeGreaterThan(0);
            dataStream = page[0];
        });

        test('should return valid Collection in searchObservations', async () => {
            await testCollection(dataStream.searchObservations());
        });

    });

});