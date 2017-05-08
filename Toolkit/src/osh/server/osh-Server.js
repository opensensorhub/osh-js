/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Richard Becker. All Rights Reserved.

 Author: Richard Becker <beckerr@prominentedge.com>

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
        this.sos = (typeof properties.sos !== undefined) ?  this.properties.sos : 'sos';
        this.sps = (typeof properties.sps !== undefined) ?  this.properties.sps : 'sps';
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

    /**
     *
     * @param request
     * @param successCallback
     * @param errorCallback
     */
    executeGetRequest: function (request, successCallback, errorCallback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var s = successCallback.bind(this);
                var sweXmlParser = new OSH.SWEXmlParser(xhr.responseText);
                s(sweXmlParser.toJson());
            } else {
                errorCallback(xhr.responseText);
            }
        }.bind(this);
        xhr.open('GET', request, true);
        xhr.send();
    }
});
