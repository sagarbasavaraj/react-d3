import React, { useState } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//import PieChart from "./components/pie-chart/pie-chart";
//import BarChart from "./components/bar-chart/bar-chart";
//import ScalarChart from './components/scalar-chart/scalar-chart';
//import LineChart from "./components/line-chart/line-chart";
//import WorldMap from './components/world-map/worls-map';
import Slider from "./components/slider/slider";

function App() {
  const [value, setValue] = useState(5);
  const [value1, setValue1] = useState(0);
  return (
    <div className="App">
      {/*<PieChart />*/}
      {/*<BarChart />*/}
      <DndProvider backend={HTML5Backend}>
        <Slider min={1} max={1} step={1} value={value} onChange={setValue} type="slider1" />
        <Slider min={1} max={1} step={1} value={value1} onChange={setValue1} type="slider2"  />
      </DndProvider>

      {/*<LineChart />*/}
      {/*<WorldMap />*/}
    </div>
  );
}

export default App;
