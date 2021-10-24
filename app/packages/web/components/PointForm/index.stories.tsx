import React from "react"
import PointForm from ".";
import Box from "@sivic/core/box"
import { File } from "@sivic/core/file";
import { data as imageData } from "@sivic/web/data/image.json" 

export default {
  title: "PointForm",
  component: PointForm
};

const box = Box()
const file = File({
  data: imageData,
})
export const Default = () => {
  return (
    <PointForm 
      box={box}
      file={file}
    />
  )
}
