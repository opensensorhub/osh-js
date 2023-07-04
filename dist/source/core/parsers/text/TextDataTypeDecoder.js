import AbstractDataTypeDecoder from "../AbstractDataTypeDecoder";

class TextDataTypeDecoder extends AbstractDataTypeDecoder {
    constructor(props) {
        super({
            blockSeparator: ' ',
            collapseWhiteSpaces: true,
            decimalSeparator: '.',
            tokenSeparator: ',',
            ...props
        });
        this.init();
    }
    init() {
        this.blocks = [];
        this.blocksIdx = -1;
        this.tokens = [];
        this.tokensIdx = 0;
    }
    checkInit() {
        if(this.blocksIdx === -1) {
            // split
            this.blocks = this.data.split(this.props.blockSeparator);
            this.blocksIdx = 0;
        }
    }
    nextToken() {
        this.checkInit();
        // if no more token in current block
        if(this.tokensIdx >= this.tokens.length) {
            // if no more block
            if(this.blocks.length === 0 || this.blocksIdx >= this.blocks.length) {
                return null;
            }
            // parse new token
            this.tokens = this.blocks[this.blocksIdx++].split(this.props.tokenSeparator);
            this.tokensIdx = 0;
        }
        return this.tokens[this.tokensIdx++];
    }

    hasNextBlock() {
        this.checkInit();
        return this.blocks.length > 0 && this.blocksIdx < this.blocks.length && this.blocks[this.blocksIdx] !== '';
    }
}
export default TextDataTypeDecoder;
