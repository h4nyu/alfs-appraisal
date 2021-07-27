import React from "react";
import Component from "./SvgCharPlot";
import { Box } from "@sivic/core/box";
import { Point } from "@sivic/core/point";
import Line from "@sivic/core/line";
import { Map } from "immutable";
import Tag from "@sivic/core/tag"
import annot from "/srv/data/annto.json";
import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';

const { imageData } = annot;

export default {
  title: "SvgCharPlot",
  component: Component,
};
const tags = [
  Tag({
    id: "t0",
    name: 'A',
  })
]
const boxes = [
  Box({x0: 10, y0: 10, x1: 20, y1: 20, tagId: "t0"}),  
]

const points = Map(
  [
    Point({x: 30,  y: 80}),
  ].map((x, i) => [`${i}`, x])
);
const lines = [ Line({x0: 30, y0: 40, x1: 50, y1: 60}) ]

export const Primary = (args) => (
  <Component {...args} data={imageData} />
);

export const WithBoxes = (args) => (
  <Component
    {...args}
    data={imageData}
    size={512}
    boxes={boxes}
    tags={tags}
  />
);

export const WithPoint = (args) => (
  <Component
    {...args}
    data={imageData}
    size={512}
    points={points}
  />
);

export const WithLines = (args) => (
  <Component
    {...args}
    data={imageData}
    size={512}
    points={points}
    lines={lines}
  />
);
