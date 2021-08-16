import React from "react";
import Component from "./";
import Point from "@sivic/core/point"
import { Workspace } from "@sivic/core/workspace";

export default {
  title: "PointTable",
  component: Component,
};

const points = [
  Point({
    serialNo: 1,
  }),
  Point({
    serialNo: 10,
  })
];
export const Primary = (args) => <Component {...args} points={points} />;
