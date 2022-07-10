import AbstractParser from "../AbstractParser";
import BinaryBlockDataTypeDecoder from "./dataType/BinaryBlockDataTypeDecoder";

class BlockParser extends AbstractParser {
    constructor(binaryDataTypeDecoder) {
        super();
        this.binaryDataTypeDecoder = binaryDataTypeDecoder;
    }
    build(element) {
        this.staticProps = {};
        // check for static props
        for(let prop in element) {
            if(prop !== 'ref' && prop !== 'type') {
                this.staticProps[prop] = element[prop];
            }
        }
        this.name = this.splitRefName(element.ref);
        this.path = element.ref;
        this.props.refs[element.ref] = this;
        this.binaryDataTypeDecoder.addRef(element.ref, new BinaryBlockDataTypeDecoder());
        this.binaryDataTypeDecoder.hasBlock = true;
    }

    parse(dataTypeParser, props, resultParent) {
        // everytime a binaryblock is defined in the binary encoding, there will be a 4-bytes length field before it
        const block = {
            data: dataTypeParser.nextToken(this.path)
        };

        for(let prop in this.staticProps) {
            block[prop] = this.staticProps[prop];
        }
        resultParent[this.name] = block;
    }
}
export default BlockParser;
