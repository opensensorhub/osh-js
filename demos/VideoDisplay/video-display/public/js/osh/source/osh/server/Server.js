/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Richard Becker. All Rights Reserved.

 Author: Richard Becker <beckerr@prominentedge.com>
 Alex Robin, SensiaSoft

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @class
 * @classdesc
 * @example
 *
 * let oshServer = new Server({
 *    url : <someUrl>,
 *    sosService: 'sos',
 *    spsService: 'sps',
 *    baseUrl: 'sensorhub'
 * });
 */
import {isDefined, randomUUID, isWebWorker} from "../utils/Utils.js";
import SWEXmlStreamParser from "../parsers/SWEXmlStreamParser.js";

export default class Server {
    constructor(properties) {
        this.url = properties.url;
        this.sos = (isDefined(properties.sos)) ? properties.sos : 'sos';
        this.sps = (isDefined(properties.sps)) ? properties.sps : 'sps';
        this.baseUrl = properties.baseUrl;
        this.id = "Server-" + randomUUID();
        this.executeGetRequestWorkerBlob = 'undefined';
    }

    /**
     *
     * @param successCallback
     * @param errorCallback
     * @instance
     * @memberof Server
     */
    getCapabilities(successCallback, errorCallback) {
        let request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetCapabilities';
        this.executeGetRequest(request, successCallback, errorCallback);
    }

    /**
     *
     * @param successCallback callback the corresponding JSON object
     * @param errorCallback callback the corresponding error
     * @instance
     * @memberof Server
     */
    getFeatureOfInterest(successCallback, errorCallback) {
        let request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetFeatureOfInterest';
        this.executeGetRequest(request, successCallback, errorCallback);
    }

    /**
     * @param procId ID of procedure from which to retrieve features of interest
     * @param successCallback callback the corresponding JSON object
     * @param errorCallback callback the corresponding error
     * @instance
     * @memberof Server
     */
    getFeatureOfInterestById(procId, successCallback, errorCallback) {
        let request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetFeatureOfInterest&procedure=' + procId;
        this.executeGetRequest(request, successCallback, errorCallback);
    }

    /**
     *
     * @param successCallback callback the corresponding JSON object
     * @param errorCallback callback the corresponding error
     * @param offering the corresponding offering
     * @instance
     * @memberof Server
     */
    getResultTemplate(offering, observedProperty, successCallback, errorCallback) {
        let request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetResultTemplate&offering=' + offering + "&observedProperty=" + observedProperty;
        this.executeGetRequest(request, successCallback, errorCallback);
    }

    getDescribeSensor(procedure, successCallback, errorCallback) {
        let request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=DescribeSensor&procedure=' + procedure;
        this.executeGetRequest(request, successCallback, errorCallback);
    }

    /**
     *
     * @param request
     * @param successCallback
     * @param errorCallback
     */
    executeGetRequest(request, successCallback, errorCallback) {
        if (isWebWorker()) { // run in web worker if possible
            this.executeGetRequestWebWorker(request, successCallback, errorCallback);
        } else {
            let xhr = new XMLHttpRequest();
            let that = this;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let s = successCallback.bind(that);
                        let sweXmlParser = new SWEXmlStreamParser(xhr.responseText);
                        s(sweXmlParser.toJson());
                    } else {
                        errorCallback(xhr.responseText);
                    }
                }
            };
            xhr.withCredentials = true;
            xhr.open('GET', request, true);
            xhr.send();
        }
    }

    executeGetRequestWebWorker(request, successCallback, errorCallback) {
        // create worker source code blob if not created yet
        let worker = new Worker('./GetRequestWorker.js', { type: 'module' });
        worker.onerror = (e) => {
            worker.terminate();
            errorCallback("Internal error in worker: " + e.message);
        };

        worker.onmessage = (e) => {
            worker.terminate();
            if (isDefined(e.data.error)) {
                errorCallback(e.data.msg);
            } else {
                successCallback(e.data);
            }
        };
        worker.postMessage(request);
    }
}