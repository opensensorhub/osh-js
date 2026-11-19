import MqttProvider from "osh-js/core/mqtt/MqttProvider";
import {randomUUID} from "osh-js/core/utils/Utils";
import ObservationFilter from "../../../source/core/consysapi/observation/ObservationFilter";

const textAreaElement0 =  document.getElementById("data-container0");
const textAreaElement1 =  document.getElementById("data-container1");
const textAreaElement2 =  document.getElementById("data-container2");

const mqttProvider = new MqttProvider({
   endpoint: 'mqtts://api.georobotix.io:443/ogc/t18',
   prefix: '/api',
   clientId: randomUUID()
});

mqttProvider.connect();

const textDecoder = new TextDecoder();

const queryString = new ObservationFilter().toQueryString(['format']);

function subscribe0() {
   mqttProvider.subscribe(`/datastreams/rbnag2hrc04mm/observations?${queryString}`, async function (message) {
      const data = textDecoder.decode(message);
      const jsonData = JSON.parse(data);
      textAreaElement0.value = '[rbnag2hrc04mm] ' + JSON.stringify(jsonData, null, 2);
   });
}
subscribe0();

mqttProvider.subscribe(`/datastreams/rbnag2hrc04mm/observations?${queryString}`,async function (message) {
   const data = textDecoder.decode(message);
   const jsonData = JSON.parse(data);
   textAreaElement1.value = '[rbnag2hrc04mm] ' + JSON.stringify(jsonData, null, 2);
});

mqttProvider.subscribe(`/datastreams/huldv9uv2t5sa/observations?${queryString}`,async function (message) {
   const data = textDecoder.decode(message);
   const jsonData = JSON.parse(data);
   textAreaElement2.value = '[huldv9uv2t5sa] ' + JSON.stringify(jsonData, null, 2);
});

setInterval(() => {
   mqttProvider.unsubscribe(`/datastreams/rbnag2hrc04mm/observations?${queryString}`);
   textAreaElement0.value = '[rbnag2hrc04mm] Unsubscribed';
   setTimeout(() => subscribe0(),1000 * 2);
},1000 * 5); //5s

