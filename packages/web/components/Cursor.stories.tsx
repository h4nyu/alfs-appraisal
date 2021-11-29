import React from "react";
import Cursor from "./Cursor";


export default {
  title: "Cursor",
  component: Cursor,
};
export const Default = (props) => {
  return (
    <div 
      style={{
        width: 100,
      }}
    >
      <Cursor {...props} />
    </div>
  )
}
