import { v4 as uuid } from 'uuid';
export { default as FilterFn } from "./filter"
export { default as LoadFn } from "./load"
import { nanoid } from 'nanoid'
import Line from '@sivic/core/line'


export type Point = {
  id: string;
  x: number;
  y: number;
  boxId?: string;
  positionId?: string;
  posEquals: (other:Point) => boolean;
};

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

export const rotatePoint = (props: {point: Point, originPoint:Point, radian:number}):Point => {
    const { point, originPoint, radian } = props;
    const x = Math.cos(radian) * (point.x- originPoint.x) - Math.sin(radian) * (point.y - originPoint.x) + originPoint.x
    const y = Math.sin(radian) * (point.x-originPoint.x) + Math.cos(radian) * (point.y- originPoint.y) + originPoint.y 
    return Point({ ...point, x, y })
}

export const normalizePoints = (props:{
  readonly points:Point[],
  readonly line:Line,
}) => {
  const originPoint = props.line.start
  const radian = props.line.radian
  const rotate = (point) => rotatePoint({point, originPoint, radian})
  return props.points.map(rotate)
}

export default Point;
