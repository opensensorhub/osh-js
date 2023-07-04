var AbstractDataTypeDecoder = /** @class */ (function () {
    function AbstractDataTypeDecoder(props) {
        this.props = props;
    }
    AbstractDataTypeDecoder.prototype.init = function () {
    };
    AbstractDataTypeDecoder.prototype.setData = function (data) {
        this.data = data;
        this.init();
    };
    AbstractDataTypeDecoder.prototype.checkInit = function () {
        throw Error('Unsupported Operation');
    };
    AbstractDataTypeDecoder.prototype.nextToken = function () {
        throw Error('Unsupported Operation');
    };
    AbstractDataTypeDecoder.prototype.hasNextBlock = function () {
        throw Error('Unsupported Operation');
    };
    return AbstractDataTypeDecoder;
}());
export default AbstractDataTypeDecoder;
//# sourceMappingURL=AbstractDataTypeDecoder.js.map