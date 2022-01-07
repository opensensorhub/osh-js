import SweApiFetchHandler from "../handler/SweApiFetchHandler";
import SweApiFetchVideo from "../parser/SweApiFetchVideo.parser";

let  dataSourceHandler = new SweApiFetchHandler(new SweApiFetchVideo());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


