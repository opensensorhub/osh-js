import AbstractParser from "./AbstractParser";
import GenericParser from "./GenericParser";
import SkipParser from "./common/SkipParser";

class BinaryEncodingParser extends AbstractParser {
    build(element) {
        // iterate over member
        // old SOS property name
        let memberPropertyName = 'member';

        // new SWE property name
        if('members' in element) {
            memberPropertyName = 'members';
        }
        for(let member of element[memberPropertyName]) {
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
        const result = new DataView(arrayBuffer).getFloat64(props.offset, props.littleEndian);
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

//http://www.opengis.net/def/dataType/OGC/0/float32
class Float32Parser extends AbstractParser {
    constructor(name) {
        super();
        this.name = name;
    }
    parse(arrayBuffer, props, resultParent) {
        const result = new DataView(arrayBuffer).getFloat32(props.offset, props.littleEndian);
        props.offset += 4;
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
        this.name = this.splitRefName(element.ref);
        if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/double') {
            this.dataTypeParser = new DoubleParser(this.name);
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/signedInt'){
            this.dataTypeParser = new IntParser(this.name);
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/signedShort') {
            this.dataTypeParser = new ShortParser(this.name);
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/float32') {
            this.dataTypeParser = new Float32Parser(this.name);
        }
        this.props.refs[element.ref] = this.dataTypeParser;

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
        this.name = this.splitRefName(element.ref);
        this.props.refs[element.ref] = this;
        this.props.refs[element.ref] =  new BinaryBlockParser(this.name,this.staticProp);
    }
}

class RootParser extends AbstractParser {
    build(element) {
        this.parseElement(element);
    }
}

class TraverseParser extends AbstractParser {
}

class BinaryDataParser extends GenericParser {

    constructor(rootElement, encoding) {
        super(rootElement, {
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
                'href': () => new SkipParser()
            },
            refs: {},
        });
        this.resultEncoding = encoding;
        this.parser.init(this.resultEncoding,this.props);
        this.parser.init(rootElement, this.props);
    }

    parseDataBlock(arrayBuffer) {
        const props = {
            time: undefined,
            offset: 0,
            littleEndian: this.resultEncoding.byteOrder === 'littleEndian'
        }
        const results = [];
        while(props.offset < arrayBuffer.byteLength) {
            const res = {};
            this.parser.parse(arrayBuffer, props, res);
            res['timestamp'] = new Date(res[this.parser.getTimePropertyName()] * 1000).getTime();
            results.push(res);
        }
        return results;
    }
}

export default BinaryDataParser;
