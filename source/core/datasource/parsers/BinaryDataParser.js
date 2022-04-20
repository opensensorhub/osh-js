import AbstractParser from "./AbstractParser";

class BinaryEncodingParser extends AbstractParser {
    init(element, props) {
        super.init(element, props);
    }
    build(element) {
        // iterate over member
        for(let member of element['member']) {
            this.parseElement(member);
        }
    }
}

class MemberParser extends AbstractParser {
    init(element, props) {
        super.init(element, props);
    }
    build(element) {
        this.parseElement(element);
    }
}

class DoubleParser  {
    parse(arrayBuffer, props, resultParent) {

    }
}

class ComponentParser extends AbstractParser {
    init(element, props) {
        super.init(element, props);
    }
    build(element) {
        if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/double') {
            this.parser = new DoubleParser();
        }
        this.ref = element.ref;
    }
}

class BlockParser extends AbstractParser {
    init(element, props) {
        super.init(element, props);
    }
    build(element) {
        this.name = 'compression';
        this.value = element.compression;
        this.ref = element.ref;
    }

    parse(arrayBuffer, props, resultParent) {
        resultParent[this.name] = this.value;
    }
}

class RootParser extends AbstractParser {
    init(element) {
        super.init(element, {
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {
                'member': () => new MemberParser(),
                'Component': () => new ComponentParser(),
                'Block': () => new BlockParser(),
                'BinaryEncoding': () => new BinaryEncodingParser()
            }
        });
    }
    build(element) {
        this.parseElement(element);
    }
}

class BinaryDataParser {

    constructor(rootElement, encoding) {
        console.log(rootElement)
        this.nodesId = {};
        this.parsers = [];
        this.count = 0;
        this.resultEncoding = encoding;
        this.parser = new RootParser();
        // this.parser.init(rootElement);
        console.log(this.resultEncoding)
        this.parser.init(this.resultEncoding);
    }

    parseDataBlock(arrayBuffer) {
        const res = {};
        const props = {
            time: undefined,
            index: 0,
            offset: 0,
            littleEndian: this.resultEncoding.byteOrder === 'littleEndian'
        }
        this.parser.parse(arrayBuffer, props, res);
        console.log(res)
        return res;
    }
}

export default BinaryDataParser;
