import React from "react";
import TagTable from "./TagTable";
import { Tag } from "@sivic/core/tag"
import { Image } from "@sivic/core/image"
import annot from "/srv/data/annto.json";
import Box from "@sivic/core/box"
import { File } from "@sivic/core/file"


export default {
  title: "TagTable",
  component: TagTable,
};
const tags = [
  Tag({
    id: "t0",
    name: "あ"
  }),
  Tag({
    id: "t1",
    name: "い"
  }),
]

const files = [
  File({
    id: "f0",
    data: annot.imageData,
  })
]

const boxes = [
  Box({
    id: "b0",
    tagId: "t0",
  }),
  Box({
    id: "b1",
    tagId: "t1",
  }),
  Box({
    id: "b2",
  })
]
const images = [
  Image({
    id: "i0",
    name: "aaaa.png"
  }),
  Image({
    id: "i1",
    name: "bbb.jpg"
  }),
  Image({
    id: "c1",
    name: "croped-0",
    parentId: "i0",
    fileId: "f0",
    boxId: "b0",
  }),
  Image({
    id: "c2",
    name: "croped-0",
    parentId: "i0",
    fileId: "f0",
    boxId: "b1",
  }),
  Image({
    id: "c3",
    name: "croped-0",
    parentId: "i1",
    fileId: "f0",
    boxId: "b2",
  }),
]
export const Primary = (args) => <TagTable 
  {...args}
  tags={tags}
  images={images}
  files={files}
  boxes={boxes}
/> 
