import AbstractParser from "../AbstractParser";

class TimeParser extends AbstractParser {
    parse(tokens, props, resultParent) {
        let token = this.dataTypeDecoder.decode(tokens,props, this.path);
        resultParent[this.name] = new Date(token).toISOString();
    }
    checkTime(element) {
        if ('definition' in element
            &&
            (element['definition'] === 'http://www.opengis.net/def/property/OGC/0/SamplingTime' ||
                element['definition'] === 'http://www.opengis.net/def/property/OGC/0/PhenomenonTime')) {
            this.time = this.name;
        }
    }
}

export default TimeParser;
