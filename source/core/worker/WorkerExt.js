import {randomUUID} from "../utils/Utils";

class WorkerExt {
    constructor(worker) {
        this.worker = worker;
        this.onmessage = null;

    }

    postMessage(message, transfer) {
        // console.log('post no ack');
        this.worker.postMessage(message, transfer);
    }

    postMessageWithAck(message, transfer) {
        const ackId = randomUUID();
        // console.log('post ack ' + ackId);

        return new Promise((resolve, reject) => {

            const controller = new AbortController();

            this.worker.addEventListener("message", e => {
                //console.log('resp ' + e.data.ackId);
                if (e.data.ackId === ackId) {
                    delete e.data.ackId;
                    controller.abort();
                    if(e.error) {
                        reject(e.error);
                    } else {
                        resolve(e.data);
                    }
                }

            }, {signal: controller.signal});

            message.ackId = ackId;
            this.worker.postMessage(message, transfer);

        });
    }

    set onmessage(f) {
        this.worker.onmessage = f;
    }

    terminate()  {
        if(this.worker) {
            this.worker.terminate();
        }
    }
}

export default WorkerExt;
