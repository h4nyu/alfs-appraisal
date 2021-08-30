import React from "react";
import TagTable from "./TagTable";
import { Tag } from "@sivic/core/tag"
import { Image } from "@sivic/core/image"
import Point from "@sivic/core/point"
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
    name: "あ",
    referenceBoxId: "b1",
  }),
  Tag({
    id: "t1",
    name: "い",
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
    imageId: "i0",
    tagId: "t0",
    fileId: "f0",
  }),
  Box({
    id: "b1",
    imageId: "i0",
    tagId: "t0",
    fileId: "f0",
  }),
  Box({
    id: "b2",
    imageId: "i1",
    fileId: "f0",
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
]

const points = [
  Point({
    id: "p0",
    boxId: "b0"
  }),
]
export const Primary = (args) => <TagTable 
  {...args}
  tags={tags}
  images={images}
  files={files}
  boxes={boxes}
  points={points}
/> 
