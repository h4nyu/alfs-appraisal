import React from "react";
import BoxForm from ".";
import Box from "@sivic/core/box";
import Point from "@sivic/core/point";
import Tag from "@sivic/core/tag";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { Image } from "@sivic/core/image";
import { File } from "@sivic/core/file";
import { Workspace } from "@sivic/core/workspace";
import { range } from "lodash";

import { data as imageData } from "@sivic/web/data/image.json" 

export default {
  title: "BoxForm",
  component: BoxForm
};
const file = File({
  id: "f0",
  data: imageData,
})
const boxes = [
  Box({
    x0: 5,
    y0: 5,
    x1: 10,
    y1: 10
  })
]

export const Default = (props) => {
  return (
    <BoxForm 
      {...props}
      name={"imageName"}
      boxes={boxes}
      file={file}
    />
  )
}
