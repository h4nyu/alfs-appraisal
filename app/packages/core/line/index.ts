import { v4 as uuid } from 'uuid';
import Point from '@sivic/core/point';

export type Line = {
  id: string
  start: Point,
  end: Point;
  priority: number;
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
  return {
    id,
    start,
    end,
    priority,
  }
}
export default Line
