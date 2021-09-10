import MqttProvider from "../../../source/ext/mqtt/MqttProvider";
import ObsFilter from "../../../source/core/sensorwebapi/ObsFilter";
import {randomUUID} from "../../../source/core/utils/Utils";
import SweApiMqttJsonParser from "../../../source/ext/datasource/parsers/SweApiMqttJson.parser";

const textAreaElement =  document.getElementById("data-container");

const mqttProvider = new MqttProvider({
   endpoint: 'mqtt://ogct17.georobotix.io:8083',
   clientId: randomUUID()
});

const obsFilter = new ObsFilter({
   datastreamIds: ['/api/datastreams/gal7w6j6v7n9/observations'],
})

mqttProvider.connect();

let count = 0;

mqttProvider.subscribeToObservationsWithObsFilter(0,obsFilter,'application/json',async function (message) {
   const parser = new SweApiMqttJsonParser();
   const data = await parser.parseData(message)
   if(count++ < 100) {
      textAreaElement.value += JSON.stringify(data.location) + "\n";
   } else {
      textAreaElement.value  = JSON.stringify(data.location) + "\n";
      count = 0;
   }
});

const obsFilter2 = new ObsFilter({
   datastreamIds: ['/api/datastreams/1lppw59ger1py/observations'],
});

mqttProvider.subscribeToObservationsWithObsFilter(0,obsFilter2,'application/json',async function (message) {
   const parser = new SweApiMqttJsonParser();
   const data = await parser.parseData(message)
   if(count++ < 100) {
      textAreaElement.value += '(0) ' + JSON.stringify(data) + "\n";
   } else {
      textAreaElement.value  = '(0) ' + JSON.stringify(data) + "\n";
      count = 0;
   }});

const obsFilter3 = new ObsFilter({
   datastreamIds: ['/api/datastreams/1lppw59ger1py/observations'],
});

mqttProvider.subscribeToObservationsWithObsFilter(1,obsFilter3,'application/json',async function (message) {
   const parser = new SweApiMqttJsonParser();
   const data = await parser.parseData(message)
   if(count++ < 100) {
      textAreaElement.value += '(1) ' + JSON.stringify(data) + "\n";
   } else {
      textAreaElement.value  = '(1) ' + JSON.stringify(data) + "\n";
      count = 0;
   }});

setTimeout(() => {
   mqttProvider.unsubscribeDs(0);
},2500);

