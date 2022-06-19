import SosGetFoisParser from "../parser/SosGetFois.parser";
import SosGetFoisDataSourceHandler from "../handler/SosGetFoisDataSourceHandler";

const dataSourceHandler = new SosGetFoisDataSourceHandler(new SosGetFoisParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


