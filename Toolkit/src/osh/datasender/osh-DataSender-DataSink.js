/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2016 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoftware.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 */
OSH.DataSender.DataSink =  BaseClass.extend({
    initialize: function (name, properties, options) {
        if (properties.protocol == "http") {
            this.connector = new OSH.DataConnector.AjaxConnector(this.buildUrl(properties));
            this.connector.onError = this.onCatchError.bind(this);
            this.connector.onSuccess = this.onCatchSuccess.bind(this);
        }
        this.id = "DataSender-" + OSH.Utils.randomUUID();
        this.name = name;
        this.properties = properties;
    },

    /**
     * @param properties
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    sendRequest: function(properties) {
        this.connector.sendRequest(this.buildRequest(properties));
    },

    /**
     * @param properties
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    buildRequest:function(properties) {
        return "";
    },

    /**
     * @param properties
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    buildUrl: function(properties) {
        var url = "";

        // adds protocol
        url += properties.protocol + "://";

        // adds endpoint url
        url += properties.endpointUrl;

        return url;
    },

    /**
     * @param response
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    onCatchError:function(response) {
        this.onError(response);
    },

    /**
     * @param response
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    onCatchSuccess:function(response) {
        this.onSuccess(response);
    },

    /**
     * @param response
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    onError:function(response) {

    },

    /**
     * @param response
     * @instance
     * @memberof OSH.DataSender.DataSink
     */
    onSuccess:function(response) {

    },

    /**
     * The data connector default id.
     * @returns {string|*}
     * @memberof OSH.DataConnector.DataSink
     * @instance
     */
    getId: function() {
        return this.id;
    },

    /**
     * The name.
     * @returns {string}
     * @memberof OSH.DataConnector.DataSink
     * @instance
     */
    getName: function() {
        return this.name;
    }
});