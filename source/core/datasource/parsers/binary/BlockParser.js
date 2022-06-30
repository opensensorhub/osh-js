import AbstractParser from "../AbstractParser";
import BinaryBlockParser from "./BinaryBlockParser";

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
export default BlockParser;
