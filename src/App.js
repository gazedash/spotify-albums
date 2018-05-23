import React, { Component } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import Form from "./components/Form";
import { createPlaylist } from "./api";

class App extends Component {
  render() {
    // const loggedIn = localStorage.loggedIn;

    // if (!loggedIn) {
    //   <WelcomeScreen />
    // }

    return (
      <div>
        <Form onSubmit={createPlaylist} />
      </div>
    );
  }
}

export default App;
