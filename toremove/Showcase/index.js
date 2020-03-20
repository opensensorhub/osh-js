import EventMap from "../Toolkit/src/osh/osh-EventMap.js";

var samples = [
    {
        name: "Moving Location (Leaflet)",
        description: "Display a moving marker on a Leaflet map, tracking the current location of a vehicle.",
        url: "leaflet-location.html"
    },
    {
        name: "Moving Location (CesiumJS)",
        description: "Display a moving marker on a CesiumJS globe, tracking the current location of a vehicle.",
        url: "cesium-location.html"
    },
    {
        name: "Moving Location (OpenLayers)",
        description: "Display a moving marker on an OpenLayers map, tracking the current location of a vehicle.",
        url: "openlayers-location.html"
    },
    {
        name: "Moving Location + Heading (Leaflet)",
        description: "Display a moving marker on a Leaflet map, tracking the current location and heading of a vehicle.",
        url: "leaflet-location+heading.html"
    },
    {
        name: "Moving Location + Path (Leaflet)",
        description: "Display a moving marker and a polyline on a Leaflet map, showing both the current location of a vehicle and the historical track.",
        url: "leaflet-location+path.html"
    },
    {
        name: "FOI Locations (Leaflet)",
        description: "Display the location of several features of interest on a Leaflet map.",
        url: "leaflet-fois.html",
        screenshot: "images/screenshots/leaflet-fois.png"
    },
    {
        name: "FOI Locations (CesiumJS)",
        description: "Display the location of several features of interest on a CesiumJS globe.",
        url: "cesium-fois.html"
    },
    {
        name: "Resizable MJPEG Video",
        description: "Display an MJPEG video in a simple resizable DIV.",
        url: "video-mjpeg.html"
    },
    {
        name: "Resizable H264 Video",
        description: "Display an H264 video in a simple resizable DIV using our FFMPEG-JS decoder.",
        url: "video-h264.html"
    },
    {
        name: "Simple Chart (NVD3)",
        description: "Display a chart with time series of weather measurements.",
        url: "curveChart.html"
    }

    /*
            {
                name: "NVD3 JSON Windspeed",
                url: "viewers/CurveChart/curveChart.html"
            },
            {
                name: "Entity tree + stack menu",
                url: "viewers/Tree/tree.html"
            },
            {
                name: "Discovery",
                url: "viewers/Discovery/discovery.html"
            },
            {
                name: "Time control RangeSlider",
                url: "viewers/RangeSlider/RangeSlider.html"
            },
            {
                name: "Multi dialog + tasking",
                url: "viewers/Multidialog/Multidialog.html"
            },{
                name: "Server",
                url: "viewers/Server/server.html"
            },
            {
                name: "Live camera tasking",
                url: "viewers/LiveTasking/LiveTasking.html"
            },
            {
                name: "WFS-T / Cesium example",
                url: "viewers/wfst/wfst.html"
            }
    */
];

// load sample cards
var currentSample;
console.log($);
samples.forEach(s => {
    var $newElt = $($("#card-template").html());
    $("p.card-text", $newElt).html(s.description);
    $("img", $newElt)
        .on("error", e => e.target.src = "https://opensensorhub.files.wordpress.com/2017/08/opensensorhub-logo2.png")
        .attr("title", s.name)
        .attr("src", "images/screenshots/" + s.url.replace(".html", ".jpg"));

    // setup handler to load sample in popup
    $("button", $newElt).on("click", e => {
        // cleanup previously opened connections
        for (let v in window) {
            if (window[v] != null && typeof(window[v].disconnect) === "function") {
                console.log("Disconnecting " + window[v].name);
                window[v].disconnect();
                delete window[v];
            }
        }

        // reset all event subscribers
        let eventMap = new EventMap();

        // load selected sample in modal
        currentSample = s;
        $("#src-code").empty();
        $("#src-code").hide();
        $("#sample-area").empty();
        $("#sample-area").show();
        $("#sample-area").load("samples/" + s.url);
        $("#sample-dialog h5").html(s.name);
        $("#sample-dialog").modal("show");
    });
    $("#sample-list").append($newElt);
});

// setup handler to show code in popup
function htmlEscape(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

$("#src-button").button().on("click", e => {
    if ($("#sample-area").is(":hidden")) {
        $("#sample-area").show();
        $("#src-code").hide();
        $("#src-code").empty();
        return;
    }
    var srcString = $.ajax({
        url: "samples/" + currentSample.url,
        async: false
    }).responseText;
    $("#src-code").empty();
    $("#src-code").append(htmlEscape(srcString));
    $("#src-code").removeClass("prettyprinted");
    $("#sample-area").hide();
    $("#src-code").show();
    PR.prettyPrint();
});
