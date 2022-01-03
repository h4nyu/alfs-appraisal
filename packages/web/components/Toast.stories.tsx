import React from "react";
import Toast from "./Toast";
import {Level} from "./Toast";

export default {
  title: "Toast",
  component: Toast,
};

export const Primary = (args) =>( 
  <div>
    <Toast {...args} level= {Level.Info}/> 
  </div>
)
