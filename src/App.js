import React, { Component } from "react";
import { Box } from './components/Styled'; 
import WelcomeScreen from "./components/WelcomeScreen";
import Form from "./components/Form";
import Albums from "./components/Albums";
import * as api from "./api";
import auth from "./api/auth";

class App extends Component {
  state = {
    albums: [],
    isLoggedIn: false
  };
  createPlaylist = async form => {
    const albums = await api.createPlaylist(form);
    this.setState({
      albums
    });
  };

  componentDidMount() {
    auth.redirected();
    this._componentDidMount();
  }

  login = () => {
    const win = auth.openLogin();
    auth
      .windowClosedPromise(win)
      .then(async () => await this._componentDidMount());
  };

  async _componentDidMount() {
    const isLoggedIn = await api.checkLogin();
    this.setState({ isLoggedIn });
  }

  render() {
    const { albums, isLoggedIn } = this.state;

    if (!isLoggedIn) {
      return <WelcomeScreen onLogin={this.login} />;
    }

    return (
      <Box p={10}>
        <Form onSubmit={this.createPlaylist} />
        <Albums items={albums} />
      </Box>
    );
  }
}

export default App;
