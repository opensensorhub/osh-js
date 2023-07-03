class SweApiDatasourceUpdater {
    constructor(properties) {
        this.properties = properties;
        this.datastreamInterval = undefined;
    }

    async fetchTime(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    // create error object and reject if not a 2xx response code
                    let err = new Error("HTTP status code: " + response.status)
                    err.response = response
                    err.status = response.status
                    this.onError(err);
                    throw err
                }
                return response
            })
            .then(response => response.json())
            .then(response => {
                // update datastream times
                if(response && response.items.length > 0 && response.items[0].phenomenonTime
                    && response.items[0].phenomenonTime.length > 1) {
                    const minTime = response.items[0].phenomenonTime[0];
                    const maxTime = response.items[0].phenomenonTime[1];
                    this.onTimeChanged(minTime, maxTime);
                }
            });
    }
    async start() {
        const regex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/observations
        if(regex.test(this.properties.resource)) {
            // is observation streaming
            const match = regex.exec(this.properties.resource);
            const datastreamId = match[2];
            const url = `http${this.properties.tls? 's' : ''}://${this.properties.endpointUrl}/datastreams?id=${datastreamId}&select=id,phenomenonTime&f=application%2Fjson`;
            return this.fetchTime(url).then(() => {
                this.datastreamInterval = setInterval(() => {
                    this.fetchTime(url);
                }, 5000);
            })
        } else {
            throw Error(`Cannot parse dataStream id from resource ${this.properties.resource}`);
        }
    }
    onTimeChanged(min, max){}

    onError(err){}
    destroy() {
        clearInterval(this.datastreamInterval);
    }
}

export default SweApiDatasourceUpdater;
