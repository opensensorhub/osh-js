class AbstractDataTypeDecoder {
    constructor(props) {
        this.props = props;
    }

    init() {
    }

    setData(data) {
        this.data = data;
        this.init();
    }
    checkInit() {
        throw Error('Unsupported Operation');
    }
    nextToken() {
        throw Error('Unsupported Operation');
    }

    hasNextBlock() {
        throw Error('Unsupported Operation');
    }
}
export default AbstractDataTypeDecoder;
