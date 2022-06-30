import AbstractParser from "../AbstractParser";

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
export default BinaryBlockParser;
