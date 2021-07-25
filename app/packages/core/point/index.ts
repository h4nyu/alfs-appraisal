import { v4 as uuid } from 'uuid';
export { default as FilterFn } from "./filter"

export type Point = {
  id: string;
  x: number;
  y: number;
  boxId?: string;
  equals: (other:Point) => boolean;
};

export const Point = (props?: {
  id?: string;
  x?: number;
  y?: number,
  boxId?: string,
}): Point => {
  const id = props?.id ?? uuid()
  const boxId = props?.boxId
  const x = props?.x ?? 0
  const y = props?.y ?? 0
  const equals = (other: Point): boolean => {
    return (
      self.x === other.x && self.y === other.y
    )
  }
  const self = {
    id,
    x,
    y,
    boxId,
    equals,
  }
  return self
};
export default Point;
