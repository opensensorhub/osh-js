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
            registeredParser: {},
            refs: {}
        });
    }

    build(element) {
        this.parseElement(element);
    }
}

class TextDataParser {

    constructor(rootElement, encoding) {
        this.nodesId = {};
        this.parsers = [];
        this.count = 0;
        this.resultEncoding = encoding;
        this.parser = new RootParser();
        this.parser.init(rootElement);
    }

    parseDataBlock(arrayBuffer) {
        let dataBlock = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));

        const blocks = dataBlock.split(this.resultEncoding.blockSeparator);
        //split 1 record
        let results = [];
        for(let block of blocks) {
            if(block.length > 0) {
                const tokens = dataBlock.split(this.resultEncoding.tokenSeparator);
                const res = {};
                const props = {
                    time: undefined,
                    index: 0
                }
                this.parser.parse(tokens, props, res);
                results.push(res);
            }
        }
        return results;
    }
}

export default TextDataParser;
