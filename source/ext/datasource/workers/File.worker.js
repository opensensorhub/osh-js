import FileParser from "../parsers/File.parser";
import DataSourceHandler from "../../../core/datasource/workers/DataSourceHandler";

const dataSourceHandler = new DataSourceHandler(new FileParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


