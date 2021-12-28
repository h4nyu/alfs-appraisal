import { v4 as uuid } from 'uuid';
import Point, { Position2D } from '@alfs-appraisal/core/point';
import { first, sortBy, uniq, range } from 'lodash';

export { default as FilterFn } from "./filter"
export { default as LoadFn } from "./load"


export type Line = {
  id: string
  boxId?: string;
  start: Point,
  end: Point;
  radian: number; // getter
  length: number; // getter
  origin: Point; // getter
}

export type LineProps = {
  id:string,
  boxId:string,
  start: Pick<Point, "id" | "x" | "y" | "positionId">;
  end: Pick<Point, "id" | "x" | "y" | "positionId">;
}
export const Line  = (props?:Partial<LineProps>):Line => {
  const id = props?.id ?? uuid()
  const boxId = props?.boxId 
  const start = Point({...props?.start, boxId: boxId, })
  const end = Point({...props?.end, boxId: boxId, })
  const getLength = () => {
    return Math.pow(Math.pow((self.end.y - self.start.y), 2) + Math.pow((self.end.x - self.start.x), 2), 1/2);
  }
  const getRadian = () => {
    return Math.atan((self.end.y - self.start.y) / (self.end.x - self.start.x));
  }
  const getOrigin = () => {
    if(self.end.y > self.start.y){
      return self.start
    }else{
      return self.end
    }
  }
  const self = {
    id,
    boxId,
    start,
    end,
    get radian() { return getRadian() },
    get length() { return getLength() },
    get origin() { return getOrigin() },
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
