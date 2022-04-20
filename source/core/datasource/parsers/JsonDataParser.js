import AbstractParser from "./AbstractParser";
// class SweApiParser extends AbstractParser {
//     constructor(element) {
//         super(element, {
//             nodesId: {},
//             nodesIdValue: {},
//         });
//     }
//     build(element) {
//         this.parseElement(element.resultSchema);
//     }
// }

class RootParser extends AbstractParser {
    init(element) {
        super.init(element, {
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {
            }
        });
    }
    build(element) {
        this.parseElement(element);
    }
}

class JsonDataParser {

    constructor(rootElement) {
        this.nodesId = {};
        this.parsers = [];
        this.count = 0;
        this.parser = new RootParser();
        this.parser.init(rootElement)
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
