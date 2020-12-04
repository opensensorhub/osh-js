#!/bin/bash

rm build/*.js

uglifyjs \
	src/js/common/jhashtable.js \
	src/js/common/leaflet.rotatedMarker.js \
        src/js/osh/osh.js \
        src/js/osh/osh-sync-buffer.js \
        src/js/osh/osh-controller.js \
        src/js/osh/osh-leaflet-marker.js \
        src/js/osh/osh-timestamp-parser.js \
        src/js/osh/Leaflet.SOS.js \
-o build/Leaflet.SOS.min.js
