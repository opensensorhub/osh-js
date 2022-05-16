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

        this.textDecoder = new TextDecoder();
        this.parser = new RootParser();
        this.parser.init(rootElement, props)
    }

    getTimeField() {
        return this.parser.getTimePropertyName();
    }

    parseDataBlock(arrayBuffer) {
        let dataBlock = this.textDecoder.decode(arrayBuffer);
        const jsonData = JSON.parse(dataBlock);

        if(Array.isArray(jsonData)) {
            for(let d of jsonData) {
                d['timestamp'] = new Date(d[this.getTimeField()]).getTime();
            }
        } else {
            jsonData['timestamp'] = new Date(jsonData[this.getTimeField()]).getTime();
        }
        return jsonData;
    }
}

export default JsonDataParser;
