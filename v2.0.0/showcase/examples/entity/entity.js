import EntityTreeView from "osh/ui/view/entity/EntityTreeView.js";
import SweJson from "osh/datareceiver/SweJson.js";
import Entity from "osh/entity/Entity.js";

let chartDataSource = new SweJson("weather", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:mysos:offering03",
    observedProperty: "http://sensorml.com/ont/swe/property/Weather",
    startTime: "now",
    endTime: "2055-01-01Z",
    bufferingTime: 0
});

const entity = new Entity('Sensor',[chartDataSource]);

let entityTreeView = new EntityTreeView("tree-container",
    [{
      entity : entity,
      path: "Sensors/Toulouse",
      treeIcon : "images/android_icon.png"
    }],
    {
      css: "tree-container"
    }
);
