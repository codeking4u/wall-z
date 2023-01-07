import React from "react";

import PlayGround from "./components/playground/playground.component";
import ToolBar from "./components/toolbar/toolbar.component";

import "./App.css";

function App() {
  return (
    <div className="App">
      <PlayGround />
      <ToolBar />
    </div>
  );
}

export default App;
