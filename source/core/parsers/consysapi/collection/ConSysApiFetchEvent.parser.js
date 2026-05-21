import ConSysApiCollectionObjectParser from "./ConSysApiCollectionObjectParser";

class ConSysApiFetchEventParser extends ConSysApiCollectionObjectParser {
    parseData(data) {
        return new Event(
            data,
            this.networkProperties
        );
    }
}

export default ConSysApiFetchEventParser;
