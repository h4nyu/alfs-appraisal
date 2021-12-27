import React from "react";
import AssignTagForm from "./AssignTagForm";
import Mock from "@alfs-appraisal/web/components/Mock";
import Box from "@alfs-appraisal/core/box"
import Tag from "@alfs-appraisal/core/tag"
import File from "@alfs-appraisal/core/file";
import { Workspace } from "@alfs-appraisal/core/workspace";
import { range, take } from "lodash"

import { data as imageData } from "@alfs-appraisal/web/data/image.json" 

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

