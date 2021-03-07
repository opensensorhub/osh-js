import * as React from "react";
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

import SosGetResultVideo from "osh/core/datasource/SosGetResultVideo.js";
import FFMPEGView from "osh/core/ui/view/video/FFMPEGView.js";
import DataLayer from "osh/core/ui/layer/DataLayer.js";

export class SoloVideoComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.divId = randomUUID();
    this.divId = 'video-container';
  }

  componentDidMount() {
    // setup video
    // create data source for UAV camera
    let videoDataSource = new SosGetResultVideo("drone-Video", {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      replaySpeed: 1
    });

    // show it in video view using FFMPEG JS decoder
    let videoView = new FFMPEGView({
      container: this.divId,
      css: "video-h264",
      name: "UAV Video",
      directPlay: true,
      showTime: true,
      showStats: true,
      dataSourceId: videoDataSource.id
    });

    // start streaming
    videoDataSource.connect();
  }

  render() {
    return (
      <Draggable
        handle=".handle"
        defaultPosition={{x: 0, y: 30}}
        position={null}
        grid={[1, 1]}
        bounds="parent"
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
          <div className="handle" id={this.divId}> </div>
        </div>
      </Draggable>
    );
  }
}

