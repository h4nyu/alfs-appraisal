import React from "react"
import { keyBy, zip, uniqBy } from "lodash";
import Line from "@sivic/core/line"
import Point from "@sivic/core/point"

export const useLinePlot = (props?: {
  points?: Point[],
  lines?: Line[]
  draggingId?: string
}) => {
  const [lines, setLines] = React.useState<Line[]>(props?.lines ?? [])
  const [startPoint, setStartPoint] = React.useState<Point|undefined>(undefined)
  const points = props?.points ?? []
  const selectPoint = (pointId: string) => {
    const point = points?.find(x => x.id === pointId)
    if(!point) { return }
    const matchedLine = lines.find(line => {
      return (line.start.id === point.id) || (line.end.id === point.id)
    })
    if(matchedLine) {
      setLines(
        lines.filter(x => x.id !== matchedLine.id)
      )
      setStartPoint(undefined)
      return
    }
    if(startPoint === undefined && lines.length < 2){
      setStartPoint(point)
      return
    }
    if(startPoint !== undefined
       && !startPoint.posEquals(point)
      ) {
        const newLines = [
          ...lines,
          Line({
            start:startPoint,
            end:point,
          })
        ]
        setLines(newLines)
        setStartPoint(undefined)
      }
  }
  return {
    lines,
    startPoint,
    selectPoint,
  }
}
export default useLinePlot

