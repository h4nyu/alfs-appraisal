import React from "react";
import Component from "./CharPlot";
import { Box } from "@alfs-appraisal/core/box"
import annot from "/app/data/annto.json";

const { imageData } = annot;

export default {
  title: "CharPlot",
  component: Component,
};

const boxes = [
  Box({ 
    x0: 10, y0: 10, x1: 50, y1: 50 
  }),

  Box({ 
    x0: 30, y0: 30, x1: 70, y1: 70 
  }),
]
export const Primary = (args) => (
  <Component
    {...args}
    selectedId={"1"}
    data={imageData}
    boxes={boxes}
  />
);

export const FitToDiv = (args) => (
  <div
    style={{
      height:30,
      width:50,
      overflow: "auto",
    }}
  >
    <Component
      {...args}
      selectedId={"1"}
      data={imageData}
      boxes={boxes}
      style={{
        width: "100%",
      }}
    />
  </div>
);
