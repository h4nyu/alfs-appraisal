import { v4 as uuid } from 'uuid';
import Point from '@sivic/core/point';
import { first, sortBy, uniq, range } from 'lodash';

export type Line = {
  id: string
  start: Point,
  end: Point;
  priority: number;
  radian: number; // getter
  length: number; // getter
}

export const Line  = (props?:{
  id?:string,
  start?: Point;
  end?: Point;
  boxId?: string;
  priority?: number;
}):Line => {
  const id = props?.id ?? uuid()
  const boxId = props?.boxId
  const start = props?.start ?? Point({boxId: boxId})
  const end = props?.end ?? Point({boxId: boxId})
  const priority = props?.priority ?? 0
  const getLength = () => {
    return Math.pow(Math.pow((self.end.y - self.start.y), 2) + Math.pow((self.end.x - self.start.x), 2), 1/2);
  }
  const getRadian = () => {
    return Math.atan((self.end.y - self.start.y) / (self.end.x - self.start.x));
  }
  const self = {
    id,
    start,
    end,
    priority,
    get radian() { return getRadian() },
    get length() { return getLength() },
  }
  return self
}

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

export const getRefLines = (props:{
  points: Point[],
}):Line[] => {
  const firstLine = getRefLine(props.points)
  if(!firstLine) { return [] }
  const points = props.points.filter(p => {
    return (
      !firstLine.start.posEquals(p) && !firstLine.end.posEquals(p)
    )
  })
  const secondLine = getRefLine(points)
  if(!secondLine) { return [firstLine] }
  return [firstLine, secondLine]
}
export default Line
