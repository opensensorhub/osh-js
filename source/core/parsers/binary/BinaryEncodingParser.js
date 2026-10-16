import AbstractParser from "../AbstractParser";

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
export default BinaryEncodingParser;
