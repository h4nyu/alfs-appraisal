import { Store } from "@sivic/core"
import Point from "."
import FindBoxFn from "@sivic/core/box/find"
import FilterFn from "./filter"
import DeleteFn from "./delete"

export type Fn = (payload:{
  boxId: string,
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
  const findBox = FindBoxFn(props)
  const filter = FilterFn(props)
  const delete_ = DeleteFn(props)
  // const deletePoint = DeletePointFn(props)
  // const createPoint = CreatePointFn(props)
  return async (payload) => {
    const box = await findBox({id: payload.boxId})
    if(box instanceof Error) { return box }
    const oldPoints = await filter({boxId: payload.boxId})
    if(oldPoints instanceof Error) { return oldPoints }
    for(const op of oldPoints){
      const err = await props.store.point.delete({id: op.id})
      if(err instanceof Error) { return err }
    }
    // const deleteErr = await deletePoint({imageId: image.id})
    // if(deletePoint instanceof Error) { return deletePoint }
    // const points = payload.points.map(x => Point({
    //   ...x,
    //   imageId: image.id
    // }))
    // const createErr = await createPoint(points)
    // if(createPoint instanceof Error) { return createPoint }
    // return points
    return []
  }
}
export default Fn
