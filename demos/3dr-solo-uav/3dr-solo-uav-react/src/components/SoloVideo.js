import * as React from "react";
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

import VideoH264 from "osh/datareceiver/VideoH264";
import FFMPEGView from "osh/ui/view/video/FFMPEGView";

export class SoloVideoComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.divId = randomUUID();
    this.divId = 'video-container';
  }

  componentDidMount() {
    // setup video
    // create data source for UAV camera
    let videoDataSource = new VideoH264("drone-Video", {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: '2015-12-19T21:03:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      replaySpeed: 1
    });

    // show it in video view using FFMPEG JS decoder
    let videoView = new FFMPEGView(this.divId, {
      dataSourceId: videoDataSource.id,
      css: "video-h264",
      name: "UAV Video",
      useWorker: true,
      width: 1280,
      height: 720,
      framerate:25,
      showTime: true
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

