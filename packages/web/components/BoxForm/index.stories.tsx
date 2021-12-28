import React from "react";
import BoxForm from ".";
import Box from "@alfs-appraisal/core/box";
import Point from "@alfs-appraisal/core/point";
import Tag from "@alfs-appraisal/core/tag";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { Image } from "@alfs-appraisal/core/image";
import { File } from "@alfs-appraisal/core/file";
import { Workspace } from "@alfs-appraisal/core/workspace";
import { range } from "lodash";

import { data as imageData } from "@alfs-appraisal/web/data/image.json" 

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
const image = Image({name:'aaaa.png'})

export const Default = (props) => {
  return (
    <BoxForm 
      {...props}
      image={image}
      boxes={boxes}
      file={file}
    />
  )
}
