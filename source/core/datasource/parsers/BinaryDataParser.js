import AbstractParser from "./AbstractParser";

class BinaryEncodingParser extends AbstractParser {
    build(element) {
        // iterate over member
        for(let member of element['member']) {
            this.parseElement(member);
        }
    }
}

class MemberParser extends AbstractParser {
    build(element) {
        this.parseElement(element);
    }
}

// http://www.opengis.net/def/dataType/OGC/0/double
class DoubleParser  extends AbstractParser {
    parse(arrayBuffer, props, resultParent) {
        const result = new DataView(arrayBuffer).getFloat64(props.offset, props.littleEndian) * 1000;
        props.offset += 8;
        return result;
    }
}

//http://www.opengis.net/def/dataType/OGC/0/signedInt
class IntParser  extends AbstractParser {
    parse(arrayBuffer, props, resultParent) {
        const result = new DataView(arrayBuffer).getUint32(props.offset, props.littleEndian);
        props.offset += 4;
        return result;
    }
}

class BinaryBlockParser  extends AbstractParser {
    constructor() {
        super();
        this.name = 'frameData';
    }

    parse(arrayBuffer, props, resultParent) {
        const result = new Uint8Array(arrayBuffer, props.offset, arrayBuffer.byteLength - props.offset);
        props.offset += result.byteLength;
        return result;
    }
}

class ComponentParser extends AbstractParser {
    build(element) {
        let dataTypeParser;
        if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/double') {
            dataTypeParser = new DoubleParser();
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/signedInt'){
            dataTypeParser = new IntParser();
        }
        this.props.refs[element.ref.replaceAll('/','')] = dataTypeParser;
    }
}

class BlockParser extends AbstractParser {
    build(element) {
        this.name = 'compression';
        this.value = element.compression;
        this.props.refs[element.ref.replaceAll('/','')] =  new BinaryBlockParser();
    }

    parse(arrayBuffer, props, resultParent) {
        resultParent[this.name] = this.value;
    }
}

class RootParser extends AbstractParser {
    build(element) {
        this.parseElement(element);
    }
}

class BinaryDataParser {

    constructor(rootElement, encoding) {
        this.nodesId = {};
        this.parsers = [];
        this.count = 0;
        this.resultEncoding = encoding;
        this.parser = new RootParser();

        const props = {
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {
                'member': () => new MemberParser(),
                'Component': () => new ComponentParser(),
                'Block': () => new BlockParser(),
                'BinaryEncoding': () => new BinaryEncodingParser(),
            },
            refs: {},
        };

        this.parser.init(this.resultEncoding,props);
        this.parser.init(rootElement, props);
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
