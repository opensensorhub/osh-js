class System {
    /**
     *
     */
    constructor() {}

    /**
     *
     * @returns {String} the SensorML as JSON
     */
    getDetails() {}


    /**
     *
     * @param {SystemFilter} systemFilter - the system filter
     * @param {number} pageSize - the page size
     * @returns {Promise<Collection<System>>} A promise of collection of systems
     */
    searchSubsystems(systemFilter, pageSize) {}

}
export default System;
