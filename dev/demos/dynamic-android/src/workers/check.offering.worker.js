import Server from "core/server/Server.js";
import {isDefined} from "core/utils/Utils.js";

self.serverData = {};
self.items = {};
let worker = self;
self.onmessage = (event) => {
    self.server = new Server(event.data);
    worker.serverData = event.data;

    setInterval(() => {
        server.getCapabilities(successFn, errorFn);
    }, 5000);
}


function successFn(event) {
    let items = event.Capabilities.contents.offering.map(offering => {
        let starTime = 'now';
        let endTime = '2055-01-01T00:00:00.00Z';
        if (!isDefined(offering.phenomenonTime.endPosition.indeterminatePosition)) {
            starTime = offering.phenomenonTime.beginPosition;
            endTime = offering.phenomenonTime.endPosition;
        }
        return {
            name: offering.name,
            id: offering.identifier,
            online: offering.phenomenonTime.beginPosition.indeterminatePosition !== 'unknown',
            procedure: offering.procedure,
            compression: 'h264',
            startTime: starTime,
            endTime: endTime,
            roll: false,
            heading: false,
            location: false,
            video: false
        };
    });

    const allPromises = [];
    for (let item of items) {
        allPromises.push(server.getDescribeSensorAsJson(item.procedure, errorFn));
    }

    // get corresponding compression
    Promise.all(allPromises).then((values) => {
            let index = 0;
            for (let describe of values) {
                try {
                    for(let output of describe.outputs.outputs) {
                        /*
                            http://sensorml.com/ont/swe/property/OrientationQuaternion
                            http://sensorml.com/ont/swe/property/Location
                            http://sensorml.com/ont/swe/property/VideoFrame
                        */
                        if(output.elementType.definition === 'http://sensorml.com/ont/swe/property/OrientationQuaternion') {
                            items[index].heading = true;
                        } else if(output.elementType.definition === 'http://sensorml.com/ont/swe/property/Location') {
                            items[index].location = true;
                        } else if(output.elementType.definition === 'http://sensorml.com/ont/swe/property/VideoFrame') {
                            items[index].video = true;
                            // get roll
                            for(let field of output.elementType.fields) {
                                if(field.definition === 'http://sensorml.com/ont/core/property/RollAngle' || field.name === 'videoRoll') {
                                    items[index].roll = true;
                                    break;
                                }
                            }

                            // get codec
                            for(let member of output.encoding.members) {
                                if(member.type === 'Block' || member.ref === '/img') {
                                    items[index].compression = member.compression.toLowerCase();
                                    if(items[index].compression === 'h265') {
                                        items[index].compression = 'hevc';
                                    }
                                    break;
                                }
                            }
                        }
                    }
                } catch (ex) {
                    console.error(ex);
                }
                index++;
            }
            return items;
        }
    ).then(items => computeTree(items));
}

function computeTree(items) {
    const changedItems = [];
    for (let item of items) {
        if (!(item.id in self.items)
            || (self.items[item.id].online !== item.online)
            || (self.items[item.id].compression !== item.compression)
           ) {
            self.items[item.id] = item;
            changedItems.push(item);
        }
    }
    // compare items and current items
    if (changedItems.length > 0) {
        console.log(changedItems)
        worker.postMessage(changedItems)
    }
}

function errorFn(event) {
    // worker.postMessage([])
}
