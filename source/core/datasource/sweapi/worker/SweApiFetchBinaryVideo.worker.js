import SweApiFetchBinaryVideoParser from "../parser/binary/SweApiFetchBinaryVideo.parser";
import SweApiFetchHandler from "../handler/SweApiFetchHandler";

let  dataSourceHandler = new SweApiFetchHandler(new SweApiFetchBinaryVideoParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


