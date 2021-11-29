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
    positionId: "aaa",
  }),
  Point({
    positionId: "bbb",
  }),
];
export const Primary = (args) => <Component {...args} points={points} />;
