import React from "react";
import RefLineForm from ".";
import Line from '@sivic/core/line'
import Image from '@sivic/core/image'
import File from '@sivic/core/file'
import Point from '@sivic/core/point'
import annot from "/srv/data/annto.json";

const { imageData } = annot;

export default {
  title: "RefLineForm",
  component: RefLineForm,
};
const image = Image({
  fileId: 'f0',
})
const files = [
  File({
    id: 'f0',
    data: imageData,
  })
]
const points = [
  Point({ id: "p0", x: 20, y: 20, }),
  Point({ id: "p1", x: 10, y: 10, }),
  Point({ id: "p2", x: 40, y: 20, }),
  Point({ id: "p3", x: 10, y: 60, }),
  Point({ id: "p4", x: 30, y: 30, }),
  Point({ id: "p5", x: 35, y: 30, }),
]
export const Default = (props) => {
  return (
    <RefLineForm 
      {...props}
      image={image}
      files={files}
      points={points}
      lines={[]}
    />
  )
}

