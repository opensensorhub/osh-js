import SweApiFetchBinaryVideo from "../parser/binary/SweApiFetchBinaryVideo.parser";
import SweApiFetchHandler from "../handler/SweApiFetchHandler";

let  dataSourceHandler = new SweApiFetchHandler(new SweApiFetchBinaryVideo());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


