import React from "react"
import PointForm from ".";
import Box from "@alfs-appraisal/core/box"
import { File } from "@alfs-appraisal/core/file";
import { data as imageData } from "@alfs-appraisal/web/data/image.json" 
import Point from "@alfs-appraisal/core/point"

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
