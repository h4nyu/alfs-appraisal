import React from "react";
import Component from "./";
import Point from "@alfs-appraisal/core/point"
import { Workspace } from "@alfs-appraisal/core/workspace";

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
