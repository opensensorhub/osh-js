import Observations from "../../source/core/consysapi/observation/Observations";

describe('Observation and Observation API helpers', () => {
    const networkProperties = {
        endpointUrl: "localhost:8282/sensorhub/api",
        tls: false,
        connectorOpts: {
            username: "admin",
            password: "admin"
        }
    };

    describe('Observations', () => {
        let api;

        beforeEach(() => {
            api = new Observations(networkProperties);
        });

        test("Should instantiate Observations API", () => {
            expect(api).toBeInstanceOf(Observations);
            expect(api.conSysApiFetchObservationParser).toBeDefined();
        });

        test('should build a valid Collection in searchObservations', async () => {
            const collection = await api.searchObservations(); // uses default pageSize = 10 , pageOffset = 0
            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
            console.log('Page from default search',page);
        });
    });

    describe('Observation class', () => {
        let api;
        let observation;

        async function testCollection(fn) {
            const collection = await fn;
            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
            return page;
        }

        beforeEach(async () => {
            api = new Observations(networkProperties);
            const collection = await api.searchObservations(undefined, 15, 30);

            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
            expect(page.length).toBeGreaterThan(0);
            observation = page;

            console.log("Observation with offset ", observation);
        });

        test('should load observations', async () => {
            expect(observation).toBeDefined();
        });


        test('Should return later observations when using an; offset', async () => {
            api = new Observations(networkProperties);

            const firstCollection = await api.searchObservations(undefined, 10, 0);
            const firstPage = await firstCollection.nextPage();
            expect(firstPage.length).toBeGreaterThan(0);

            const secondCollection = await api.searchObservations(undefined, 10, 10);
            const secondPage = await secondCollection.nextPage();
            expect(secondPage.length).toBeGreaterThan(0);


            if (firstPage[0].properties.resultTime && secondPage[0].properties.resultTime) {
                // check that both have a result time

                const firstPageObs = firstPage[0];
                const secondPageObs = secondPage[0];
                expect(secondPageObs.properties.resultTime >= firstPageObs.properties.resultTime).toBe(true);
            }

            console.log("Offset check test pages, ", {firstPage, secondPage});

        });
    });

});