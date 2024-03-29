import React from "react";
import SummaryTable from "./SummaryTable"
import { Box } from "@alfs-appraisal/core/box"
import { Point } from "@alfs-appraisal/core/point"
import { Line } from "@alfs-appraisal/core/line"
import { Tag } from "@alfs-appraisal/core/tag"
import { File } from "@alfs-appraisal/core/file";
import { data as imageData } from "@alfs-appraisal/web/data/image.json" 

export default {
  title: "SummaryTable",
  component: SummaryTable,
};
const files = [
  File({
    id: "f0",
    data: imageData,
  })
]

const rows = [
  {
    box: Box({id: "b0", fileId: "f0" }),
    points: [
      Point({x: 20, y: 30, positionId:"pos0"}),
      Point({x: 10, y: 30, positionId:"pos1"}),
    ],
    line: Line({
      start: Point({x: 20, y: 30}),
      end: Point({x: 20, y: 20}),
    }),
  },
  {
    box: Box({id: "b1"}),
    points: [
      Point({x: -20, y: 30, positionId:"pos0"}),
      Point({x: 11, y: -30, positionId:"pos1"}),
    ],
    line: Line(),
  },
]
const tag = Tag({name:"字"})
export const Default = (props) => {
  return (
    <SummaryTable 
      tag={tag}
      rows={rows}
      files={files}
    />
  )
}

