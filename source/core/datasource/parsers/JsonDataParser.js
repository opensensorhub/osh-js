import AbstractParser from "./AbstractParser";

class RootParser extends AbstractParser {
    build(element) {
        this.parseElement(element);
    }
}

class TraverseParser extends AbstractParser {
}

class JsonDataParser {

    constructor(rootElement) {
        this.nodesId = {};
        this.parsers = [];
        this.count = 0;

        const props = {
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {
                'Time': () => new TraverseParser(),
            },
            refs: {},
        };

        this.parser = new RootParser();
        this.parser.init(rootElement, props)
    }

    parseDataBlock(arrayBuffer) {
        let dataBlock = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
        const jsonData = JSON.parse(dataBlock);

        if(Array.isArray(jsonData)) {
            for(let d of jsonData) {
                d['timestamp'] = new Date(d[this.parser.getTimePropertyName()]).getTime();
            }
        } else {
            jsonData['timestamp'] = new Date(jsonData[this.parser.getTimePropertyName()]).getTime();
        }
        return jsonData;
    }
}

export default JsonDataParser;
