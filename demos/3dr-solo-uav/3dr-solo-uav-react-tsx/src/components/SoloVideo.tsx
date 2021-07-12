import * as React from "react";
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

import SosGetResultVideo from "osh-js/core/datasource/SosGetResultVideo.js";
import FFMPEGView from "osh-js/core/ui/view/video/FFMPEGView.js";
import DataLayer from "osh-js/core/ui/layer/DataLayer.js";

export class SoloVideoComponent extends React.PureComponent<any, any> {
  divId: string;
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
      // @ts-ignore
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
      // @ts-ignore
      name: "UAV Video",
      directPlay: true,
      showTime: true,
      showStats: true,
      // @ts-ignore
      dataSourceId: videoDataSource.id
    });

    // start streaming
    // @ts-ignore
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
          // @ts-ignore
        onStart={this.handleStart}
          // @ts-ignore
        onDrag={this.handleDrag}
          // @ts-ignore
        onStop={this.handleStop}>
        <div>
          <div className="handle" id={this.divId}> </div>
        </div>
      </Draggable>
    );
  }
}

