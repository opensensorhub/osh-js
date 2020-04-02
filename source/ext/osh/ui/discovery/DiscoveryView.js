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

import Server from "../../../../osh/server/Server";
import EventManager from "../../../../osh/events/EventManager";
import {isDefined, randomUUID, removeLastCharIfExist} from "../../../../osh/utils/Utils";
import DataSourceLatLonAlt from "../../../../osh/datareceiver/DataSourceLatLonAlt";
import PointMarker from "../../../../osh/ui/styler/StylerPointMarker";
import {DataSourceVideoMjpeg} from "../../../../osh/datareceiver/DataSourceVideoMjpeg";
import DataSourceVideoH264 from "../../../../osh/datareceiver/DataSourceVideoH264";
import DataSourceChart from "../../../../osh/datareceiver/DataSourceChart";
import Curve from "../../../../osh/ui/styler/StylerCurve";
import FFMPEGView from "../../../../osh/ui/view/video/FFMPEGView";
import ChartJsView from "../../../../osh/ui/view/chart/ChartJsView";
import {View} from "../../../../osh/ui/view/View";
import DataReceiverController from "../../../../osh/datareceiver/DataReceiverController";
import "../../resources/css/discovery.css";
/**
 * @classdesc
 * @class OSH.UI.DiscoveryView
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
let discoveryView = new OSH.UI.DiscoveryView("discovery-container",{
    services: ["http://sensiasoft.net:8181/"],
    views: [{
        name: 'Video dialog(H264)',
        type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_H264
    },{
        name: 'Video dialog(MJPEG)',
        type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_MJPEG
    },{
        name: 'DataSourceChart dialog',
        type : OSH.UI.DiscoveryView.Type.DIALOG_CHART
    }
    ]
});

//------ More complex example
 let discoveryView = new OSH.UI.DiscoveryView("",{
        services: ["http://sensiasoft.net:8181/"], // server list
        css: "discovery-view",
        dataReceiverController:dataProviderController, // add custom dataProviderController
        swapId: "main-container", // add a divId to swap data for inner dialog
        entities: [androidEntity], // add entities
        views: [{
            name: 'Leaflet 2D Map',
            viewId: leafletMainView.id,
            type : OSH.UI.DiscoveryView.Type.MARKER_GPS
        }, {
            name: 'Cesium 3D Globe',
            viewId: cesiumMainMapView.id,
            type : OSH.UI.DiscoveryView.Type.MARKER_GPS
        },{
            name: 'Video dialog(H264)',
            type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_H264
        },{
            name: 'Video dialog(MJPEG)',
            type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_MJPEG
        },{
            name: 'DataSourceChart dialog',
            type : OSH.UI.DiscoveryView.Type.DIALOG_CHART
        }
        ]
    });
 */
export default class DiscoveryView extends View {
    constructor(parentElementDivId, properties) {
        super(parentElementDivId, [], properties);

        this.dialogContainer = document.body.id;
        this.swapId = "";
        if (isDefined(properties)) {
            if (isDefined(properties.dataReceiverController)) {
                this.dataReceiverController = properties.dataReceiverController;
            } else {
                this.dataReceiverController = new DataReceiverController({
                    replayFactor: 1
                });
                this.dataReceiverController.connectAll();
            }

            if (isDefined(properties.swapId)) {
                this.swapId = properties.swapId;
            }

            if (isDefined(properties.dialogContainer)) {
                this.dialogContainer = properties.dialogContainer;
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
        this.syncMasterTimeId = "syncMasterTime-" + randomUUID();
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
        strlet += "                <label for=\"syncMasterTime\">Sync master time:<\/label>";
        strlet += "                <input id=\"" + this.syncMasterTimeId + "\"  class=\"input-checkbox\" type=\"checkbox\" name=\syncMasterTime\" />";
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
        strlet += "                <label>View:<\/label>";
        strlet += "                <div class=\"select-style\">";
        strlet += "                    <select id=\"" + this.viewSelectTagId + "\" required>";
        strlet += "                        <option value=\"\" disabled selected>Select a view<\/option>";
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
        EventManager.observeDiv(this.serviceSelectTagId, "change", this.onSelectedService.bind(this));
        EventManager.observeDiv(this.offeringSelectTagId, "change", this.onSelectedOffering.bind(this));
        EventManager.observeDiv(this.typeSelectTagId, "change", this.onSelectedType.bind(this));
        EventManager.observeDiv(this.formTagId, "submit", this.onFormSubmit.bind(this));
    }

    /**
     *
     * @param event
     * @memberof OSH.UI.DiscoveryView
     * @instance
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
     * @memberof OSH.UI.DiscoveryView
     * @instance
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
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    onSelectedType(event) {
        let typeTag = document.getElementById(this.typeSelectTagId);
        let tagValue = typeTag.value;
        this.removeAllFromSelect(this.viewSelectTagId);
        for (let i = 0; i < this.views.length; i++) {
            let currentView = this.views[i];
            if (typeof currentView.type != "undefined" && currentView.type == tagValue) {
                this.addValueToSelect(this.viewSelectTagId, currentView.name, undefined, currentView);
            }
        }
    }

    /**
     *
     * @param event
     * @returns {boolean}
     * @memberof OSH.UI.DiscoveryView
     * @instance
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

        // sync master time
        let syncMasterTimeTag = document.getElementById(this.syncMasterTimeId);

        // type & view
        let typeTag = document.getElementById(this.typeSelectTagId);
        let viewTag = document.getElementById(this.viewSelectTagId);
        let viewTagOption = viewTag.options[viewTag.selectedIndex];

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
        let viewId = viewTagOption.object.viewId;
        let entityId = undefined;
        if (typeof entityTagTagOption.object != "undefined") {
            entityId = entityTagTagOption.object.id;
        }

        endPointUrl = endPointUrl.replace('http://', '');
        let syncMasterTime = syncMasterTimeTag.checked;


        switch (viewTagOption.object.type) {
            case DiscoveryType.DIALOG_VIDEO_MJPEG: {
                this.createMJPEGVideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId);
                break;
            }
            case DiscoveryType.DIALOG_VIDEO_H264: {
                this.createH264VideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId);
                break;
            }
            case DiscoveryType.MARKER_GPS: {
                this.createGPSMarker(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, viewTagOption.object.viewId, entityId);
                break;
            }
            case DiscoveryType.DIALOG_CHART: {
                this.createChartDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId);
                break;
            }
            default :
                break;
        }
        return false;
    }

    onChange(event) {

    }

    /**
     *
     * @param tagId
     * @param objectsArr
     * @memberof OSH.UI.DiscoveryView
     * @instance
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
     * @memberof OSH.UI.DiscoveryView
     * @instance
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
     * @memberof OSH.UI.DiscoveryView
     * @instance
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
     * @memberof OSH.UI.DiscoveryView
     * @instance
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
     * @param syncMasterTime
     * @param viewId
     * @param entityId
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    createGPSMarker(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, viewId, entityId) {
        let gpsDataSource = new DataSourceLatLonAlt(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            syncMasterTime: syncMasterTime,
            bufferingTime: 1000,
            timeShift: -16000
        });

        // create viewItem
        let pointMarker = new PointMarker({
            locationFunc: {
                dataSourceIds: [gpsDataSource.id],
                handler: function (rec) {
                    return {
                        x: rec.lon,
                        y: rec.lat,
                        z: rec.alt
                    };
                }
            },
            icon: 'images/cameralook.png',
            iconFunc: {
                dataSourceIds: [gpsDataSource.getId()],
                handler: function (rec, timeStamp, options) {
                    if (options.selected) {
                        return 'images/cameralook-selected.png';
                    } else {
                        return 'images/cameralook.png';
                    }
                }
            }
        });

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(gpsDataSource);

        let viewItem = {
            styler: pointMarker,
            name: name
        };

        if (typeof entityId !== "undefined") {
            viewItem['entityId'] = entityId;
        }

        EventManager.fire(EventManager.EVENT.ADD_VIEW_ITEM, {viewItem: viewItem, viewId: viewId});
        EventManager.fire(EventManager.EVENT.CONNECT_DATASOURCE, {dataSourcesId: [gpsDataSource.id]});
    }

    /**
     *
     * @param name
     * @param endPointUrl
     * @param offeringID
     * @param obsProp
     * @param startTime
     * @param endTime
     * @param syncMasterTime
     * @param entityId
     * @memberof UI.DiscoveryView
     * @instance
     */
    createMJPEGVideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId) {
        let videoDataSource = new DataSourceVideoMjpeg(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            syncMasterTime: syncMasterTime,
            bufferingTime: 1000
        });

        let videoView = new UI.MjpegView(document.body, {
            dataSourceId: videoDataSource.id,
            css: "video",
            cssSelected: "video-selected",
            name: "Android Video",
            entityId: entityId,
            keepRatio: true
        });

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(videoDataSource);

        // starts streaming
        EventManager.fire(EventManager.EVENT.CONNECT_DATASOURCE, {dataSourcesId: [videoDataSource.id]});
    }

    /**
     *
     * @param name
     * @param endPointUrl
     * @param offeringID
     * @param obsProp
     * @param startTime
     * @param endTime
     * @param syncMasterTime
     * @param entityId
     * @memberof UI.DiscoveryView
     * @instance
     */
    createH264VideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId) {
        let videoDataSource = new DataSourceVideoH264(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            syncMasterTime: syncMasterTime,
            bufferingTime: 1000
        });

        let videoView = new FFMPEGView(document.body, {
            dataSourceId: videoDataSource.getId(),
            css: "video",
            cssSelected: "video-selected",
            name: "Android Video",
            entityId: entityId,
            useWorker: true,
            useWebWorkerTransferableData: true
        });

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(videoDataSource);

        // starts streaming
        EventManager.fire(EventManager.EVENT.CONNECT_DATASOURCE, {dataSourcesId: [videoDataSource.id]});
    }


    /**
     *
     * @param name
     * @param endPointUrl
     * @param offeringID
     * @param obsProp
     * @param startTime
     * @param endTime
     * @param syncMasterTime
     * @param entityId
     * @memberof UI.DiscoveryView
     * @instance
     */
    createChartDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime, syncMasterTime, entityId) {
        let chartDataSource = new DataSourceChart(name, {
            protocol: "ws",
            service: "SOS",
            endpointUrl: endPointUrl,
            offeringID: offeringID,
            observedProperty: obsProp,
            startTime: startTime,
            endTime: endTime,
            replaySpeed: 1,
            syncMasterTime: syncMasterTime,
            bufferingTime: 1000
        });

        // DataSourceChart View
        let chartView = new ChartJsView(document.body,
            [{
                styler: new Curve({
                    valuesFunc: {
                        dataSourceIds: [chartDataSource.getId()],
                        handler: function (rec, timeStamp) {
                            return {
                                x: timeStamp,
                                y: parseFloat(rec[2])
                            };
                        }
                    }
                })
            }],
            {
                name: name,
                yLabel: '',
                xLabel: '',
                css: "chart-view",
                cssSelected: "video-selected",
                maxPoints: 30
            }
        );

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(chartDataSource);

        // starts streaming
        EventManager.fire(EventManager.EVENT.CONNECT_DATASOURCE, {dataSourcesId: [chartDataSource.id]});
    }
}
/**
 * The different type of discovery.
 * @type {{MARKER_GPS: string, DIALOG_VIDEO_H264: string, DIALOG_VIDEO_MJPEG: string, DIALOG_CHART: string}}
 * @memberof UI.DiscoveryView
 * @instance
 */
export const DiscoveryType = {
    MARKER_GPS : "Marker(GPS)",
    DIALOG_VIDEO_H264 : "Video Dialog(H264)",
    DIALOG_VIDEO_MJPEG: "Video Dialog(MJPEG)",
    DIALOG_CHART : "DataSourceChart Dialog"
};
