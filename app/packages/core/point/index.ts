import { v4 as uuid } from 'uuid';
export { default as FilterFn } from "./filter"
export { default as LoadFn } from "./load"
import colormap from 'colormap'


const colors = colormap({
    colormap: 'jet',
    nshades: 50,
    format: 'hex',
    alpha: 1
})

export type Point = {
  id: string;
  x: number;
  y: number;
  boxId?: string;
  serialNo?: number;
  color?: string;
  posEquals: (other:Point) => boolean;
};

export const Point = (props?: {
  id?: string;
  x?: number;
  y?: number,
  serialNo?: number,
  boxId?: string,
}): Point => {
  const id = props?.id ?? uuid()
  const boxId = props?.boxId
  const x = props?.x ?? 0
  const y = props?.y ?? 0
  const serialNo = props?.serialNo
  const equals = (other: Point): boolean => {
    return JSON.stringify(self) === JSON.stringify(other)
  }
  const posEquals = (other: Point): boolean => {
    return (
      self.x === other.x && self.y === other.y
    )
  }
  const getColor = () => {
    if(self.serialNo === undefined) { return }
    const idx  = self.serialNo % colors.length 
    return colors[idx]
  }
  const self = {
    id,
    x,
    y,
    boxId,
    serialNo,
    equals,
    get color() { return getColor() },
    posEquals,
  }
  return self
};
export default Point;
