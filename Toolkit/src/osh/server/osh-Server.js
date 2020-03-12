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
 * var oshServer = new OSH.Server({
 *    url : <someUrl>,
 *    sosService: 'sos',
 *    spsService: 'sps',
 *    baseUrl: 'sensorhub'
 * });
 */
OSH.Server = BaseClass.extend({
    initialize: function (properties) {
        this.url = properties.url;
        this.sos = (typeof properties.sos !== undefined) ?  properties.sos : 'sos';
        this.sps = (typeof properties.sps !== undefined) ?  properties.sps : 'sps';
        this.baseUrl = properties.baseUrl;
        this.id = "Server-" + OSH.Utils.randomUUID();
    },

    /**
     *
     * @param successCallback
     * @param errorCallback
     * @instance
     * @memberof OSH.Server
     */
    getCapabilities: function (successCallback, errorCallback) {
        var request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetCapabilities';
        this.executeGetRequest(request, successCallback, errorCallback);
    },

    /**
     *
     * @param successCallback callback the corresponding JSON object
     * @param errorCallback callback the corresponding error
     * @instance
     * @memberof OSH.Server
     */
    getFeatureOfInterest: function (successCallback, errorCallback) {
        var request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetFeatureOfInterest';
        this.executeGetRequest(request, successCallback, errorCallback);
    },

    /**
     * @param procId ID of procedure from which to retrieve features of interest
     * @param successCallback callback the corresponding JSON object
     * @param errorCallback callback the corresponding error
     * @instance
     * @memberof OSH.Server
     */
    getFeatureOfInterest: function (procId, successCallback, errorCallback) {
        var request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetFeatureOfInterest&procedure=' + procId;
        this.executeGetRequest(request, successCallback, errorCallback);
    },

    /**
     *
     * @param successCallback callback the corresponding JSON object
     * @param errorCallback callback the corresponding error
     * @param offering the corresponding offering
     * @instance
     * @memberof OSH.Server
     */
    getResultTemplate: function (offering, observedProperty,successCallback, errorCallback) {
        var request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=GetResultTemplate&offering=' + offering + "&observedProperty=" + observedProperty;
        this.executeGetRequest(request, successCallback, errorCallback);
    },

    getDescribeSensor:function(procedure, successCallback, errorCallback) {
        var request = this.url + '/' + this.baseUrl + '/' + this.sos + '?service=SOS&version=2.0&request=DescribeSensor&procedure=' + procedure;
        this.executeGetRequest(request, successCallback, errorCallback);
    },

    /**
     *
     * @param request
     * @param successCallback
     * @param errorCallback
     */
    executeGetRequest: function (request, successCallback, errorCallback) {
        if (OSH.Utils.isWebWorker()) { // run in web worker if possible
            this.executeGetRequestWebWorker(request, successCallback, errorCallback);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var s = successCallback.bind(this);
                        var sweXmlParser = new OSH.SWEXmlStreamParser(xhr.responseText);
                        s(sweXmlParser.toJson());
                    } else {
                        errorCallback(xhr.responseText);
                    }
                }
            }.bind(this);
            xhr.withCredentials = true;
            xhr.open('GET', request, true);
            xhr.send();
        }
    },

    executeGetRequestWebWorker: function (request, successCallback, errorCallback) {
        // create worker source code blob if not created yet
        if (!OSH.Utils.isDefined(OSH.Server.executeGetRequestWorkerBlob)) {
            OSH.Server.executeGetRequestWorkerBlob = URL.createObjectURL(new Blob([
                'var OSH = function() {};\n',
                //'self.importScripts("' + window.OSH.BASE_WORKER_URL + '/osh-SWEXmlStreamParser.js");',
                '(' + OSH.SWEXmlStreamParserCreator.toString() + ')();\n',
                'self.onmessage=',
                function (e) {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                var sweXmlParser = new OSH.SWEXmlStreamParser(xhr.responseText);
                                var respObj = sweXmlParser.toJson();
                                self.postMessage(respObj);
                            } else {
                                self.postMessage({error:true, msg:xhr.responseText});
                            }
                        }
                    }.bind(this);
                    xhr.withCredentials = true;
                    xhr.open('GET', e.data, true);
                    xhr.send();
                }.toString()],
            {type: 'application/javascript'}));
        }

        var worker = new Worker(OSH.Server.executeGetRequestWorkerBlob);
        
        worker.onerror = function (e) {
            worker.terminate();
            errorCallback("Internal error in worker: " + e.message);
        }

        worker.onmessage = function (e) {
            worker.terminate();
            if (OSH.Utils.isDefined(e.data.error)) {
                errorCallback(e.data.msg);
            } else {
                successCallback(e.data);
            }            
        }

        worker.postMessage(request);
    }
});
