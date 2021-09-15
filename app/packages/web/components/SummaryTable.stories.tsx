import React from "react";
import SummaryTable from "./SummaryTable"
import { Box } from "@sivic/core/box"
import { Point } from "@sivic/core/point"
import { Line } from "@sivic/core/line"
import { Tag } from "@sivic/core/tag"

export default {
  title: "SummaryTable",
  component: SummaryTable,
};
const rows = [
  {
    box: Box({id: "b0"}),
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
      />
  )
}

