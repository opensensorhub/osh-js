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
class DoubleParser extends AbstractParser {
    constructor(name) {
        super();
        this.name = name;
    }
    parse(arrayBuffer, props, resultParent) {
        const result = new DataView(arrayBuffer).getFloat64(props.offset, props.littleEndian) * 1000;
        props.offset += 8;
        resultParent[this.name] = result;
    }
}

//http://www.opengis.net/def/dataType/OGC/0/signedInt
class IntParser  extends AbstractParser {
    constructor(name) {
        super();
        this.name = name;
    }

    parse(arrayBuffer, props, resultParent) {
        const result = new DataView(arrayBuffer).getUint32(props.offset, props.littleEndian);
        props.offset += 4;
        resultParent[this.name] = result;
    }
}

//http://www.opengis.net/def/dataType/OGC/0/signedShort
class ShortParser extends AbstractParser {
    constructor(name) {
        super();
        this.name = name;
    }
    parse(arrayBuffer, props, resultParent) {
        const result = new DataView(arrayBuffer).getInt16(props.offset, props.littleEndian);
        props.offset += 2;
        resultParent[this.name] = result;
    }
}

class BinaryBlockParser  extends AbstractParser {
    constructor(name, staticProps) {
        super();
        this.name = name;
        this.staticProps = staticProps;
    }
    // audio problem: http://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResultTemplate&offering=urn:android:device:dd90fceba7fd5b47-sos&observedProperty=http://sensorml.com/ont/swe/property/AudioFrame
    parse(arrayBuffer, props, resultParent) {
        const block = {};

        // everytime a binaryblock is defined in the binary encoding, there will be a 4-bytes length field before it
        const pktLength = new DataView(arrayBuffer).getUint32(props.offset, props.littleEndian);
        props.offset += 4;

        const result = new Uint8Array(arrayBuffer, props.offset, pktLength);
        props.offset += pktLength;

        for(let prop in this.staticProps) {
            block[prop] = this.staticProps[prop];
        }
        block['data'] = result;
        resultParent[this.name] = block;
    }
}

class ComponentParser extends AbstractParser {
    build(element) {
        this.name = element.ref.replaceAll('/','');
        if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/double') {
            this.dataTypeParser = new DoubleParser(this.name);
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/signedInt'){
            this.dataTypeParser = new IntParser(this.name);
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/signedShort') {
            this.dataTypeParser = new ShortParser(this.name);
        }
        this.props.refs[this.name] = this.dataTypeParser;

    }
}

class BlockParser extends AbstractParser {
    build(element) {
        this.staticProp = {};
        // check for static props
        for(let prop in element) {
            if(prop !== 'ref' && prop !== 'type') {
                this.staticProp[prop] = element[prop];
            }
        }
        this.name =  element.ref.replaceAll('/','');
        this.props.refs[this.name] = this;
        this.props.refs[this.name] =  new BinaryBlockParser(this.name,this.staticProp);
    }
}

class RootParser extends AbstractParser {
    build(element) {
        this.parseElement(element);
    }
}

class TraverseParser extends AbstractParser {
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
                'Time': () => new TraverseParser(),
                'Category': () => new TraverseParser(),
                'Quantity': () => new TraverseParser(),
                'Count': () => new TraverseParser(),
                'Boolean': () => new TraverseParser(),
                'DataChoice': () => new TraverseParser(),
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
            offset: 0,
            littleEndian: this.resultEncoding.byteOrder === 'littleEndian'
        }
        this.parser.parse(arrayBuffer, props, res);
        res['timestamp'] = new Date(res[this.parser.getTimePropertyName()]).getTime();
        // console.log(res);
        return res;
    }
}

export default BinaryDataParser;
