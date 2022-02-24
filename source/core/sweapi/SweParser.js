class SweParser {

    parseData(data) {
        return (data instanceof ArrayBuffer) ? JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data))) : data;
    }
}
export default SweParser;
