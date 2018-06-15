import React from "react";
import { Button, Box, Text, SpotifyLogo } from "./Styled";

export const WelcomeScreen = ({ onLogin }) => (
  <Box py={10} px={40}>
    <Text fontSize={16} color={"#1db954"}>
      Hi!
      <br />
      <Text>Please, log in</Text>
    </Text>
    <Button onClick={onLogin}>{SpotifyLogo}</Button>
  </Box>
);

export default WelcomeScreen;
