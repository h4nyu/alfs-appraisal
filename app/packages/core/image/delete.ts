import { Store } from "@sivic/core"
import FindFn from "./find"
import DeleteBoxFn from "@sivic/core/box/delete"
import FilterBoxFn from "@sivic/core/box/filter"

export type Fn = (payload:{
  id: string;
}) => Promise<void | Error>
export const Fn = (props: {
  store: Store,
}):Fn => {
  const find = FindFn(props)
  const deleteBox = DeleteBoxFn(props)
  const filterBox = FilterBoxFn(props)
  return async (payload) => {
    const image = await find({id: payload.id})
    if(image instanceof Error) { return image }
    const boxes = await filterBox({imageId: image.id})
    if(boxes instanceof Error) { return boxes }
    for( const b of boxes) { 
      const err = await deleteBox({ id: b.id})
      if(err instanceof Error) { return err }
    }
    let err = await props.store.image.delete({id:payload.id})
    if(err instanceof Error) { return err }
    err = await props.store.file.delete({id:image.fileId})
    if(err instanceof Error) { return err }
  }
}
export default Fn
