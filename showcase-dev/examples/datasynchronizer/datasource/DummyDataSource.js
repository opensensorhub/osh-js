import DataSource from 'osh-js/core/datasource/DataSource.js';
import DummyDataSourceWorker from './DummyDataSource.worker.js';

class DummyDataSource extends DataSource {
    constructor(name, properties) {
        super(name, {
            reconnectTimeout: 1000 * 5, // default if not defined into properties
            ...properties
        }, new DummyDataSourceWorker());
    }
}

export default DummyDataSource;
