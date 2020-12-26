import DataConnector from "./DataConnector";
import {Status} from "./Status";

class FileConnector extends DataConnector {
    /**
     * @param (string[]) paths - list of file paths
     */
    constructor(paths) {
        super(paths);
        this.opened = false;
    }

    /**
     * Start reading file content
     */
    async connect() {
        if(!this.opened) {
            this.opened = true;
            this.onChangeStatus(Status.CONNECTED);
            const urls = this.getUrl();
            for(let url of urls) {
                this.onMessage(await fetch(url));
            }
            this.onChangeStatus(Status.DISCONNECTED);
            // read is done
            this.opened = false;
        }
    }

    isConnected() {
        return this.opened;
    }
}

export default FileConnector;
