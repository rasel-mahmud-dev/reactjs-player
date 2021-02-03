import React from "react";
import "./App.scss";
import v1 from "../src/videos/Be_khudi_mein_Sanam_singer_by_satyajeet_jena(360p).mp4";

import Player from "./components/Player/Player";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Player src={v1} />
      </div>
    );
  }
}

export default App;
