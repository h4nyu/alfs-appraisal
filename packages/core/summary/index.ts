import Box from '@alfs-appraisal/core/box';
import { Point } from "@alfs-appraisal/core/point"
import { Line } from "@alfs-appraisal/core/line"

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
