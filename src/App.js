import React, { Component } from "react";
import { Box } from './components/Styled';
import WelcomeScreen from "./components/WelcomeScreen";
import Form from "./components/Form";
import Albums from "./components/Albums";
import * as api from "./api";
import auth from "./api/auth";
import { withState, withProps, lifecycle, compose, withHandlers } from 'recompose';

const App = ({ albums, isLoggedIn, onLogin, createPlaylist = () => { } }) =>
  !isLoggedIn ?
    <WelcomeScreen onLogin={onLogin} /> :
    <Box py={10} px={40}>
      <Form onSubmit={createPlaylist} />
      <Albums items={albums} />
    </Box>

export default compose(
  withState('albums', 'updateAlbums', []),
  withState('isLoggedIn', 'setLoggedIn', false),
  withHandlers({
    createPlaylist: props => async form => {
      const albums = await api.createPlaylist(form);
      props.updateAlbums(albums);
    },
    checkLogin: props => async () => {
      const isLoggedIn = await api.checkLogin();
      props.setLoggedIn({ isLoggedIn });
    }
  }),
  withHandlers({
    // because of 'this' I had to separate withHandlers in two functions
    // I couldn't access this.props.checkLogin
    onLogin: (props) => () => { 
      auth.login()
        .then(async () => await props.checkLogin());
    },
  }),
  lifecycle({
    componentDidMount() {
      auth.redirected();
      this.props.checkLogin();
    }
  })
)(App);
