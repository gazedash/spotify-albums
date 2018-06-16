import React from "react";
import { Box, Text } from "./Styled";

export const Albums = ({ items = [] }) => (
  <Box>
    {items.length && <Text color="#1db954">Success</Text>}
    {items.map(item => <Box>{/* {JSON.stringify(item)} */}</Box>)}
  </Box>
);

export default Albums;
