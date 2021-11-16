import SystemFilter from "./SystemFilter";
import SensorWebApi from "./SensorWebApi";
import {isDefined} from "../../utils/Utils";

class System extends SensorWebApi {
    /**
     * @param {string} id - id of the System
     * @param {string} type - type of the System
     * @param {string} [geometry=undefined] - GeoJson geometry of the System
     * @param {number[]} [bbox=undefined] - bounding box of the the System
     * @param {number} [numMembers=undefined] - bounding box of the the System
     * @param {Object} properties - object properties
     * @param {string} [properties.definition=undefined] - definition of the System
     * @param {string} [properties.uid=undefined] - uid of the System
     * @param {string} properties.name - name of the System
     * @param {string} properties.description - description of the System
     * @param {string} properties.validTime - validTime - ISO 8601 time range to filter resources on their validity time.
     When this parameter is omitted, the implicit value is "now", except for "history" collections where the absence of this parameter means no filtering is applied.
     */
    constructor(id, type,properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        this.id = id;
        this.type = type;
    }

    /**
     * @param {SystemFilter} systemFilter - the system filter
     * @return Promise<JSON> - SensorlML Description
     */
    getDetails(systemFilter) {
        let query = `/systems/${this.id}/details`;
        if(isDefined(systemFilter)) {
            let separator = '?';
            if(isDefined(systemFilter.props.select)) {
                query += `${separator}select=${systemFilter.props.select}`;
                separator = '&';
            }
            if(isDefined(systemFilter.props.format)) {
                query += `${separator}format=${systemFilter.props.format}`;
            }
        }
        return this.createConnector(query).doRequest(this.queryString);
    }

    /**
     *
     * @param SystemFilter
     * @param pageSize
     * @return Promise<Collection<System>>
     */
  searchSubsystems(SystemFilter, pageSize){}

}

export default System;
