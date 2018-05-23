import React from "react";

export const Albums = ({ items = [] }) => (
  <div>
    {items.map(item => (
        <div>
            {JSON.stringify(item)}
        </div>
    ))}
  </div>
);

export default Albums;
