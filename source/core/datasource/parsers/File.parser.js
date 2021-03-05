import DataSourceParser from "./DataSourceParser";
import {assertArray} from "../../utils/Utils";
import {registerLoaders, selectLoader} from '@loaders.gl/core';
import {CSVLoader} from '@loaders.gl/csv';
import {ShapefileLoader} from '@loaders.gl/shapefile';
import {KMLLoader} from '@loaders.gl/kml';
import {JSONLoader} from '@loaders.gl/json';
import {WKTLoader} from '@loaders.gl/wkt';
import {parse} from '@loaders.gl/core';

class FileParser extends DataSourceParser {

    constructor( properties) {
        super();
        this.properties = properties;
        registerLoaders([ShapefileLoader, KMLLoader, JSONLoader, CSVLoader, WKTLoader]);
    }
    /**
     * Does not return the time since it is generic File parser
     * @param {String} data - the data to parse
     * @return {Number} the extracted timestamp
     */
    parseTimeStamp(data) {
        return 0;
    }

    /**
     * Return the data read by the file protocol
     * @param {Object} data - the data to parse
     * @return {Object} the parsed data
     */
    async parseData(data) {
        return parse(data);
    }

    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.protocol the protocol protocol
     * @param {String} properties.paths the file paths
     * @return {String} the full url or array of urls
     */
    buildUrl(properties) {
        assertArray(properties.paths);
        return properties.paths;
    }

}

export default FileParser;
