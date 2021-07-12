import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {SoloVideoComponent} from "./components/SoloVideo";
import BaseMap from "./components/BaseMap";

ReactDOM.render(
  <React.StrictMode>
      <SoloVideoComponent/>
      <BaseMap/>
  </React.StrictMode>,
  document.getElementById('root')
);
