import React from "react";
import TagTable from "./TagTable";
import { Tag } from "@alfs-appraisal/core/tag"
import { Image } from "@alfs-appraisal/core/image"
import Point from "@alfs-appraisal/core/point"
import annot from "/app/data/annto.json";
import Box from "@alfs-appraisal/core/box"
import { File } from "@alfs-appraisal/core/file"


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
