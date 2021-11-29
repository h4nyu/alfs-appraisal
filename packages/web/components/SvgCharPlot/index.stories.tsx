import React from "react";
import Component from ".";
import { Box } from "@sivic/core/box";
import { Point } from "@sivic/core/point";
import Line from "@sivic/core/line";
import Tag from "@sivic/core/tag"
import annot from "/srv/data/annto.json";
import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';
import useBoxPlot from "@sivic/web/hooks/useBoxPlot"

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

const points = [
  Point({x: 30,  y: 80}),
]
  
const lines = [ Line({start: Point({x: 30, y: 40}), end: Point({x: 50, y: 60})}) ]

export const Primary = (args) => (
  <Component {...args} data={imageData} />
);

export const WithBoxes = () => {
  const { toggleDrag, move, boxes, dragId, add, remove } = useBoxPlot()
  return (
    <Component
      tags={tags}
      data={imageData}
      size={512}
      boxes={boxes}
      onMove={move}
      onAdd={add}
      selectedId={dragId}
      onSelect={toggleDrag}
      onDelete={remove}
    />
  )
};

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
