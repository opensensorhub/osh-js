import { randomUUID } from "../source/core/utils/Utils";

const Prism = require('prismjs');
const beautify = require('js-beautify').js;
var Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

var samples = [
    {
        name: "DataSource Synchronized",
        description: "Display the data of 3 differents kind of datasources(Video, Gps and Orientation) using time synchronization algorithm",
        url: "datasources-synchronized"
    },
    {
        name: "DataSource Audio",
        description: "Display the data using the audio datasource",
        url: "datasource-audio"
    },
    {
        name: "DataSource File",
        description: "Display the data of multiple CSV files using the file datasource",
        url: "datasource-file"
    },
    {
        name: "DataSource SweApiFetch",
        description: "Display GPS data using the SweApiFetch datasource",
        url: "datasource-sweapifetch"
    },
    {
        name: "DataSource SweApiFetch Json",
        description: "Display data using the SweApiFetch datasource in JSON format",
        url: "datasource-swejson"
    },
    {
        name: "DataSource Video",
        description: "Display the data using the audio datasource",
        url: "datasource-video"
    },
    {
        name: "DataSource Synchronized",
        description: "Display the data using the multiple datasources synchronized",
        url: "datasources-synchronized"
    },
    {
        name: "DataSource Synchronized and dynamic actions",
        description: "Display the data using the multiple datasources synchronized with connect/disconnect dynamic actions",
        url: "datasources-synchronized-dynamic"
    },
    {
        name: 'ISA Biological & MISB UAS sensor data using MQTT utility class',
        description: 'Display biological and GPS sensors from ISA Biological Sensor & MISB UAS using MQTT utility class',
        url: 'mqtt-utility'
    },
    {
        name: "Multiple Video DataSource Synchronized",
        description: "Display the data of 3 differents video datasources using time synchronization algorithm",
        url: "multi-datasources-synchronized"
    },
    {
        name: 'Switch between Replay & realtime using SOS or SWEAPI service',
        description: 'Switch between Replay & realtime using SOS or SWEAPI service',
        url: 'switch-realtime-batch'
    },
    {
        name: 'VueJs component: Multiple Video data with control',
        description: 'Display multiple videos data using forward/pause/play/backward control using the same DataSynchronizer',
        url: 'videodata-with-control-vuejs-synchronized',
        code: 'vue/App_examples/videodata-with-control-vuejs-synchronized.vue'
    },
    {
        name: 'Add/Remove DataSource(s) to/from DataSynchronizer',
        description: 'Add/Remove DataSource(s) to/from DataSynchronizer even if DataSynchronizer is running',
        url: 'datasynchronizer-dynamic-add-remove'
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
