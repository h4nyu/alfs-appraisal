import React from "react";
import AssignTagForm from "./AssignTagForm";
import Mock from "@sivic/web/components/Mock";
import Box from "@sivic/core/box"
import Tag from "@sivic/core/tag"
import File from "@sivic/core/file";
import { Workspace } from "@sivic/core/workspace";
import { range, take } from "lodash"

import { data as imageData } from "@sivic/web/data/image.json" 

export default {
  title: "AssignTagForm",
  component: AssignTagForm,
};
const tags = [
  Tag({
    id: "t0",
    name: "A"
  }),
  Tag({
    id: "t1",
    name: "B"
  }),
]

const files = [
  File({
    id: "f0",
    data: imageData,
  })
]

const boxes = [
  ...range(100).map(i => {
    return Box({fileId: "f0", tagId:"t0"})
  }),
  ...range(100).map(i => {
    return Box({fileId: "f0"})
  }),
]

export const Primary = (args) => {
  return (
    <AssignTagForm 
      {...args} 
      boxes={boxes}
      tags={tags}
      files={files}
      selectedBoxIds={
        take(boxes, 10).map(x => x.id)
      }
    />
  )
}

