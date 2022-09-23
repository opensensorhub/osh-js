import { randomUUID } from "../source/core/utils/Utils";

const Prism = require('prismjs');
const beautify = require('js-beautify').js;
var Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

var samples = [{
        name: "FOI Locations (CesiumJS)",
        description: "Display the location of several features of interest on a CesiumJS globe.",
        url: "cesium-fois"
    },
    {
        name: "Moving Location (CesiumJS)",
        description: "Display a moving marker on a CesiumJS globe, tracking the current location of a vehicle.",
        url: "cesium-location"
    },
    {
        name: "Moving Location with custom viewer properties(CesiumJS)",
        description: "Display a moving marker on a CesiumJS globe, tracking the current location of a vehicle and define some custom cesium viewer properties.",
        url: "cesium-location-opts"
    },
    {
        name: "Moving Location  + path (CesiumJS)",
        description: "Display a moving marker and a polyline on a CesiumJS map, showing both the current location of a vehicle and the historical track.",
        url: "cesium-location-path"
    },
    {
        name: "Moving Location (Deck.gl)",
        description: "Display a moving marker on a Deck.gl canvas, tracking the current location of a vehicle.",
        url: "deckgl-location"
    },
    {
        name: "Simple Chart (Chart.js)",
        description: "Display a chart with time series of weather measurements.",
        url: "chart"
    },
    {
        name: "Moving Location (Leaflet)",
        description: "Display a moving marker on a Leaflet map, tracking the current location of a vehicle.",
        url: "leaflet-location"
    },
    {
        name: "FOI Locations (Leaflet)",
        description: "Display the location of several features of interest on a Leaflet map.",
        url: "leaflet-location-fois",
        screenshot: "images/screenshots/leaflet-fois.png"
    },
    {
        name: "Moving Location + Heading (Leaflet)",
        description: "Display a moving marker on a Leaflet map, tracking the current location and heading of a vehicle.",
        url: "leaflet-location-heading"
    },
    {
        name: "Moving Location + Path (Leaflet)",
        description: "Display a moving marker and a polyline on a Leaflet map, showing both the current location of a vehicle and the historical track.",
        url: "leaflet-location-path"
    },
    {
        name: "Moving Location (OpenLayers)",
        description: "Display a moving marker on an OpenLayers map, tracking the current location of a vehicle.",
        url: "openlayers-location"
    },
    {
        name: "Moving Location + Heading (OpenLayers)",
        description: "Display a moving marker on an OpenLayers map, tracking the current location and heading of a vehicle.",
        url: "openlayers-location-heading"
    },
    {
        name: "Moving Location + Path + Heading (Mapbox)",
        description: "Display a moving marker and a polyline on a Mapbox map, showing both the current location of a vehicle and the historical track.",
        url: "mapbox-location-path-heading"
    },
    {
        name: "Moving Location + Heading + Video (Leaflet)",
        description: "Display a moving marker on an Leaflet map, tracking the current location of a vehicle and its corresponding" +
            "video. Create duplicated dataSources running at different time to check there is no collision between data. The " +
            "2 datasets are using a DataSynchronizer object. Each one should be independent.",
        url: "video-map-multiple-datasource"
    },
    {
        name: "Z-Index ordering",
        description: "Display a moving marker on an Leaflet, DeckGl,Cesium and Openlayers map using a z-Index between markers",
        url: "zIndex-location-path"
    },
    {
        name: "Resizable H264 Video",
        description: "Display an H264 video in a simple resizable DIV using our FFMPEG-JS decoder.",
        url: "video-h264"
    },
    {
        name: "H264 Video using WebCodecAPI",
        description: "Display an H264 video in a simple DIV using Experimental Hardware WebCodecAPI decoder.",
        url: "video-h264-webcodec-api"
    },
    {
        name: "H264 Image draping Video",
        description: "Display an H264 video in a simple DIV using our FFMPEG-JS decoder and drap the decoded frame onto the terrain.",
        url: "video-h264-draping"
    },
    {
        name: "Resizable MJPEG Video",
        description: "Display an MJPEG video in a simple resizable DIV.",
        url: "video-mjpeg"
    },
    {
        name: 'VueJs component: Multiple Video with control',
        description: 'Display multiple videos using forward/pause/play/backward control using the same DataSynchronizer',
        url: 'video-with-control-vuejs-synchronized',
        code: 'vue/App_examples/video-with-control-vuejs-synchronized.vue'
    },
    {
        name: 'AVL data using multiple ids',
        description: 'Display multiple markers corresponding to a unique id provided by the same DataSource',
        url: 'avl'
    },
    {
        name: 'AVL data using multiple ids and Time controller in VueJS',
        description: 'Display multiple markers corresponding to a unique id provided by the same DataSource with a Time controller in VueJS',
        url: 'avl-with-control-vuejs',
        code: 'vue/App_examples/avl-with-control-vuejs.vue'
    },
    {
        name: 'ISA Biological & MISB UAS sensor data using MQTT protocol',
        description: 'Display biological and GPS sensors from ISA Biological Sensor & MISB UAS using MQTT protocol',
        url: 'mqtt'
    },
    {
        name: "Chart with Time controller (Chart.js)",
        description: "Display a chart with time series of weather measurements and time controller.",
        url: "chart-archive-realtime",
        code: 'vue/App_examples/chart-archive-realtime.vue'
    },
    {
        name: "Chart with Time controller (Chart.js) in batch mode",
        description: "Display a chart using full batch mode with time series of weather measurements and time controller.",
        url: "chart-archive-realtime-batch",
        code: 'vue/App_examples/chart-archive-realtime-batch.vue'
    },
    {
        name: "Chart with Time controller and Synchronizer (Chart.js)",
        description: "Display a chart with time series of weather measurements and time controller.",
        url: "chart-archive-realtime-synchronized",
        code: 'vue/App_examples/chart-archive-realtime-synchronized.vue'
    },
    {
        name: "Audio WebCodec/FFmpeg.js decoding",
        description: "Listen audio stream using WebCodec/FFmpeg.js",
        url: "audio"
    },
    {
        name: "Audio WebCodec/FFmpeg.js decoding with time controller",
        description: "Listen audio stream using WebCodec/FFmpeg.js with time controller",
        url: 'audio-with-control-vuejs',
        code: 'vue/App_examples/audio-with-control-vuejs.vue'
    },
    {
        name: "Audio & Video WebCodec/FFmpeg.js decoding with time controller",
        description: "Listen audio stream using WebCodec/FFmpeg.js with time controller and associated Video",
        url: 'audio-video-synchronized-with-control-vuejs',
        code: 'vue/App_examples/audio-video-synchronized-with-control-vuejs.vue'
    },
    {
        name: "Tasking simulated drone using SweApi",
        description: "Tasking simulated drone using SweApi, display drone position and control status",
        url: 'tasking',
    },
];

// load sample cards
var currentSample;
samples.forEach(s => {
    var $newElt = $($("#card-template").html());
    $("p.card-text", $newElt).html(s.description);
    $("img", $newElt)
        .on("error", e => e.target.src = "https://opensensorhub.files.wordpress.com/2017/08/opensensorhub-logo2.png")
        .attr("title", s.name)
        .attr("src", "images/screenshots/" + s.url + ".jpg");

    // setup handler to load sample in popup
    $("button", $newElt).on("click", e => {
        // load selected sample in modal
        currentSample = s;
        $("#src-code").empty();
        $("#src-code").hide();
        $("#sample-area").empty();
        $("#sample-area").show();

        const iframeId = randomUUID();
        const iframe = document.createElement("iframe");
        iframe.setAttribute("class", "iframe-example");
        iframe.setAttribute("style", "width:100%;height:100%;border:none;padding:0px");
        iframe.setAttribute("id", iframeId);
        iframe.setAttribute("src", s.url + '.html');
        iframe.onload = function() {
                let $body = $('body', iframe.contentWindow.document);
                $body.css('margin', '0');
            }
            //     $body.load("" + s.url+'.html');
            // };

        const sampleArea = document.getElementById("sample-area");
        sampleArea.appendChild(iframe);

        $("#sample-dialog h5").html(s.name);
        $("#sample-dialog").modal("show");
    });
    $("#sample-list").append($newElt);
});

$("#close-button").button().on("click", e => {
    $("#sample-area").empty();
    $("#pre-code").addClass("hide");
});
// setup handler to show code in popup
$("#src-button").button().on("click", e => {
    if ($("#sample-area").is(":hidden")) {
        $("#sample-area").show();
        $("#src-code").hide();
        $("#src-code").empty();
        $("#pre-code").addClass("hide");
        $("#pre-code").removeClass("show");
        return;
    }

    let url = 'js' + '/' + currentSample.url + '.js';
    if (currentSample.code) {
        url = currentSample.code;
    }

    fetch(url)
        .then(r => r.text())
        .then(srcString => {
            $("#src-code").empty();
            let html = Prism.highlight(srcString, Prism.languages.javascript);
            $("#sample-area").hide();
            $("#pre-code").removeClass("hide");
            $("#pre-code").addClass("show");
            $("#src-code").append(html);
            $("#src-code").show();
        });
});

$("#shared-button").button().on("click", e => {

    let url = currentSample.url + '.html';
    const win = window.open(url, '_blank');
    win.focus();
});
