import React, { Component } from "react";
import { Box, Text } from "./components/Styled";
import WelcomeScreen from "./components/WelcomeScreen";
import Form from "./components/Form";
import Albums from "./components/Albums";
import * as api from "./api";
import auth from "./api/auth";
import { withState, lifecycle, compose, withHandlers } from "recompose";

const wrapWith = WrapperComponent => BaseComponent => (
  children,
  ...restProps
) => (
  <WrapperComponent>
    <BaseComponent {...restProps}>{children}</BaseComponent>
  </WrapperComponent>
);

const AppWrap = props => (
  <Box py={10} px={40}>
    {props.children}
    <a
      style={{
        position: "fixed",
        bottom: 0,
        textDecoration: "none"
      }}
      href="https://github.com/gazedash/spotify-albums"
    >
      <Text>GitHub</Text>
    </a>
  </Box>
);

const App = ({ albums, isLoggedIn, onLogin, createPlaylist = () => {} }) =>
  !isLoggedIn ? (
    <WelcomeScreen onLogin={onLogin} />
  ) : (
    <Box>
      <Form onSubmit={createPlaylist} />
      <Albums items={albums} />
    </Box>
  );

export default compose(
  wrapWith(AppWrap),
  withState("albums", "updateAlbums", []),
  withState("isLoggedIn", "setLoggedIn", false),
  withHandlers({
    createPlaylist: props => async form => {
      const albums = await api.createPlaylist(form);
      props.updateAlbums(albums);
    },
    checkLogin: props => async () => {
      const isLoggedIn = await api.checkLogin();
      props.setLoggedIn(isLoggedIn);
    }
  }),
  withHandlers({
    // because of 'this' I had to separate withHandlers in two functions
    // I couldn't access this.props.checkLogin
    onLogin: props => () => {
      auth.login().then(async () => await props.checkLogin());
    }
  }),
  lifecycle({
    componentDidMount() {
      auth.redirected();
      this.props.checkLogin();
    }
  })
)(App);
