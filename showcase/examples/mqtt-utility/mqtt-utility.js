import MqttProvider from "../../../source/core/mqtt/MqttProvider";
import {randomUUID} from "../../../source/core/utils/Utils";
import SweApiMqttJsonParser from "../../../source/core/datasource/parsers/sensorwebapi/SweApiMqttJson.parser";

const textAreaElement =  document.getElementById("data-container");

const mqttProvider = new MqttProvider({
   endpoint: 'mqtt://ogct17.georobotix.io:8083',
   clientId: randomUUID()
});

mqttProvider.connect();
let count = 0;

mqttProvider.subscribeToObservations('/api/datastreams/gal7w6j6v7n9/observations','application/json',async function (message) {
   const parser = new SweApiMqttJsonParser();
   const data = await parser.parseData(message)
   if(count++ < 100) {
      textAreaElement.value += JSON.stringify(data.location) + "\n";
   } else {
      textAreaElement.value  = JSON.stringify(data.location) + "\n";
      count = 0;
   }
});

mqttProvider.subscribeToObservations('/api/datastreams/1lppw59ger1py/observations','application/json',async function (message) {
   const parser = new SweApiMqttJsonParser();
   const data = await parser.parseData(message)
   if(count++ < 100) {
      textAreaElement.value += '(0) ' + JSON.stringify(data) + "\n";
   } else {
      textAreaElement.value  = '(0) ' + JSON.stringify(data) + "\n";
      count = 0;
   }});

mqttProvider.subscribeToObservations('/api/datastreams/1lppw59ger1py/observations','application/json',async function (message) {
   const parser = new SweApiMqttJsonParser();
   const data = await parser.parseData(message)
   if(count++ < 100) {
      textAreaElement.value += '(1) ' + JSON.stringify(data) + "\n";
   } else {
      textAreaElement.value  = '(1) ' + JSON.stringify(data) + "\n";
      count = 0;
   }});

setTimeout(() => {
   mqttProvider.unsubscribeDs('/api/datastreams/1lppw59ger1py/observations');
},2500);

setTimeout(() => {
   mqttProvider.unsubscribeDs('/api/datastreams/gal7w6j6v7n9/observations');
},5000);

