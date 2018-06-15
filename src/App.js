import React, { Component } from "react";
import { Box } from './components/Styled';
import WelcomeScreen from "./components/WelcomeScreen";
import Form from "./components/Form";
import Albums from "./components/Albums";
import * as api from "./api";
import auth from "./api/auth";
import { withState, withProps, lifecycle, compose } from 'recompose';

const App = ({ albums, isLoggedIn, onLogin, createPlaylist = () => { } }) =>
  !isLoggedIn ?
    <WelcomeScreen onLogin={onLogin} /> :
    <Box p={10}>
      <Form onSubmit={createPlaylist} />
      <Albums items={albums} />
    </Box>

export default compose(
  withState('albums', 'updateAlbums', []),
  withState('isLoggedIn', 'setLoggedIn', false),
  withProps(props => ({
    createPlaylist: async form => {
      const albums = await api.createPlaylist(form);
      props.updateAlbums(albums);
    },
    onLogin: () => {
      auth.login()
        .then(async () => await props.checkLogin());
    },
    checkLogin: async () => {
      const isLoggedIn = await api.checkLogin();
      console.log(isLoggedIn)
      props.setLoggedIn({ isLoggedIn });
    }
  })),
  lifecycle(({
    componentDidMount() {
      auth.redirected();
      this.props.checkLogin();
    }
  }))
)(App);
