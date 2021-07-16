import { Store } from "@sivic/core"
import Point from "@sivic/core/point"
import FindFn from "./find"
import DeletePointFn from "@sivic/core/point/delete"
import CreatePointFn from "@sivic/core/point/create"

export type Fn = (payload:{
  imageId: string,
  points: {
    id: string
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  }[]
}) => Promise<Point[] | Error>

export const Fn = (props:{
  store: Store
}):Fn => {
  const find = FindFn(props)
  const deletePoint = DeletePointFn(props)
  const createPoint = CreatePointFn(props)
  return async (payload) => {
    const image = await find({id: payload.imageId})
    if(image instanceof Error) { return image }
    const deleteErr = await deletePoint({imageId: image.id})
    if(deletePoint instanceof Error) { return deletePoint }
    const points = payload.points.map(x => Point({
      ...x,
      imageId: image.id
    }))
    const createErr = await createPoint(points)
    if(createPoint instanceof Error) { return createPoint }
    return points
  }
}
export default Fn
