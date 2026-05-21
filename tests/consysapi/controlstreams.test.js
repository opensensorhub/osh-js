import ControlStreams from "../../source/core/consysapi/controlstream/ControlStreams";
import ControlStreamFilter from "../../source/core/consysapi/controlstream/ControlStreamFilter";

describe('ControlStreams and ControlStream API helpers', () => {
    // TODO: Use a test node that has all resource types on it
    const networkProperties = {
        endpointUrl: "localhost:8282/sensorhub/api",
        tls: false,
        connectorOpts: {
            username: "admin",
            password: "admin"
        }
    };

    describe('ControlStreams', () => {
        let api;

        beforeEach(() => {
            api = new ControlStreams(networkProperties);
        });

        test("Should instantiate ControlStreams API", () => {
            expect(api).toBeInstanceOf(ControlStreams);
            expect(api.conSysApiControlStreamParser).toBeDefined();
        });

        test('should build a valid Collection in searchControlStreams', async () => {
            const collection = await api.searchControlStreams();
            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
            console.log(page);
        });

    });

    describe('ControlStream class', () => {
        let api;
        let controlStream;
        const csProps = {id: 'test-stream-id'};

        async function testCollection(fn) {
            const collection = await fn;
            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
            console.log(page);
        }

        beforeEach(async () => {
            api = new ControlStreams(networkProperties);
            const collection = await api.searchControlStreams();
            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
            expect(page.length).toBeGreaterThan(0);
            controlStream = page[0];
        });

        test('should return valid Collection in searchStatus', async () => {
            await testCollection(controlStream.searchStatus());
        });

        test('should return valid Collection in searchCommands', async () => {
            await testCollection(controlStream.searchCommands());
        });

    });

});