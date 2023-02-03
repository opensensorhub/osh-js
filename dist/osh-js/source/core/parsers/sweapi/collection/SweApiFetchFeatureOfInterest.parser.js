import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";
import FeatureOfInterest from "../../../sweapi/featureofinterest/FeatureOfInterest";

class SweApiFetchFeatureOfInterestParser extends SweApiCollectionObjectParser {
    parseData(data) {
        return new FeatureOfInterest(
            {
                ...data,
                geometry: data.geometry || undefined,
                bbox: data.bbox || undefined
            },

            this.networkProperties
        );
    }
}

export default SweApiFetchFeatureOfInterestParser;
