import { Store } from "@alfs-appraisal/core"
import FindFn from "./find"
import Box from "@alfs-appraisal/core/box"
import FilterBoxFn from "@alfs-appraisal/core/box/filter"
import UpdateBoxFn from "@alfs-appraisal/core/box/update"

export type Payload = {
  id: string;
};
export type Fn = (payload:Payload) => Promise<void | Error>
export const Fn = (props: {
  store: Store,
}) => {
  const find = FindFn(props)
  const filterBox = FilterBoxFn(props)
  const updateBox = UpdateBoxFn(props)
  return async (payload: Payload) => {
    const tag = await find({id: payload.id})
    if(tag instanceof Error) { return tag }
    const boxes = await filterBox({tagId: payload.id})
    if(boxes instanceof Error) { return boxes }
    for(const b of boxes){
      const err = await updateBox({
        box: Box({...b, tagId: undefined}),
        oldBox: b
      })
      if(err instanceof Error) { return err }
    }
    let err = await props.store.tag.delete({id:payload.id})
  }
}
export default Fn
