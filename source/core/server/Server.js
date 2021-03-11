/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Richard Becker. All Rights Reserved.

 Author: Richard Becker <beckerr@prominentedge.com>
 Alex Robin, SensiaSoft

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @example
 * import Server from 'core/server/Server.js';
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
import Worker from './GetRequest.worker.js';

class Server {
    /**
     * @param {Object} properties -
     * @param {String} properties.url -
     * @param {String} properties.baseUrl -
     * @param {String} [properties.sos="sos"] -
     * @param {String} [properties.sps="sps"] -
     */
    constructor(properties) {
        this.url = properties.url;
        this.sos = (isDefined(properties.sos)) ? properties.sos : 'sos';
        this.sps = (isDefined(properties.sps)) ? properties.sps : 'sps';
        this.baseUrl = properties.baseUrl;
        this.id = "Server-" + randomUUID();
    }

    /**
     * Gets the server Capabilities.
     * @param {Function} successCallback - async method called when the response succeeded
     * @param {Function} errorCallback - async method called when an error occured
     */
    getCapabilities(successCallback, errorCallback) {
        let request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetCapabilities';
        this.executeGetRequest(request, successCallback, errorCallback);
    }

    /**
     * Gets the server Feature of interest.
     * @param {Function} successCallback - async method called when the response succeeded
     * @param {Function} errorCallback - async method called when an error occurred
     */
    getFeatureOfInterest(successCallback, errorCallback) {
        let request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetFeatureOfInterest';
        this.executeGetRequest(request, successCallback, errorCallback);
    }

    /**
     * Gets the server Feature of interest given a procedure id.
     * @param {String} procedure - The procedure id
     * @param {Function} successCallback - async method called when the response succeeded
     * @param {Function} errorCallback - async method called when an error occurred
     */
    getFeatureOfInterestById(procedure, successCallback, errorCallback) {
        let request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetFeatureOfInterest&procedure=' + procedure;
        this.executeGetRequest(request, successCallback, errorCallback);
    }

    /**
     * Gets the server result template.
     * @param {String} offering - The corresponding offering
     * @param {String} observedProperty - The corresponding observed property
     * @param {Function} successCallback - async method called when the response succeeded
     * @param {Function} errorCallback - async method called when an error occurred
     */
    getResultTemplate(offering, observedProperty, successCallback, errorCallback) {
        let request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetResultTemplate&offering=' + offering + "&observedProperty=" + observedProperty;
        this.executeGetRequest(request, successCallback, errorCallback);
    }

    /**
     * Gets the server Feature of interest given a procedure id.
     * @param {String} procedure - The procedure id
     * @param {Function} successCallback - async method called when the response succeeded
     * @param {Function} errorCallback - async method called when an error occurred
     */
    async getDescribeSensor(procedure, successCallback, errorCallback) {
        let request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=DescribeSensor&procedure=' + procedure ;
        return new Promise(resolve => {
            this.executeGetRequest(request, resolve, errorCallback);
        });
    }

    async getDescribeSensorAsJson(procedure, errorCallback) {
        let request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=DescribeSensor&procedure='
            + procedure + '&procedureDescriptionFormat=http://www.opengis.net/sensorml-json/2.0';
        return new Promise(resolve => {
            this.executeGetRequest(request, resolve, errorCallback, true);
        });
    }

    /**
     * @private
     * @param request
     * @param successCallback
     * @param errorCallback
     */
    executeGetRequest(request, successCallback, errorCallback, fromJson = false) {
        if (isWebWorker()) { // run in web worker if possible
            this.executeGetRequestWebWorker(request, successCallback, errorCallback,fromJson);
        } else {
            let xhr = new XMLHttpRequest();
            let that = this;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let s = successCallback.bind(that);
                        if(fromJson) {
                            s(JSON.parse(xhr.responseText));
                        } else {
                            let sweXmlParser = new SWEXmlStreamParser(xhr.responseText);
                            s(sweXmlParser.toJson());
                        }
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

    /**
     * @private
     * @param request
     * @param successCallback
     * @param errorCallback
     */
    executeGetRequestWebWorker(request, successCallback, errorCallback, fromJson = false) {
        // create worker source code blob if not created yet
        let worker = new Worker();
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
        worker.postMessage({
            request: request,
            json: fromJson
        });
    }
}

export default Server;
1
