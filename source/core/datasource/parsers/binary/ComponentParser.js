import AbstractParser from "../AbstractParser";
import BinaryDoubleDataTypeDecoder from "./BinaryDoubleDataTypeDecoder";
import BinaryIntegerDataTypeDecoder from "./BinaryIntegerDataTypeDecoder";
import BinaryShortDataTypeDecoder from "./BinaryShortDataTypeDecoder";
import BinaryFloat32DataTypeDecoder from "./BinaryFloat32DataTypeDecoder";

class ComponentParser extends AbstractParser {
    constructor(binaryDataTypeDecoder) {
        super();
        this.binaryDataTypeDecoder = binaryDataTypeDecoder;
    }
    build(element) {
        this.name = this.splitRefName(element.ref);
        if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/double') {
            this.binaryDataTypeDecoder.addRef(element.ref, new BinaryDoubleDataTypeDecoder());
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/signedInt'){
            this.binaryDataTypeDecoder.addRef(element.ref, new BinaryIntegerDataTypeDecoder());
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/signedShort') {
            this.binaryDataTypeDecoder.addRef(element.ref, new BinaryShortDataTypeDecoder());
        } else if(element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/float32') {
            this.binaryDataTypeDecoder.addRef(element.ref, new BinaryFloat32DataTypeDecoder());
        }
    }
}
export default ComponentParser;
