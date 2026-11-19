import Systems from "osh-js/core/consysapi/system/Systems.js";
import {EventType} from "osh-js/core/event/EventType.js";
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource.js";
import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer.js";
import LeafletView from "osh-js/core/ui/view/map/LeafletView.js";
import PolylineLayer from "osh-js/core/ui/layer/PolylineLayer.js";
import ControlStreamFilter from "osh-js/core/consysapi/controlstream/ControlStreamFilter.js";
import {Mode} from "osh-js/core/datasource/Mode";
import L from 'leaflet';

var prevTime = 0;

const systemId = "jrc2e0kaj1m5a";
const posDsId = "rbnag2hrc04mm";
const stateDsId = "huldv9uv2t5sa";
const cmdStreamId = "hf62t0dotfd5k";

const mqttProps = {
    prefix: '/api',
    endpointUrl: 'api.georobotix.io:443/ogc/t18',
};

let gpsDataSource = new ConSysApi("gps", {
    resource: `/api/datastreams/${posDsId}/observations`,
    endpointUrl: 'api.georobotix.io/ogc/t18/api',
    protocol: 'mqtt',
    mqttOpts: mqttProps,
    tls: true,
    responseFormat: 'application/swe+json',
    mode: Mode.REAL_TIME,
});

let stateDataSource = new ConSysApi("state", {
    resource: `/api/datastreams/${stateDsId}/observations`,
    endpointUrl: 'api.georobotix.io/ogc/t18/api',
    protocol: 'mqtt',
    mqttOpts: mqttProps,
    tls: true,
    responseFormat: 'application/swe+json',
    mode: Mode.REAL_TIME,
});

const systems = new Systems({
    endpointUrl: 'api.georobotix.io/ogc/t18/api',
    streamProtocol: 'mqtt',
    mqttOpts: mqttProps,
    tls: true,
});


const textCommandElt =  document.getElementById("text_commands");
const textStatusElt =  document.getElementById("text_status");

// style it with a moving point marker
const pointMarkerLayer = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => {
        const pos = rec.result?.pos ?? rec.pos;
        return {
            x: pos?.lon,
            y: pos?.lat,
            z: pos?.alt
        };
    },
    name: 'drone',
    description: 'Drone',
    icon: 'images/uav.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

let polylineLayer = new PolylineLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => {
        const pos = rec.result?.pos ?? rec.pos;
        return {
            x: pos.lon,
            y: pos.lat,
            z: pos.alt
        };
    },
    color: 'rgba(0,0,255,0.5)',
    weight: 5,
    opacity: 0.5,
    smoothFactor: 1,
    maxPoints: 200,
    name: "Hypersonic drone Path"
});

// create Leaflet view
const leafletMapView = new LeafletView({
    container: 'map',
    layers: [pointMarkerLayer, polylineLayer],
    autoZoomOnFirstMarker: true
});

let commands = new Map();

async function startListening() {
    gpsDataSource.subscribe(message => {
        const values = message.values;
        for(let obs of values) {
            document.getElementById("text_loc").innerHTML = JSON.stringify(obs, null, 2);
            prevTime = Date.parse(obs.resultTime);
        }
    }, [EventType.DATA]);
    gpsDataSource.connect();

    stateDataSource.subscribe(message => {
        const values = message.values;
        for(let obs of values) {
            document.getElementById("text_state").innerHTML = JSON.stringify(obs, null, 2);
            prevTime = Date.parse(obs.resultTime);
        }
    }, [EventType.DATA]);
    stateDataSource.connect();

    // TODO: Update to use osh-js when server endpoints are fixed /controls --> /controlstreams
    // const system = await systems.getSystemById(systemId);
    // const control = await system.getControlStreamById(cmdStreamId);
    //
    // control.streamStatus(new ControlStreamFilter({}), async (message) =>{
    //     textCommandElt.innerHTML = "";
    //     const status = message;
    //     textStatusElt.innerHTML = JSON.stringify(status, null, 2);
    //     const command = await control.getCommandById(status['command@id']);
    //     commands.set(command.properties.id, command.properties);
    //     textCommandElt.innerHTML = "";
    //     commands.forEach(cmd => {
    //         document.getElementById("text_commands").innerHTML +=
    //             Object.keys(cmd.params)[0] + ': ' + cmd.status + '<br/>';
    //     });
    // });
    const corrData = new DataView(new ArrayBuffer(4));
    let waypointMarker = null;
    leafletMapView.map.on('click', e => {
        if (waypointMarker) {
            leafletMapView.map.removeLayer(waypointMarker);
        }
        const waypointIcon = L.icon({
            iconUrl: './images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
        });
        waypointMarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: waypointIcon }).addTo(leafletMapView.map);

        let goToCmd = {
            params: {
                WAYPOINT: {
                    position: {
                        lat: e.latlng.lat,
                        lon: e.latlng.lng,
                        alt: 270
                    },
                    velocity: 100000
                }
            }
        };

        let corrId = Math.floor(Math.random() * 1e9);
        corrData.setInt32(0, corrId, false);
        sendCommand(goToCmd);
        // control.publishCommand(JSON.stringify(goToCmd));
    });

    // send takeoff command
    let takeOffCmd = {
        params: {
            AUTO_TAKEOFF: {
                height: 15.0
            }
        }
    };

    await sendCommand(takeOffCmd);
    // control.postCommand(JSON.stringify(takeOffCmd));
}

let authHeader = null;

document.getElementById('login-btn').addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    authHeader = 'Basic ' + btoa(user + ':' + pass);
    document.getElementById('login-status').textContent = ' Logged in as ' + user;
});

async function sendCommand(command) {
    const headers = { 'Content-Type': 'application/json' };
    if (authHeader) {
        headers['Authorization'] = authHeader;
    }

    await fetch(`https://api.georobotix.io/ogc/t18/api/controls/${cmdStreamId}/commands`, {
        method: 'POST',
        headers,
        body: JSON.stringify(command),
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}
startListening();
