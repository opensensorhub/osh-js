import DataSourceParser from "../../../parsers/DataSourceParser";
import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";

class SweApiFetchEventParser extends SweApiCollectionObjectParser {
    parseData(data) {
        return new Event(
            data,
            this.networkProperties
        );
    }
}

export default SweApiFetchEventParser;
