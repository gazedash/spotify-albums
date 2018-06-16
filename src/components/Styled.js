import React from "react";
import styled from "styled-components";
import { space, width, fontSize, color, display } from "styled-system";

export const Button = styled.button`
  color: white;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

export const Input = styled.input`
  ${display};
`;

export const Tab = styled.div`
  > ${Input}:checked + label {
    color: #1db954;
  }
`;

export const TabRadio = props => (
  <Tab>
    <Input display={"none"} type="radio" {...props} />
    <Label htmlFor={props.label}>{props.label}</Label>
  </Tab>
);

export const Label = styled.label`
  cursor: pointer;
  ${space} ${fontSize}
color: #fff;
`;

export const SpotifyLogo = (
  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
    <path
      fill="#1db954"
      d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
    />
  </svg>
);

export const Box = styled.div`
  ${space}
  ${width}
  ${fontSize}
  ${color}
`;

export const Text = styled.h6`
    ${space}    
  ${fontSize}
  ${color}
`;

Text.defaultProps = {
  color: "#fff"
};
