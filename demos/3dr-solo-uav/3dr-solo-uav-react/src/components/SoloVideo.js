import * as React from "react";
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

import FFMPEGView from "osh/core/ui/view/video/FFMPEGView.js";
import VideoDataLayer from "osh/core/ui/layer/VideoDataLayer";

export class SoloVideoComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.divId = randomUUID();
    this.divId = 'video-container';
    this.videoDataSource = props.videoDataSource;
  }

  componentDidMount() {
    // setup video

    // show it in video view using FFMPEG JS decoder
    let videoView = new FFMPEGView({
      container: this.divId,
      css: "video-h264",
      name: "UAV Video",
      directPlay: true,
      showTime: true,
      showStats: true,
      layers: [
        new VideoDataLayer({
          dataSourceId: this.videoDataSource.id,
          getFrameData: (rec) => rec.videoFrame,
          getTimestamp: (rec) => rec.timestamp
        })
      ]
    });

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

