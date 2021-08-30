import React from "react";
import BoxView from "./BoxView";
import Box from "@sivic/core/box";
import Point from "@sivic/core/point";
import Tag from "@sivic/core/tag";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { Image } from "@sivic/core/image";
import { File } from "@sivic/core/file";
import { Workspace } from "@sivic/core/workspace";
import { range } from "lodash";

// @ts-ignore
import { data as imageData } from "@sivic/web/data/image.json" 

const workspace = Workspace({
  name: "WorkspaceName"
})

const files = [
  File({
    id: "f0",
    data: imageData,
  })
]
const image = Image({
  name: "ImageName",
  fileId: "f0",
})
const images = range(10).map(x => {
  return image
})

const box = Box({
  fileId: "f0",
}) 

const points = [
  Point({
    boxId: box.id,
  }) 
]

const tags = [
  Tag({
    id: "t0",
  }),
  Tag({
    id: "t1",
    referenceBoxId: box.id,
  })
]
export default {
  title: "BoxView",
  component: BoxView
};

export const Basic = (args) => (
  <BoxView 
    {...args} 
    box={box}
    workspace={workspace} 
    image={image} 
    boxImages={images}
    files={files}
    points={points}
    tags={tags}
  />
)


export const ReferenceBox = (args) => (
  <BoxView 
    {...args} 
    box={Box({...box, tagId:"t1"})}
    workspace={workspace} 
    image={image} 
    boxImages={images}
    files={files}
    points={points}
    tags={tags}
  />
)

export const FileNotFound = (args) => (
  <BoxView 
    {...args} 
    box={Box({...box, tagId:"t1"})}
    workspace={workspace} 
    image={image} 
    boxImages={images}
    points={points}
    tags={tags}
  />
)
