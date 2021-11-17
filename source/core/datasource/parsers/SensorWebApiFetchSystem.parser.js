import DataSourceParser from "./DataSourceParser";
import System from "../../sensorwebapi/api/system/System";

class SensorWebApiFetchSystemParser extends DataSourceParser {
    constructor(networkProperties) {
        super();
        this.networkProperties = networkProperties;
    }

    parseData(data) {
        return new System(
            {
                id: data.id,
                type: data.type,
                ...data.properties,
            },
            this.networkProperties
        );
    }

    buildUrl(properties) {
        //TODO
    }
}

export default SensorWebApiFetchSystemParser;
