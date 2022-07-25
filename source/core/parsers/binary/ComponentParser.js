import AbstractParser from "../AbstractParser";
import BinaryDoubleDataTypeDecoder from "./dataType/BinaryDoubleDataTypeDecoder";
import BinaryIntegerDataTypeDecoder from "./dataType/BinaryIntegerDataTypeDecoder";
import BinaryShortDataTypeDecoder from "./dataType/BinaryShortDataTypeDecoder";
import BinaryFloat32DataTypeDecoder from "./dataType/BinaryFloat32DataTypeDecoder";

class ComponentParser extends AbstractParser {
    constructor(binaryDataTypeDecoder) {
        super();
        this.refs = {};
        this.binaryDataTypeDecoder = binaryDataTypeDecoder;
    }
    build(element) {
        this.name = this.splitRefName(element.ref);
        if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/double') {
            this.refs[element.ref] = new BinaryDoubleDataTypeDecoder();
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/signedInt'){
            this.refs[element.ref] = new BinaryIntegerDataTypeDecoder();
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/signedShort') {
            this.refs[element.ref] = new BinaryShortDataTypeDecoder();
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/float32') {
            this.refs[element.ref] = new BinaryFloat32DataTypeDecoder();
        }
        if(element.ref in this.refs) {
            this.binaryDataTypeDecoder.addRef(element.ref, this.refs[element.ref]);
        }
    }
}
export default ComponentParser;
