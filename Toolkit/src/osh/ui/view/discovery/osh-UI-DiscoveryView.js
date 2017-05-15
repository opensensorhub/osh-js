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

/**
 * @classdesc
 * @class OSH.UI.DiscoveryView
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
var discoveryView = new OSH.UI.DiscoveryView("discovery-container",{
    services: ["http://sensiasoft.net:8181/"],
    views: [{
        name: 'Video dialog(H264)',
        type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_H264
    },{
        name: 'Video dialog(MJPEG)',
        type : OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_MJPEG
    },{
        name: 'Chart dialog',
        type : OSH.UI.DiscoveryView.Type.DIALOG_CHART
    }
    ]
});

//------ More complex example
 var discoveryView = new OSH.UI.DiscoveryView("",{
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
            name: 'Chart dialog',
            type : OSH.UI.DiscoveryView.Type.DIALOG_CHART
        }
        ]
    });
 */
OSH.UI.DiscoveryView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, properties) {
        this._super(parentElementDivId,[],properties);

        this.dialogContainer = document.body.id;
        this.swapId = "";
        if(typeof properties !== "undefined") {
            if(typeof properties.dataReceiverController !== "undefined") {
                this.dataReceiverController = properties.dataReceiverController;
            } else {
                this.dataReceiverController = new OSH.DataReceiver.DataReceiverController({
                    replayFactor : 1
                });
                this.dataReceiverController.connectAll();
            }

            if(typeof properties.swapId !== "undefined") {
                this.swapId = properties.swapId;
            }

            if(typeof properties.dialogContainer !== "undefined") {
                this.dialogContainer = properties.dialogContainer;
            }
        }

        this.formTagId = "form-"+OSH.Utils.randomUUID();
        this.serviceSelectTagId = "service-"+OSH.Utils.randomUUID();
        this.offeringSelectTagId = "offering-"+OSH.Utils.randomUUID();
        this.observablePropertyTagId = "obsProperty-"+OSH.Utils.randomUUID();
        this.startTimeTagId = "startTime-"+OSH.Utils.randomUUID();
        this.endTimeTagId = "endTime-"+OSH.Utils.randomUUID();
        this.typeSelectTagId = "type-"+OSH.Utils.randomUUID();
        this.formButtonId = "submit-"+OSH.Utils.randomUUID();
        this.syncMasterTimeId = "syncMasterTime-"+OSH.Utils.randomUUID();
        this.entitiesSelectTagId = "entities-"+OSH.Utils.randomUUID();
        this.viewSelectTagId = "dialogSelect-"+OSH.Utils.randomUUID();

        // add template
        var discoveryForm = document.createElement("form");
        discoveryForm.setAttribute("action","#");
        discoveryForm.setAttribute("id",this.formTagId);
        discoveryForm.setAttribute("class",'discovery-form');

        document.getElementById(this.divId).appendChild(discoveryForm);

        var strVar="";
        strVar += "<ul>";
        strVar += "            <li>";
        strVar += "                <h2>Discovery<\/h2>";
        strVar += "                <span class=\"required_notification\">* Denotes Required Field<\/span>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>Service:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                     <select id=\""+this.serviceSelectTagId+"\" required pattern=\"^(?!Select a service$).*\">";
        strVar += "                         <option value=\"\" disabled selected>Select a service<\/option>";
        strVar += "                     <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>Offering:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                    <select id=\""+this.offeringSelectTagId+"\" required>";
        strVar += "                        <option value=\"\" disabled selected>Select an offering<\/option>";
        strVar += "                    <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>Observable Property:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                     <select id=\""+this.observablePropertyTagId+"\" required>";
        strVar += "                         <option value=\"\" disabled selected>Select a property<\/option>";
        strVar += "                     <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label for=\"startTime\">Start time:<\/label>";
        //strVar += "                <input type=\"text\" name=\"startTime\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\" required pattern=\"\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)\" />";
        strVar += "                <input id=\""+this.startTimeTagId+"\" type=\"text\" name=\"startTime\" class=\"input-text\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\" required/>";
        strVar += "                <span class=\"form_hint\">YYYY-MM-DDTHH:mm:ssZ<\/span>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label for=\"endTime\">End time:<\/label>";
        //strVar += "                <input type=\"text\" name=\"endTime\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\"  required pattern=\"\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)\" />";
        strVar += "                <input id=\""+this.endTimeTagId+"\" type=\"text\" name=\"endTime\" class=\"input-text\" placeholder=\"YYYY-MM-DDTHH:mm:ssZ\"  required/>";
        strVar += "                <span class=\"form_hint\">YYYY-MM-DDTHH:mm:ssZ<\/span>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label for=\"syncMasterTime\">Sync master time:<\/label>";
        strVar += "                <input id=\""+this.syncMasterTimeId+"\"  class=\"input-checkbox\" type=\"checkbox\" name=\syncMasterTime\" />";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>Type:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                    <select id=\""+this.typeSelectTagId+"\" required>";
        strVar += "                        <option value=\"\" disabled selected>Select a type<\/option>";
        strVar += "                    <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>Entities:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                    <select id=\""+this.entitiesSelectTagId+"\">";
        strVar += "                        <option value=\"\" selected>None<\/option>";
        strVar += "                    <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <label>View:<\/label>";
        strVar += "                <div class=\"select-style\">";
        strVar += "                    <select id=\""+this.viewSelectTagId+"\" required>";
        strVar += "                        <option value=\"\" disabled selected>Select a view<\/option>";
        strVar += "                    <\/select>";
        strVar += "                <\/div>";
        strVar += "            <\/li>";
        strVar += "            <li>";
        strVar += "                <button id=\""+this.formButtonId+"\" class=\"submit\" type=\"submit\">Add<\/button>";
        strVar += "            <\/li>";
        strVar += "        <\/ul>";

        discoveryForm.innerHTML = strVar;

        // fill service from urls
        if(typeof properties != "undefined") {
            // add services
            if(typeof properties.services != "undefined"){
                this.addValuesToSelect(this.serviceSelectTagId,properties.services);
            }

            // add entities
            if(typeof properties.entities != "undefined"){
                this.addObjectsToSelect(this.entitiesSelectTagId,properties.entities);
            }

            // add views
            if(typeof properties.views != "undefined"){
                this.views = properties.views;
            } else {
                this.views = [];
            }
        }

        // fill type
        for(var type in  OSH.UI.DiscoveryView.Type) {
            this.addValueToSelect(this.typeSelectTagId,OSH.UI.DiscoveryView.Type[type]);
        }

        // add listeners
        OSH.EventManager.observeDiv(this.serviceSelectTagId,"change",this.onSelectedService.bind(this));
        OSH.EventManager.observeDiv(this.offeringSelectTagId,"change",this.onSelectedOffering.bind(this));
        OSH.EventManager.observeDiv(this.typeSelectTagId,"change",this.onSelectedType.bind(this));
        OSH.EventManager.observeDiv(this.formTagId,"submit",this.onFormSubmit.bind(this));
    },

    /**
     *
     * @param event
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    onSelectedService : function(event) {
        var serverTag = document.getElementById(this.serviceSelectTagId);
        var option = serverTag.options[serverTag.selectedIndex];

        // connect to server and get the list of offering
        //var oshServer = new OSH.Server(option.value);

        this.removeAllFromSelect(this.offeringSelectTagId);
       /* var onSuccessGetCapabilities = function(event) {
            this.sensors = oshServer.sensors;
            // remove existing
            var startTimeInputTag = document.getElementById(this.startTimeTagId);
            var endTimeInputTag = document.getElementById(this.endTimeTagId);

            // add the new ones
            for(var i = 0;i < this.sensors.length;i++) {
                this.addValueToSelect(this.offeringSelectTagId,this.sensors[i].name,this.sensors[i],this.sensors[i]);
            }
        }.bind(this);

        var onErrorGetCapabilities = function(event) {
        };

        oshServer.getCapabilities(onSuccessGetCapabilities,onErrorGetCapabilities);*/

       //option.value
        this.oshServer = new OSH.Server({
            sos:'sos', // TODO: allow to customize that value
            sps:'sps', // TODO: allow to customize that value
            url: OSH.Utils.removeLastCharIfExist(option.value,"/"),
            baseUrl: 'sensorhub' // TODO: allow to customize that value
        });

        var onSuccessGetCapabilities = function(jsonObj) {
            var startTimeInputTag = document.getElementById(this.startTimeTagId);
            var endTimeInputTag = document.getElementById(this.endTimeTagId);

            var offering=null;

            for(var i=0;i < jsonObj.Capabilities.contents.offering.length;i++) {
                offering = jsonObj.Capabilities.contents.offering[i];
                this.addValueToSelect(this.offeringSelectTagId,offering.name,offering);
            }
        }.bind(this);

        var onErrorGetCapabilities = function(event) {
        };

        this.oshServer.getCapabilities(onSuccessGetCapabilities,onErrorGetCapabilities);
    },

    /**
     *
     * @param event
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    onSelectedOffering : function(event) {
        var e = document.getElementById(this.offeringSelectTagId);
        var option = e.options[e.selectedIndex];
        var offering = option.parent;
        this.removeAllFromSelect(this.observablePropertyTagId);

        var startTimeInputTag = document.getElementById(this.startTimeTagId);
        var endTimeInputTag = document.getElementById(this.endTimeTagId);

        // set times
        startTimeInputTag.value = offering.phenomenonTime.beginPosition;

        if(typeof offering.phenomenonTime.endPosition.indeterminatePosition !== "undefined") {
            var d = new Date();
            d.setUTCFullYear(2055);
            endTimeInputTag.value = d.toISOString();
        } else {
            endTimeInputTag.value = offering.phenomenonTime.endPosition;
        }

        // feed observable properties
        for(var i = 0; i  < offering.observableProperty.length;i++) {
            this.addValueToSelect(this.observablePropertyTagId,offering.observableProperty[i],offering);
        }
    },

    /**
     *
     * @param event
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    onSelectedType : function(event) {
        var typeTag = document.getElementById(this.typeSelectTagId);
        var tagValue = typeTag.value;
        this.removeAllFromSelect(this.viewSelectTagId);
        for(var i= 0;i  < this.views.length;i++) {
            var currentView = this.views[i];
            if(typeof currentView.type != "undefined" && currentView.type == tagValue){
                this.addValueToSelect(this.viewSelectTagId,currentView.name,undefined,currentView);
            }
        }
    },

    /**
     *
     * @param event
     * @returns {boolean}
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    onFormSubmit : function(event) {
        event.preventDefault();
        // service
        var serviceTag = document.getElementById(this.serviceSelectTagId)
        var serviceTagSelectedOption = serviceTag.options[serviceTag.selectedIndex];

        // offering
        var offeringTag = document.getElementById(this.offeringSelectTagId)
        var offeringTagSelectedOption = offeringTag.options[offeringTag.selectedIndex];

        // obs property
        var observablePropertyTag = document.getElementById(this.observablePropertyTagId);
        var observablePropertyTagSelectedOption = observablePropertyTag.options[observablePropertyTag.selectedIndex];

        // time
        var startTimeInputTag = document.getElementById(this.startTimeTagId);
        var endTimeInputTag = document.getElementById(this.endTimeTagId);

        // sync master time
        var syncMasterTimeTag = document.getElementById(this.syncMasterTimeId);

        // type & view
        var typeTag = document.getElementById(this.typeSelectTagId);
        var viewTag = document.getElementById(this.viewSelectTagId);
        var viewTagOption = viewTag.options[viewTag.selectedIndex];

        // entity
        var entityTag = document.getElementById(this.entitiesSelectTagId);
        var entityTagTagOption = entityTag.options[entityTag.selectedIndex];

        // get values
        var name=offeringTagSelectedOption.parent.name;
        var endPointUrl=serviceTagSelectedOption.value+"sensorhub/sos";
        var offeringID=offeringTagSelectedOption.parent.identifier;
        var obsProp=observablePropertyTagSelectedOption.value;
        var startTime=startTimeInputTag.value;
        var endTime=endTimeInputTag.value;
        var viewId = viewTagOption.object.viewId;
        var entityId = undefined;
        if(typeof entityTagTagOption.object != "undefined"){
            entityId = entityTagTagOption.object.id;
        }

        endPointUrl = endPointUrl.replace('http://', '');
        var syncMasterTime = syncMasterTimeTag.checked;


        switch(viewTagOption.object.type) {
            case OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_MJPEG:
            {
                this.createMJPEGVideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime,syncMasterTime,entityId);
                break;
            }
            case OSH.UI.DiscoveryView.Type.DIALOG_VIDEO_H264:
            {
                this.createH264VideoDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime,syncMasterTime,entityId);
                break;
            }
            case OSH.UI.DiscoveryView.Type.MARKER_GPS:
            {
                this.createGPSMarker(name, endPointUrl, offeringID, obsProp, startTime, endTime,syncMasterTime,viewTagOption.object.viewId,entityId);
                break;
            }
            case OSH.UI.DiscoveryView.Type.DIALOG_CHART:
            {
                this.createChartDialog(name, endPointUrl, offeringID, obsProp, startTime, endTime,syncMasterTime,entityId);
                break;
            }
            default : break;
        }
        return false;
    },

    /**
     *
     * @param tagId
     * @param objectsArr
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    addObjectsToSelect:function(tagId,objectsArr) {
        var selectTag = document.getElementById(tagId);
        for(var i=0;i < objectsArr.length;i++) {
            var object = objectsArr[i];
            var option = document.createElement("option");
            option.text = object.name;
            option.value = object.name;
            option.object = object;
            selectTag.add(option);
        }
    },

    /**
     *
     * @param tagId
     * @param valuesArr
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    addValuesToSelect:function(tagId,valuesArr) {
        var selectTag = document.getElementById(tagId);
        for(var i=0;i < valuesArr.length;i++) {
            var value = valuesArr[i];
            var option = document.createElement("option");
            option.text = value;
            option.value = value;
            selectTag.add(option);
        }
    },

    /**
     *
     * @param tagId
     * @param value
     * @param parent
     * @param object
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    addValueToSelect:function(tagId,value,parent,object) {
        var selectTag = document.getElementById(tagId);
        var option = document.createElement("option");
        option.text = value;
        option.value = value;
        option.parent = parent;

        if(typeof object != "undefined") {
            option.object = object;
        }

        if(typeof parent != "undefined") {
            option.parent = parent;
        }
        selectTag.add(option);
    },

    /**
     *
     * @param tagId
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    removeAllFromSelect:function(tagId) {
        var i;
        var selectTag = document.getElementById(tagId);
        for (i = selectTag.options.length - 1; i > 0; i--) {
            selectTag.remove(i);
        }
    },

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
    createGPSMarker: function(name,endPointUrl,offeringID,obsProp,startTime,endTime,syncMasterTime,viewId,entityId) {
        var gpsDataSource = new OSH.DataReceiver.LatLonAlt(name, {
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
        var pointMarker = new OSH.UI.Styler.PointMarker({
            locationFunc : {
                dataSourceIds : [gpsDataSource.id],
                handler : function(rec) {
                    return {
                        x : rec.lon,
                        y : rec.lat,
                        z : rec.alt
                    };
                }
            },
            icon : 'images/cameralook.png',
            iconFunc : {
                dataSourceIds: [gpsDataSource.getId()],
                handler : function(rec,timeStamp,options) {
                    if(options.selected) {
                        return 'images/cameralook-selected.png'
                    } else {
                        return 'images/cameralook.png';
                    };
                }
            }
        });

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(gpsDataSource);

        var viewItem = {
            styler :  pointMarker,
            name : name
        };

        if(typeof entityId !== "undefined") {
            viewItem['entityId'] = entityId;
        }

        OSH.EventManager.fire(OSH.EventManager.EVENT.ADD_VIEW_ITEM,{viewItem:viewItem,viewId:viewId});
        OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE,{dataSourcesId:[gpsDataSource.id]});
    },

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
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    createMJPEGVideoDialog:function(name,endPointUrl,offeringID,obsProp,startTime,endTime,syncMasterTime,entityId) {
        var videoDataSource = new OSH.DataReceiver.VideoMjpeg(name, {
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

        var dialog    =  new OSH.UI.DialogView(this.dialogContainer, {
            draggable: true,
            css: "dialog",
            name: name,
            show:true,
            dockable: false,
            closeable: true,
            connectionIds : [videoDataSource.id],
            swapId: this.swapId
        });

        var videoView = new OSH.UI.MjpegView(dialog.popContentDiv.id, {
            dataSourceId: videoDataSource.id,
            css: "video",
            cssSelected: "video-selected",
            name: "Android Video",
            entityId : entityId,
            keepRatio:true
        });

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(videoDataSource);

        // starts streaming
        OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE,{dataSourcesId:[videoDataSource.id]});
    },

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
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    createH264VideoDialog:function(name,endPointUrl,offeringID,obsProp,startTime,endTime,syncMasterTime,entityId) {
        var videoDataSource = new OSH.DataReceiver.VideoH264(name, {
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

        var dialog    =  new OSH.UI.DialogView(this.dialogContainer, {
            draggable: true,
            css: "dialog",
            name: name,
            show:true,
            dockable: false,
            closeable: true,
            connectionIds : [videoDataSource.id],
            swapId: this.swapId,
            keepRatio:true
        });

        var videoView = new OSH.UI.FFMPEGView(dialog.popContentDiv.id, {
            dataSourceId: videoDataSource.getId(),
            css: "video",
            cssSelected: "video-selected",
            name: "Android Video",
            entityId : entityId,
            useWorker:true,
            useWebWorkerTransferableData:true
        });

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(videoDataSource);

        // starts streaming
        OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE,{dataSourcesId:[videoDataSource.id]});
    },


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
     * @memberof OSH.UI.DiscoveryView
     * @instance
     */
    createChartDialog:function(name,endPointUrl,offeringID,obsProp,startTime,endTime,syncMasterTime,entityId) {
        var chartDataSource = new OSH.DataReceiver.Chart(name, {
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

        var dialog    =  new OSH.UI.DialogView(this.dialogContainer, {
            draggable: true,
            css: "dialog",
            name: name,
            show:true,
            dockable: false,
            closeable: true,
            connectionIds : [chartDataSource.id],
            swapId: this.swapId
        });

        // Chart View
        var chartView = new OSH.UI.Nvd3CurveChartView(dialog.popContentDiv.id,
            [{
                styler: new OSH.UI.Styler.Curve({
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
                css:"chart-view",
                cssSelected: "video-selected",
                maxPoints:30
            }
        );

        // We can add a group of dataSources and set the options
        this.dataReceiverController.addDataSource(chartDataSource);

        // starts streaming
        OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE,{dataSourcesId:[chartDataSource.id]});
    }
});

/**
 * The different type of discovery.
 * @type {{MARKER_GPS: string, DIALOG_VIDEO_H264: string, DIALOG_VIDEO_MJPEG: string, DIALOG_CHART: string}}
 * @memberof OSH.UI.DiscoveryView
 * @instance
 */
OSH.UI.DiscoveryView.Type = {
    MARKER_GPS : "Marker(GPS)",
    DIALOG_VIDEO_H264 : "Video Dialog(H264)",
    DIALOG_VIDEO_MJPEG: "Video Dialog(MJPEG)",
    DIALOG_CHART : "Chart Dialog"
};