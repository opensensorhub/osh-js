import AbstractParser from "../AbstractParser";

class MemberParser extends AbstractParser {
    build(element) {
        this.parseElement(element);
    }
}
export default MemberParser;
