import { v4 as uuid } from 'uuid';

export type Line = {
  id: string
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export const Line  = (props?:{
  id?:string,
  x0?:number,
  y0?:number,
  x1?:number,
  y1?:number,
}):Line => {
  const id = props?.id ?? uuid()
  const x0 = props?.x0 ?? 0
  const y0 = props?.y0 ?? 0
  const x1 = props?.x1 ?? 0
  const y1 = props?.y1 ?? 0
  return {
    id,
    x0,
    y0,
    x1,
    y1,
  }
}
export default Line
