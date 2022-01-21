import FileParser from "../parsers/File.parser";
import FileDataSourceHandler from "../handler/FileDataSourceHandler";

const dataSourceHandler = new FileDataSourceHandler(new FileParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


