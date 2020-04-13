import * as React from "react";
import {EllipsoidTerrainProvider, Viewer} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    this.cesiumContainer =  React.createRef();
  }
  componentDidMount() {
    if (this.cesiumContainer.current) {
      this.cesiumContainer.current.id = "container";
      var viewer = new Viewer(this.cesiumContainer.current.id);
    }
  }

  render() {
    const mystyle = {
      width: "100%",
      height: "100%",
    };
    return <div ref={this.cesiumContainer} style={mystyle}></div>;
  }
}

export default BaseMap;
