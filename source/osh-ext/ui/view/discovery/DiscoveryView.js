/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import Server from "../../../../osh/server/Server.js";
import {isDefined, randomUUID, removeLastCharIfExist} from "../../../../osh/utils/Utils.js";
import PointMarker from "../../../../osh/ui/layer/PointMarker.js";
import Video from "../../../../osh/datareceiver/Video.js";
import Curve from "../../../../osh/ui/layer/Curve.js";
import View from "../../../../osh/ui/view/View.js";
import DataSynchronizer from "../../../../osh/datasynchronizer/DataSynchronizer.js";
import "../../../resources/css/discovery.css";
import SweJson from "../../../../osh/datareceiver/SweJson.js";

/**
 * Class representing a Discovery View. The discovery view is a helper class to
 * select dynamically an offering provided by a server.
 * @extends View
 * @example

 import DiscoveryView from 'osh-ext/ui/view/DiscoveryView.js';

 let discoveryView = new DiscoveryView("discovery-container",{
    callback: onSubmit,
    css: "discovery-style",
    services: ["http://sensiasoft.net:8181"],
    views: [{
        name: 'Video',
        type : DiscoveryType.VIDEO_H264
    },{
        name: 'Video',
        type : DiscoveryType.VIDEO_MJPEG
    },{
        name: 'Chart',
        type : DiscoveryType.CHART
    },{
        name: 'Gps',
        type : DiscoveryType.MARKER_GPS
    }]
});
*/
class DiscoveryView extends View {
    /**
     * Create the discoveryView
     * @param {string} parentElementDivId The div element to attach to
     * @param {Object} properties - The properties defining the view
     * @param {Object} properties.dataReceiverController - An optional data receiver controller
     * @param {string} properties.swapId - The div to switch element with
     * @param {Function} properties.callback - The callback called when the submit button is pressed
     * @param {Object[]} properties.views - The supported view types
     * @param {string[]} properties.services - The supported remote or local services to explore
     * @param {string} properties.css - The CSS class
     * @param {Object[]} properties.entities - The entities to attach the new selected element
     */
    constructor(parentElementDivId, properties) {
        super(parentElementDivId, [], properties);

        this.swapId = "";
        if (isDefined(properties)) {
            if (isDefined(properties.dataReceiverController)) {
                this.dataReceiverController = properties.dataReceiverController;
            } else {
                this.dataReceiverController = new DataSynchronizer({
                    replaySpeed: 1
                });
                this.dataReceiverController.connect();
            }

            if (isDefined(properties.swapId)) {
                this.swapId = properties.swapId;
            }

            if (isDefined(properties.callback)) {
                this.onAdd = properties.callback;
            }
        }

        this.formTagId = "form-" + randomUUID();
        this.serviceSelectTagId = "service-" + randomUUID();
        this.offeringSelectTagId = "offering-" + randomUUID();
        this.observablePropertyTagId = "obsProperty-" + randomUUID();
        this.startTimeTagId = "startTime-" + randomUUID();
        this.endTimeTagId = "endTime-" + randomUUID();
        this.typeSelectTagId = "type-" + randomUUID();
        this.formButtonId = "submit-" + randomUUID();
        this.entitiesSelectTagId = "entities-" + randomUUID();
        this.viewSelectTagId = "dialogSelect-" + randomUUID();

        // add template
        let discoveryForm = document.createElement("form");
        discoveryForm.setAttribute("action", "#");
        discoveryForm.setAttribute("id", this.formTagId);
        discoveryForm.setAttribute("class", 'discovery-form');

        document.getElementById(this.divId).appendChild(discoveryForm);

        let strlet = "";
        strlet += "<ul>";
        strlet += "            <li>";
        strlet += "                <h2>Discovery<\/h2>";
        strlet += "                <span class=\"required_notification\">* Denotes Required Field<\/span>";
        strlet += "            <\/li>";
        strlet += "            <li>";
        strlet += "                <label>Service:<\/label>";
        strlet += "                <div class=\"select-style\">";
        strlet += "                     <select id=\"" + this.serviceSelectTagId + "\" required pattern=\"^(?!Select a service$).*\">";
        strlet += "                         <option value=\"\" disabled selected>Select a service<\/option>";
        strlet += "                     <\/select>";
        strlet += "                <\/div>";
        strlet += "            <\/li>";
        strlet += "            <li>";
        strlet += "                <label>Offering:<\/label>";
        strlet += "                <div class=\"select-style\">";
        strlet += "                    <select id=\"" + this.offeringSelectTagId + "\" required>";
        strlet += "                        <option value=\"\" disabled selected>Select an offering<\/option>";
        strlet += "                    <\/select>";
        strlet += "                <\/div>";
        strlet += "            <\/li>";
        strlet += "            <li>";
        strlet += "                <label>Observable Property:<\/label>";
        strlet += "                <div class=\"select-style\">";
        strlet += "                     <select id=\"" + this.observablePropertyTagId + "\" required>";
        strlet += "                         <option value=\"\" disabled selected>Select a property<\/option>";
        strlet += "                     <\/select>";
        strlet += "                <\/div>";
        strlet += "            <\/li>";
        strlet += "            <li>";
        strlet += "                <label for=\"startTime\">Start time:<\/label>";
        //strlet += "                <input type=\"text\" name=\"startTime\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\" required pattern=\"\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)\" />";
        strlet += "                <input id=\"" + this.startTimeTagId + "\" type=\"text\" name=\"startTime\" class=\"input-text\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\" required/>";
        strlet += "                <span class=\"form_hint\">YYYY-MM-DDTHH:mm:ssZ<\/span>";
        strlet += "            <\/li>";
        strlet += "            <li>";
        strlet += "                <label for=\"endTime\">End time:<\/label>";
        //strlet += "                <input type=\"text\" name=\"endTime\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\"  required pattern=\"\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)\" />";
        strlet += "                <input id=\"" + this.endTimeTagId + "\" type=\"text\" name=\"endTime\" class=\"input-text\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\"  required/>";
        strlet += "                <span class=\"form_hint\">YYYY-MM-DDTHH:mm:ssZ<\/span>";
        strlet += "            <\/li>";
        strlet += "            <li>";
        strlet += "                <label>Type:<\/label>";
        strlet += "                <div class=\"select-style\">";
        strlet += "                    <select id=\"" + this.typeSelectTagId + "\" required>";
        strlet += "                        <option value=\"\" disabled selected>Select a type<\/option>";
        strlet += "                    <\/select>";
        strlet += "                <\/div>";
        strlet += "            <\/li>";
        strlet += "            <li>";
        strlet += "                <label>Entities:<\/label>";
        strlet += "                <div class=\"select-style\">";
        strlet += "                    <select id=\"" + this.entitiesSelectTagId + "\">";
        strlet += "                        <option value=\"\" selected>None<\/option>";
        strlet += "                    <\/select>";
        strlet += "                <\/div>";
        strlet += "            <\/li>";
        strlet += "            <li>";
        strlet += "                <button id=\"" + this.formButtonId + "\" class=\"submit\" type=\"submit\">Add<\/button>";
        strlet += "            <\/li>";
        strlet += "        <\/ul>";

        discoveryForm.innerHTML = strlet;

        // fill service from urls
        if (isDefined(properties)) {
            // add services
            if (isDefined(properties.services)) {
                this.addValuesToSelect(this.serviceSelectTagId, properties.services);
            }

            // add entities
            if (isDefined(properties.entities)) {
                this.addObjectsToSelect(this.entitiesSelectTagId, properties.entities);
            }

            // add views
            if (isDefined(properties.views)) {
                this.views = properties.views;
            } else {
                this.views = [];
            }
        }

        // fill type
        for (let type in DiscoveryType) {
            this.addValueToSelect(this.typeSelectTagId, DiscoveryType[type]);
        }

        // add listeners
        document.getElementById(this.serviceSelectTagId).onchange = this.onSelectedService.bind(this);
        document.getElementById(this.offeringSelectTagId).onchange = this.onSelectedOffering.bind(this);
        document.getElementById(this.typeSelectTagId).onchange = this.onSelectedType.bind(this);
        document.getElementById(this.formTagId).onsubmit = this.onFormSubmit.bind(this);
    }

    /**
     *
     * @param event
     * @private
     */
    onSelectedService(event) {
        let serverTag = document.getElementById(this.serviceSelectTagId);
        let option = serverTag.options[serverTag.selectedIndex];

        // connect to server and get the list of offering
        //let oshServer = new OSH.Server(option.value);

        this.removeAllFromSelect(this.offeringSelectTagId);
        /* let onSuccessGetCapabilities = function(event) {
             this.sensors = oshServer.sensors;
             // remove existing
             let startTimeInputTag = document.getElementById(this.startTimeTagId);
             let endTimeInputTag = document.getElementById(this.endTimeTagId);

             // add the new ones
             for(let i = 0;i < this.sensors.length;i++) {
                 this.addValueToSelect(this.offeringSelectTagId,this.sensors[i].name,this.sensors[i],this.sensors[i]);
             }
         }.bind(this);

         let onErrorGetCapabilities = function(event) {
         };

         oshServer.getCapabilities(onSuccessGetCapabilities,onErrorGetCapabilities);*/

        //option.value
        this.oshServer = new Server({
            sos: 'sos', // TODO: allow to customize that value
            sps: 'sps', // TODO: allow to customize that value
            url: removeLastCharIfExist(option.value, "/"),
            baseUrl: 'sensorhub' // TODO: allow to customize that value
        });

        let onSuccessGetCapabilities = function (jsonObj) {
            let startTimeInputTag = document.getElementById(this.startTimeTagId);
            let endTimeInputTag = document.getElementById(this.endTimeTagId);

            let offering = null;

            for (let i = 0; i < jsonObj.Capabilities.contents.offering.length; i++) {
                offering = jsonObj.Capabilities.contents.offering[i];
                this.addValueToSelect(this.offeringSelectTagId, offering.name, offering);
            }
        }.bind(this);

        let onErrorGetCapabilities = function (event) {
        };

        this.oshServer.getCapabilities(onSuccessGetCapabilities, onErrorGetCapabilities);
    }

    /**
     *
     * @param event
     * @private
     */
    onSelectedOffering(event) {
        let e = document.getElementById(this.offeringSelectTagId);
        let option = e.options[e.selectedIndex];
        let offering = option.parent;
        this.removeAllFromSelect(this.observablePropertyTagId);

        let startTimeInputTag = document.getElementById(this.startTimeTagId);
        let endTimeInputTag = document.getElementById(this.endTimeTagId);

        // set times
        startTimeInputTag.value = offering.phenomenonTime.beginPosition;

        if (isDefined(offering.phenomenonTime.endPosition.indeterminatePosition)) {
            let d = new Date();
            d.setUTCFullYear(2055);
            endTimeInputTag.value = d.toISOString();
        } else {
            endTimeInputTag.value = offering.phenomenonTime.endPosition;
        }

        // feed observable properties
        if(Array.isArray(offering.observableProperty)) {
            for (let i = 0; i < offering.observableProperty.length; i++) {
                this.addValueToSelect(this.observablePropertyTagId, offering.observableProperty[i], offering);
            }
        } else {
            this.addValueToSelect(this.observablePropertyTagId, offering.observableProperty, offering);
        }
    }

    /**
     *
     * @param event
     * @private
     */
    onSelectedType(event) {
    }

    /**
     *
     * @param event
     * @returns {boolean}
     * @private
     */
    onFormSubmit(event) {
        event.preventDefault();
        // service
        let serviceTag = document.getElementById(this.serviceSelectTagId)
        let serviceTagSelectedOption = serviceTag.options[serviceTag.selectedIndex];

        // offering
        let offeringTag = document.getElementById(this.offeringSelectTagId)
        let offeringTagSelectedOption = offeringTag.options[offeringTag.selectedIndex];

        // obs property
        let observablePropertyTag = document.getElementById(this.observablePropertyTagId);
        let observablePropertyTagSelectedOption = observablePropertyTag.options[observablePropertyTag.selectedIndex];

        // time
        let startTimeInputTag = document.getElementById(this.startTimeTagId);
        let endTimeInputTag = document.getElementById(this.endTimeTagId);

        // type & view
        let typeTag = document.getElementById(this.typeSelectTagId);
        let typeTagOption = typeTag.options[typeTag.selectedIndex];

        // entity
        let entityTag = document.getElementById(this.entitiesSelectTagId);
        let entityTagTagOption = entityTag.options[entityTag.selectedIndex];

        // get values
        let name = offeringTagSelectedOption.parent.name;
        let endPointUrl = serviceTagSelectedOption.value + "/sensorhub/sos";
        let offeringID = offeringTagSelectedOption.parent.identifier;
        let obsProp = observablePropertyTagSelectedOption.value;
        let startTime = startTimeInputTag.value;
        let endTime = endTimeInputTag.value;
        let entityId = undefined;
        if (typeof entityTagTagOption.object != "undefined") {
            entityId = entityTagTagOption.object.id;
        }

        endPointUrl = endPointUrl.replace('http://', '');

        switch (typeTagOption.value) {
            case DiscoveryType.VIDEO_MJPEG: {
                this.createMJPEGVideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime, entityId);
                break;
            }
            case DiscoveryType.VIDEO_H264: {
                this.createH264DataSource(name, endPointUrl, offeringID, obsProp, startTime, endTime,  entityId);
                break;
            }
            case DiscoveryType.MARKER_GPS: {
                this.createGPSMarkerDataSource(name, endPointUrl, offeringID, obsProp, startTime, endTime,  entityId);
                break;
            }
            case DiscoveryType.CHART: {
                this.createChartDataSource(name, endPointUrl, offeringID, obsProp, startTime, endTime, entityId);
                break;
            }
            default :
                break;
        }
        return false;
    }

    /**
     *
     * @param tagId
     * @param objectsArr
     * @private
     */
    addObjectsToSelect(tagId, objectsArr) {
        let selectTag = document.getElementById(tagId);
        for (let i = 0; i < objectsArr.length; i++) {
            let object = objectsArr[i];
            let option = document.createElement("option");
            option.text = object.name;
            option.value = object.name;
            option.object = object;
            selectTag.add(option);
        }
    }

    /**
     *
     * @param tagId
     * @param valuesArr
     * @private
     */
    addValuesToSelect(tagId, valuesArr) {
        let selectTag = document.getElementById(tagId);
        for (let i = 0; i < valuesArr.length; i++) {
            let value = valuesArr[i];
            let option = document.createElement("option");
            option.text = value;
            option.value = value;
            selectTag.add(option);
        }
    }

    /**
     *
     * @param tagId
     * @param value
     * @param parent
     * @param object
     * @private
     */
    addValueToSelect(tagId, value, parent, object) {
        let selectTag = document.getElementById(tagId);
        let option = document.createElement("option");
        option.text = value;
        option.value = value;
        option.parent = parent;

        if (typeof object != "undefined") {
            option.object = object;
        }

        if (typeof parent != "undefined") {
            option.parent = parent;
        }
        selectTag.add(option);
    }

    /**
     *
     * @param tagId
     * @private
     */
    removeAllFromSelect(tagId) {
        let i;
        let selectTag = document.getElementById(tagId);
        for (i = selectTag.options.length - 1; i > 0; i--) {
            selectTag.remove(i);
        }
    }

    /**
     *
     * @param name
     * @param endPointUrl
     * @param offeringID
     * @param obsProp
     * @param startTime
     * @param endTime
     * @param viewId
     * @param entityId
     * @private
     */
    createGPSMarkerDataSource(name, endPointUrl, offeringID, obsProp, startTime, endTime,   entityId) {
        let dataSource = new SweJson(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            bufferingTime: 1000,
            timeShift: -16000
        });

        let pointMarker = new PointMarker({
            getLocation: {
                dataSourceIds: [dataSource.id],
                handler: function (rec) {
                    return {
                        x: rec.lon,
                        y: rec.lat,
                        z: rec.alt
                    };
                }
            },
            icon: 'images/cameralook.png',
            getIcon: {
                dataSourceIds: [dataSource.getId()],
                handler: function (rec, timeStamp, options) {
                    if (options.selected) {
                        return 'images/cameralook-selected.png';
                    } else {
                        return 'images/cameralook.png';
                    }
                }
            }
        });

        this.onAdd(dataSource, DiscoveryType.MARKER_GPS,pointMarker);
    }

    /**
     *
     * @param name
     * @param endPointUrl
     * @param offeringID
     * @param obsProp
     * @param startTime
     * @param endTime
     * @param entityId
     * @private
     */
    createMJPEGVideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime,  entityId) {
        this.onAdd(new Video(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            bufferingTime: 1000
        }),DiscoveryType.VIDEO_MJPEG);
    }

    /**
     *
     * @param name
     * @param endPointUrl
     * @param offeringID
     * @param obsProp
     * @param startTime
     * @param endTime
     * @param entityId
     * @private
     */
    createH264DataSource(name, endPointUrl, offeringID, obsProp, startTime, endTime,  entityId) {
        this.onAdd(new Video(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            bufferingTime: 1000
        }), DiscoveryType.VIDEO_H264);
    }


    /**
     *
     * @param name
     * @param endPointUrl
     * @param offeringID
     * @param obsProp
     * @param startTime
     * @param endTime
     * @param entityId
     * @private
     */
    createChartDataSource(name, endPointUrl, offeringID, obsProp, startTime, endTime,  entityId) {
        let dataSource = new SweJson(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            bufferingTime: 1000
        });

        let layer = new Curve({
            getValues: {
                dataSourceIds: [dataSource.getId()],
                handler: function (rec, timeStamp) {
                    return {
                        x: timeStamp,
                        y: parseFloat(rec[2])
                    };
                }
            }
        });

        this.onAdd(dataSource, DiscoveryType.CHART, layer);
    }

    onAdd(dataSource, type, layer=null) {

    }
}
/**
 * The different type of discovery.
 * @type {{MARKER_GPS: string, VIDEO_H264: string, VIDEO_MJPEG: string, CHART: string}}
 * @memberof DiscoveryView
 * @instance
 * @module
 */
export const DiscoveryType = {
    MARKER_GPS : "Marker(GPS)",
    VIDEO_H264 : "Video Dialog(H264)",
    VIDEO_MJPEG: "Video Dialog(MJPEG)",
    CHART : "DataSourceChart Dialog"
};

export default DiscoveryView;
