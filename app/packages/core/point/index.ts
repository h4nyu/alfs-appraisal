import { v4 as uuid } from 'uuid';
export { default as FilterFn } from "./filter"
export { default as LoadFn } from "./load"
import { nanoid } from 'nanoid'
import Line from '@sivic/core/line'

export type Position2D = {
  x: number,
  y: number,
}

export type Point = {
  id: string;
  boxId?: string;
  positionId?: string;
  posEquals: (other:Point) => boolean;
} & Position2D;

export const Point = (props?: {
  id?: string;
  x?: number;
  y?: number,
  positionId?: string,
  boxId?: string,
}): Point => {
  const id = props?.id ?? uuid()
  const boxId = props?.boxId
  const x = props?.x ?? 0
  const y = props?.y ?? 0
  const positionId = props?.positionId ?? nanoid(5)
  const equals = (other: Point): boolean => {
    return JSON.stringify(self) === JSON.stringify(other)
  }
  const posEquals = (other: Point): boolean => {
    return (
      self.x === other.x && self.y === other.y
    )
  }
  const self = {
    id,
    x,
    y,
    boxId,
    positionId,
    equals,
    posEquals,
  }
  return self
};

export type ResizeFn = (a:Point) => Point
export const ResizeFn = (props:{
  source: {height: number, width: number},
  target: {height: number, width: number},
}):ResizeFn => {
  return (point) => {
    const {x, y} = point
    return Point({
      ...point,
      x: props.target.width * x / props.source.width,
      y: props.target.height * y / props.source.height,
    })
  }
}

export const rotate = (props: {point: Point, originPoint:Point, radian:number}):Point => {
    const { point, originPoint, radian } = props;
    const x = Math.cos(radian) * (point.x- originPoint.x) - Math.sin(radian) * (point.y - originPoint.x) + originPoint.x
    const y = Math.sin(radian) * (point.x-originPoint.x) + Math.cos(radian) * (point.y- originPoint.y) + originPoint.y 
    return Point({ ...point, x, y })
}

export const shift = (props: {point: Point, diff:{x:number, y:number}}):Point => {
    const { point, diff } = props;
    return Point({ ...point, x:point.x + diff.x, y:point.y + diff.y})
}

export const normalizePoints = (props:{
  readonly points:Point[],
  readonly line:Line,
}) => {
  const originPoint = props.line.origin
  const lineRadian = props.line.radian
  console.log(lineRadian / Math.PI * 180)
  console.log(lineRadian)
  const radian = (lineRadian > 0) ? Math.PI / 2 - lineRadian : lineRadian + Math.PI / 2
  console.log(radian / Math.PI * 180)
  return props.points.map(point => {
    const shifted = shift({point, diff: { x:-originPoint.x, y:-originPoint.y}})
    console.log(shifted)
    return rotate({point:shifted, originPoint:Point({...shifted, x:0, y:0}), radian})
  })
}

export default Point;
