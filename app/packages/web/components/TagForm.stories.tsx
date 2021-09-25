import React from "react";
import TagForm from "./TagForm";
import Tag from "@sivic/core/tag"
import Box from "@sivic/core/box"
import { range } from "lodash"
import File from "@sivic/core/file";
import { data as imageData } from "@sivic/web/data/image.json" 


export default {
  title: "TagForm",
  component: TagForm,
};
const tag = Tag()
const files = [
  File({
    id: "f0",
    data: imageData,
  })
]

const boxes = range(10).map(x => Box({fileId: "f0", tagId: tag.id}))
export const Primary = (args) => <TagForm 
  {...args}
  {...tag}
  files={files}
  boxes={boxes}
/> 
