import DataSourceParser from "../../../parsers/DataSourceParser";
import FeatureOfInterest from "../../../../sweapi/featureofinterest/FeatureOfInterest";

class SweApiFetchFeatureOfInterestParser extends DataSourceParser {
    constructor(networkProperties) {
        super();
        this.networkProperties = networkProperties;
    }

    parseData(data) {
        let rec;
        if(data instanceof ArrayBuffer) {
            rec = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));
        } else {
            rec = data;
        }

        return new FeatureOfInterest(
            {
                id: rec.id,
                type: rec.type,
                geometry: rec.geometry || undefined,
                bbox: rec.bbox || undefined,
                properties: rec.properties
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
