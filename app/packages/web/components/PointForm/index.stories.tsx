import React from "react"
import PointForm from ".";
import Box from "@sivic/core/box"
import { File } from "@sivic/core/file";
import { data as imageData } from "@sivic/web/data/image.json" 
import Point from "@sivic/core/point"

export default {
  title: "PointForm",
  component: PointForm
};

const box = Box()
const file = File({
  data: imageData,
})
const points = [
  Point({
    x: 10,
    y: 10,
  })
]

export const Default = (props) => {
  return (
    <PointForm 
      {...props}
      box={box}
      file={file}
      points={points}
    />
  )
}
