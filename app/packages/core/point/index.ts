import { v4 as uuid } from 'uuid';
export { default as FilterFn } from "./filter"
export { default as LoadFn } from "./load"
import { nanoid } from 'nanoid'
import colormap from 'colormap'


export const colors = colormap({
    colormap: 'hsv',
    nshades: 20,
    format: 'hex',
    alpha: 1
})

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
export default Point;
