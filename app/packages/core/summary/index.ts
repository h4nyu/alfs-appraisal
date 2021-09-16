import Box from '@sivic/core/box';
import { Point } from "@sivic/core/point"
import { Line } from "@sivic/core/line"

export type Summary = {
  box:Box,
  points: Point[],
  line: Line,
}
export const Summary = (props: {
  box?:Box,
  points?: Point[],
  line?: Line,
}) => {
  const box = props.box ?? Box()
  const points = props.points ?? []
  const line = props.line ?? Line()
  return {
    box,
    points,
    line,
  }
}
export default Summary
