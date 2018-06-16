import React from "react";
import { Button, Box, Text, SpotifyLogo } from "./Styled";

export const WelcomeScreen = ({ onLogin }) => (
  <Box>
    <Text fontSize={16} color={"#1db954"}>
      Hi!
      <br />
      <Text>
      This app allows to add all band albums to playlist on Spotify     
      <br />        
      <br />        

        Please, log in to continue</Text>
    </Text>
    <Button onClick={onLogin}>{SpotifyLogo}</Button>
  </Box>
);

export default WelcomeScreen;
