import MqttProvider from "osh-js/core/mqtt/MqttProvider";
import {randomUUID} from "osh-js/core/utils/Utils";
import ObservationFilter from "../../../source/core/sweapi/observation/ObservationFilter";

const textAreaElement0 =  document.getElementById("data-container0");
const textAreaElement1 =  document.getElementById("data-container1");
const textAreaElement2 =  document.getElementById("data-container2");

const mqttProvider = new MqttProvider({
   endpoint: 'mqtt://ogct17.georobotix.io:8083',
   clientId: randomUUID()
});

mqttProvider.connect();

const textDecoder = new TextDecoder();

const queryString = new ObservationFilter().toQueryString(['format']);

function subscribe0() {
   mqttProvider.subscribe(`/datastreams/gal7w6j6v7n9/observations?${queryString}`, async function (message) {
      const data = textDecoder.decode(message);
      const jsonData = JSON.parse(data);
      textAreaElement0.value = '[gal7w6j6v7n9] ' + JSON.stringify(jsonData, null, 2);
   });
}
subscribe0();

mqttProvider.subscribe(`/datastreams/gal7w6j6v7n9/observations?${queryString}`,async function (message) {
   const data = textDecoder.decode(message);
   const jsonData = JSON.parse(data);
   textAreaElement1.value = '[gal7w6j6v7n9] ' + JSON.stringify(jsonData, null, 2);
});

mqttProvider.subscribe(`/datastreams/7rsjo1e6pq45/observations?${queryString}`,async function (message) {
   const data = textDecoder.decode(message);
   const jsonData = JSON.parse(data);
   textAreaElement2.value = '[1lppw59ger1py] ' + JSON.stringify(jsonData, null, 2);
});

setInterval(() => {
   mqttProvider.unsubscribe(`/datastreams/gal7w6j6v7n9/observations?${queryString}`);
   textAreaElement0.value = '[gal7w6j6v7n9] Unsubscribed';
   setTimeout(() => subscribe0(),1000 * 2);
},1000 * 5); //5s

