import DataSourceParser from "../../../parsers/DataSourceParser";
import FeatureOfInterest from "../../../../sweapi/featureofinterest/FeatureOfInterest";

class SweApiFetchFeatureOfInterestParser extends DataSourceParser {
    constructor(networkProperties) {
        super();
        this.networkProperties = networkProperties;
    }

    parseData(data) {
        return new FeatureOfInterest(
            {
                id: data.id,
                type: data.type,
                geometry: data.geometry || undefined,
                bbox: data.bbox || undefined,
                properties: data.properties
            },
            this.networkProperties
        );
    }

    parseTimeStamp(data) {
        return 0;
    }

    buildUrl(properties) {
        //TODO
    }
}

export default SweApiFetchFeatureOfInterestParser;
