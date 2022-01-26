import Point, { normalizePoints } from "@alfs-appraisal/core/point"
import Line from "@alfs-appraisal/core/line"
import Box from "@alfs-appraisal/core/box"
import Summary from "@alfs-appraisal/core/summary"
import { max } from "lodash"


export const useSummaryPairs = (props: {
  boxes?: Box[],
  referenceLines?: Line[],
  points?: Point[],
}) => {
  const summaryPairs = props.referenceLines?.map(refLine => {
    const rows:Summary[] = []
    for(const box of props.boxes ??[]){
      let points = props.points?.filter(x => x.boxId === box.id) ?? []
      const shiftY = max(points.map(x => x.y)) ?? 0
      points = points.map(p => ({
        ...p,
        y: - p.y + shiftY,
      }))
      const start = points.find(p => p.positionId === refLine.start.positionId)
      const end = points.find(p => p.positionId === refLine.end.positionId)
      if(!start || !end){
        continue
      }
      const line = Line({
        start,
        end,
      })
      rows.push(Summary({
        box,
        line,
        points: normalizePoints({
          line,
          points,
        })
      }))
    }
    return rows
  }) ?? []
  return {
    summaryPairs
  }
}

export default useSummaryPairs
