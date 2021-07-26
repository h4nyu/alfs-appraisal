import { Store } from "@sivic/core"
import Point from "."
import FindBoxFn from "@sivic/core/box/find"
import FilterFn from "./filter"
import DeleteFn from "./delete"

export type Fn = (payload:{
  boxId: string,
  points: Point[], 
}) => Promise<Point[] | Error>

export const Fn = (props:{
  store: Store
}):Fn => {
  const findBox = FindBoxFn(props)
  const filter = FilterFn(props)
  const delete_ = DeleteFn(props)
  return async (payload) => {
    const box = await findBox({id: payload.boxId})
    if(box instanceof Error) { return box }
    const oldPoints = await filter({boxId: payload.boxId})
    if(oldPoints instanceof Error) { return oldPoints }
    for(const op of oldPoints){
      const err = await props.store.point.delete({id: op.id})
      if(err instanceof Error) { return err }
    }
    const points = payload.points.map(x => Point({
      ...x,
      boxId: box.id
    }))
    for(const point of points){
      const err = await props.store.point.create(point)
      if(err instanceof Error) { return err }
    }
    return points
  }
}
export default Fn
