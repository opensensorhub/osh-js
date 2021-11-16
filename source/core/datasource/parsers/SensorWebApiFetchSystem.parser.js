import DataSourceParser from "./DataSourceParser";
import System from "../../sensorwebapi/api/System";

class SensorWebApiFetchSystemParser extends DataSourceParser {
    constructor(networkProperties) {
        super();
        this.networkProperties = networkProperties;
    }

    parseData(data) {
        const systems = [];
        for (let i = 0; i < data.items.length; i++) {
            systems.push(new System(
                data.items[i].id,
                data.items[i].type,
                data.items[i].properties,
                this.networkProperties
            ));
        }
        return systems;
    }

    buildUrl(properties) {
        //TODO
    }
}

export default SensorWebApiFetchSystemParser;
