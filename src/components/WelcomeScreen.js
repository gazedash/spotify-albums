import React from "react";

export const WelcomeScreen = ({ onLogin }) => (
  <div>
    Hi, please log in
    <button onClick={onLogin}>log in</button>
  </div>
);

export default WelcomeScreen;
