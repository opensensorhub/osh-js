import SosGetResultParser from '../parser/SosGetResult.parser';
import SosGetResultDataSourceHandler from "../handler/SosGetResultDataSourceHandler";

const dataSourceHandler = new SosGetResultDataSourceHandler(new SosGetResultParser(), self);

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


