import React from "react";
import Component from "./";
import Mock from "@sivic/web/components/Mock";

export default {
  title: "Modal",
  component: Component,
  args: {
    isActive: true,
  },
};

export const Default = (args) => <Component {...args} >
  <Mock 
    name={"400x300"}
    style={{
      height: 300,
      width: 400,
    }}
  />
</Component>;
