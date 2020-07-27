const Prism = require('prismjs');
const beautify = require('js-beautify').js;
var Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

var samples = [
  {
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
    name: "Simple Chart (Chart.js)",
    description: "Display a chart with time series of weather measurements.",
    url: "chart"
  },
  {
    name: "Discovery (form)",
    description: "Display a Form helping to choose the correct DataSource depending on the offering.",
    url: "discovery"
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
    name: "Range slider (noUiSlider)",
    description: "Display a time bar to change dynamically the time period.",
    url: "range-slider"
  },
  {
    name: "Moving Location + Heading + Video Sync (Leaflet)",
    description: "Display a moving marker on an Leaflet map, tracking the current location of a vehicle and its corresponding" +
      "video, both are synchronized",
    url: "video-gps-sync"
  },
  {
    name: "Resizable H264 Video",
    description: "Display an H264 video in a simple resizable DIV using our FFMPEG-JS decoder.",
    url: "video-h264"
  },
  {
    name: "H264 Image draping Video",
    description: "Display an H264 video in a simple DIV using our FFMPEG-JS decoder and drap the decoded frame onto the terrain.",
    url: "video-h264-draping"
  },
  {
    name: "Resizable Transferable H264 Video",
    description: "Display an H264 video in a simple resizable DIV using our FFMPEG-JS decoder and a button to " +
      "destroy/re-create the view.",
    url: "video-h264-transferable"
  },
  {
    name: "Resizable MJPEG Video",
    description: "Display an MJPEG video in a simple resizable DIV.",
    url: "video-mjpeg"
  }
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
    // cleanup previously opened connections
    for (v in window) {
      if (window[v] != null && typeof(window[v].disconnect) === "function") {
        console.log("Disconnecting " + window[v].name);
        window[v].disconnect();
        delete window[v];
      }
    }

    // load selected sample in modal
    currentSample = s;
    $("#src-code").empty();
    $("#src-code").hide();
    $("#sample-area").empty();
    $("#sample-area").show();
    $("#sample-area").load("" + s.url+'.html');
    $("#sample-dialog h5").html(s.name);
    $("#sample-dialog").modal("show");
  });
  $("#sample-list").append($newElt);
});

$("#close-button").button().on("click", e => {
    $("#sample-area").empty();
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

  fetch('js'+'/'+currentSample.url+'.js')
    .then( r => r.text() )
    .then( srcString => {
      $("#src-code").empty();
      let html = Prism.highlight(
        beautify(srcString, {
          "indent_size": 2,
          "indent_char": " ",
          "indent_with_tabs": true,
          "editorconfig": false,
          "eol": "\n",
          "end_with_newline": false,
          "indent_level": 0,
          "preserve_newlines": true,
          "max_preserve_newlines": 10,
          "space_in_paren": false,
          "space_in_empty_paren": false,
          "jslint_happy": false,
          "space_after_anon_function": false,
          "space_after_named_function": false,
          "brace_style": "collapse",
          "unindent_chained_methods": false,
          "break_chained_methods": false,
          "keep_array_indentation": false,
          "unescape_strings": false,
          "wrap_line_length": 0,
          "e4x": false,
          "comma_first": false,
          "operator_position": "before-newline",
          "indent_empty_lines": false,
          "templating": ["auto"]
        }),
        Prism.languages.javascript, 'javascript');
      $("#sample-area").hide();
      $("#pre-code").removeClass("hide");
      $("#pre-code").addClass("show");
      $("#src-code").append(html);
      $("#src-code").show();
    });
});

