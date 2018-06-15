import React from "react";
import { Button, Box, Text, SpotifyLogo } from "./Styled";

export const WelcomeScreen = ({ onLogin }) => (
  <Box p={10}>
    <Text fontSize={16}>
      Hi!
      <br />
      Please, log in
    </Text>
    <Button onClick={onLogin}>{SpotifyLogo}</Button>
  </Box>
);

export default WelcomeScreen;
