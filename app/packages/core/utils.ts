import { range, values, uniq, first, sortBy  } from 'lodash'
import Point from "@sivic/core/point"
import Line from "@sivic/core/line"


const combinations = (size0:number, size1:number) =>  {
  const souceIds = range(size0)
  const targetIds = range(size1)
  let res: [number, number][] = []
  for (const s of souceIds){
    for (const t of targetIds){
      res.push([s, t])
    }
  }
  return uniq(res)
}


export const getRefLine = (points: readonly Point[]): undefined | Line =>
{
  let preDistance = 0
  const combPaints = combinations(points.length, points.length)
  .filter( x => x[0] !== x[1])
  .map(x => {
    return [points[x[0]], points[x[1]]]
  })
  .map(p => {
    return [ p, Math.sqrt( Math.pow( p[1].x -p[0].x, 2 ) + Math.pow( p[1].y -p[0].y, 2 ))]
  })
  const line = first(sortBy(combPaints, x => - x[1]).map(
    p => Line({
      start: p[0][0],
      end: p[0][1],
    })
  ))
  return line
}

export const rotatePoint = (point: Point, originPoint:Point, angle:number):Point => {
    angle = angle * Math.PI / 180.0;
    const x = Math.cos(angle) * (point.x- originPoint.x) - Math.sin(angle) * (point.y - originPoint.x) + originPoint.x
    const y = Math.sin(angle) * (point.x-originPoint.x) + Math.cos(angle) * (point.y- originPoint.y) + originPoint.y 
    return Point({ ...point, x, y })
}
