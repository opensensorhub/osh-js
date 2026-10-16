import ConSysApiCollectionObjectParser from "./ConSysApiCollectionObjectParser";
import SamplingFeature from "../../../consysapi/samplingfeature/SamplingFeature";

class ConSysApiFetchSamplingFeatureParser extends ConSysApiCollectionObjectParser {
    parseData(data) {
        return new SamplingFeature(
            {
                ...data,
                geometry: data.geometry || undefined,
                bbox: data.bbox || undefined
            },

            this.networkProperties
        );
    }
}

export default ConSysApiFetchSamplingFeatureParser;
