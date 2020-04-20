import React from 'react';
import logo from './logo.svg';
import './App.css';
import BaseMap from "./components/BaseMap";
import {SoloVideoComponent} from "./components/SoloVideo";

function App() {
  return (
    <div className="App">
      <SoloVideoComponent/>
      <BaseMap/>
    </div>
  );
}

export default App;
