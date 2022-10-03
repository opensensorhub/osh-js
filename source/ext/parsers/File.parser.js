import {registerLoaders, selectLoader} from '@loaders.gl/core';
import {CSVLoader} from '@loaders.gl/csv';
import {ShapefileLoader} from '@loaders.gl/shapefile';
import {KMLLoader} from '@loaders.gl/kml';
import {JSONLoader} from '@loaders.gl/json';
import {WKTLoader} from '@loaders.gl/wkt';
import {parse} from '@loaders.gl/core';

class FileParser {

    constructor( properties) {
        registerLoaders([ShapefileLoader, KMLLoader, JSONLoader, CSVLoader, WKTLoader]);
    }

    init(properties) {
        this.properties = properties;
    }
    /**
     * Return the data read by the file protocol
     * @param {Object} data - the data to parse
     * @return {Object} the parsed data
     */
    async parseDataBlock(data) {
        return parse(data);
    }
}

export default FileParser;
