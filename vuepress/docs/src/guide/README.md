---
id: intro
title: Guide
sidebar_label: Introduction
slug: /
---

## What is it?

OpenSensorHub Web Client toolkit allows you to visualize data from OSH. It provides the necessary tools to build your own web application for monitoring your sensors. It is pure javascript framework and does not require third party libraries. A set of external libraries is also available to easily build some part of your views such as Leaflet, OpenLayer, Cesium, Chart.js etc..

It's an event based architecture suitable for real-time or playback. It allows one to make temporal synchronization or multiple data stream. It provides a styling overlay using configurable layers as well as an advanced support for video (H264/MJPEG). It has been designed to integrate any map engines such as Lealfet, OpenLayer or Cesium.

Moreover, it offers support for SOS & SPS services, discovery function, uses the HTTP or WebSocket API. Several modules already exist to allow one to setup quickly an application such as Orientation, DataSourceChart, Video, Map etc..

Please report all problems related to the SensorHub software including documentation errors via the GitHub Issue Tracker of the osh-js repository.


## Features
- Supports for data parsing:
    - Video data with codecs H265, H264, VP9, VP8
    - Any Swe generic JSON such as GPS, Quaternion etc.
    - Spectrogram, ImageDraping, Nexrad
- Supports for data Synchronization
- Supports WebSocket and HttpRequest Connector
- Supports SWE JSON generic requests:
    - GetCapabilities
    - GetFeatureOfInterest
    - GetResultTemplate
    - DescribeSensor
- Supports some dedicated visualizer:
    - OpenLayer, Leaflet or Cesium for Map data
    - FFMPeg for Video 
    - Chart
    - Spectrogram
- Supports for Vue.js components
