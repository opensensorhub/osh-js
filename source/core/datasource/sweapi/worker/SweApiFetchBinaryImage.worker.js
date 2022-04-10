import SweApiFetchBinaryImage from "../parser/binary/SweApiFetchBinaryImage.parser";
import SweApiFetchHandler from "../handler/SweApiFetchHandler";

let  dataSourceHandler = new SweApiFetchHandler(new SweApiFetchBinaryImage());

self.onmessage = (event) => {

    console.log("handling message");
    dataSourceHandler.handleMessage(event.data, self);
};


