import MqttProvider from "osh-js/core/mqtt/MqttProvider";
import {randomUUID} from "osh-js/core/utils/Utils";
import SweApiFetchGenericJson from "../../../source/core/datasource/sweapi/parser/json/SweApiFetchGenericJson.parser";

const textAreaElement =  document.getElementById("data-container");

const mqttProvider = new MqttProvider({
   endpoint: 'mqtt://ogct17.georobotix.io:8083',
   clientId: randomUUID()
});

mqttProvider.connect();
let count = 0;

mqttProvider.subscribeToObservations('/api/datastreams/gal7w6j6v7n9/observations','application/json',async function (message) {
   const parser = new SweApiFetchGenericJson();
   const data = await parser.parseData(message).result;
   if(count++ < 30) {
      textAreaElement.value += '[gal7w6j6v7n9] '+JSON.stringify(data.location) + "\n";
   } else {
      textAreaElement.value  = JSON.stringify(data.location) + "\n";
      count = 0;
   }
});

mqttProvider.subscribeToObservations('/api/datastreams/1lppw59ger1py/observations','application/json',async function (message) {
   const parser = new SweApiFetchGenericJson();
   const data = await parser.parseData(message).result;
   if(count++ < 30) {
      textAreaElement.value += '[1lppw59ger1py (0)] ' +  JSON.stringify(data) + "\n";
   } else {
      textAreaElement.value  = '[1lppw59ger1py (0)] ' +  JSON.stringify(data) + "\n";
      count = 0;
   }});

mqttProvider.subscribeToObservations('/api/datastreams/1lppw59ger1py/observations','application/json',async function (message) {
   const parser = new SweApiFetchGenericJson();
   const data = await parser.parseData(message).result;
   if(count++ < 30) {
      textAreaElement.value += '[1lppw59ger1py (1)] ' + JSON.stringify(data) + "\n";
   } else {
      textAreaElement.value  = '[1lppw59ger1py (1)] ' + JSON.stringify(data) + "\n";
      count = 0;
   }});

setTimeout(() => {
   mqttProvider.unsubscribeDs('/api/datastreams/gal7w6j6v7n9/observations');
   textAreaElement.value += '[gal7w6j6v7n9] Unsubscribed' + "\n";
},1000 * 10); //10s

