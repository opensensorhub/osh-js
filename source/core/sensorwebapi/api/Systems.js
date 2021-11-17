import System from './System';
import SensorWebApi from "./SensorWebApi";
import Collection from "./Collection";
import SensorWebApiFetchSystemParser from "../../datasource/parsers/SensorWebApiFetchSystem.parser";
import SystemFilter from "./SystemFilter";

class Systems extends SensorWebApi {
    /**
     *
     */
    constructor(networkProperties) {
        super(networkProperties);
        this.parser = new SensorWebApiFetchSystemParser(networkProperties);
    }

    /**
     *
     * @returns {System[]} the SensorML as JSON
     */
    async getSystems(systemFilter = new SystemFilter(), pageSize) {
        const connector = this.createConnector('/systems');
        const collection = new Collection('/systems', systemFilter.toQueryString(), pageSize,this.parser, connector);
        return collection;
    }

    /**
     *
     * @param {SystemFilter} systemFilter - the system filter
     * @param {number} pageSize - the page size
     * @returns {Promise<Collection<Systems>>} A promise of collection of systems
     */
    searchSubsystems(systemFilter, pageSize) {}

}
export default Systems;
