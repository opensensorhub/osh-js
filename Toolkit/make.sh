#!/bin/bash
rm dist/* 

#closure-compiler   src/common/jhashtable.js   src/common/prototype.js   src/osh/osh-template.js   src/osh/osh-utils.js   src/osh/osh-Buffer.js   src/osh/osh-Controller.js   src/osh/datasource/osh-DataSourceConnector.js   src/osh/datasource/osh-DataSourceConnector-Websocket.js   src/osh/datasource/osh-DataSource.js   src/osh/datasource/osh-DataSource-mjpegvideo.js   src/osh/datasource/osh-DataSource-OrientationQuaternionDataSource.js   src/osh/datasource/osh-DataSource-LatLonAlt.js   src/osh/datasource/osh-DataSourceProvider.js   src/osh/ui/osh-UI-View.js   src/osh/ui/osh-UI-MJpegView.js   --js_output_file dist/osh-all.min.js   --compilation_level ADVANCED  
java -jar compiler.jar \
 src/common/jhashtable.js  \
 src/common/prototype.js  \
 src/common/broadway/Decoder.js  \
 src/common/broadway/YUVCanvas.js  \
 src/common/broadway/Player.js  \
 src/osh/osh-template.js \
 src/osh/osh-utils.js  \
 src/osh/osh-Buffer.js \
 src/osh/osh-Controller.js \
 src/osh/datasource/osh-DataSourceConnector.js \
 src/osh/datasource/osh-DataSourceConnector-Websocket.js \
 src/osh/datasource/osh-DataSource.js \
 src/osh/datasource/osh-DataSource-mjpegvideo.js \
 src/osh/datasource/osh-DataSource-mp4video.js \
 src/osh/datasource/osh-DataSource-h264video.js \
 src/osh/datasource/osh-DataSource-video.js \
 src/osh/datasource/osh-DataSource-OrientationQuaternionDataSource.js \
 src/osh/datasource/osh-DataSource-LatLonAlt.js \
 src/osh/datasource/osh-DataSource-ChartDataSource.js \
 src/osh/datasource/osh-DataSourceProvider.js \
 src/osh/ui/osh-UI-View.js \
 src/osh/ui/osh-UI-MJpegView.js \
 src/osh/ui/osh-UI-Mp4View.js \
 src/osh/ui/osh-UI-H264View.js \
 src/osh/ui/osh-UI-VideoView.js  --jscomp_off=suspiciousCode --jscomp_off=internetExplorerChecks --js_output_file dist/osh-all.min.js   --compilation_level SIMPLE  
