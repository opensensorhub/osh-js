import Server from 'core/server/Server.js';

const server = new Server({
    url: "http://sensiasoft.net:8181" ,
    sos: "sos",
    baseUrl: "sensorhub"
});

const describeElt = document.getElementById('describe');
server.getDescribeSensorAsJson('urn:core:sensor:simgps:d136b6ea', (describe)=> {
    describeElt.innerText = JSON.stringify(describe, null,2);
});
