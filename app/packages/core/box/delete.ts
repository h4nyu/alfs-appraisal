import { Box } from "@sivic/core/box"
import { Store } from "@sivic/core"
import FindFn from "./find"
import DeleteFileFn from "@sivic/core/file/delete"

export type Fn = (payload:{
  id?: string;
  box?: Box
}) => Promise<void | Error>
export const Fn = (props: {
  store:Store,
}):Fn => {
  const find = FindFn(props)
  const deleteFile = DeleteFileFn(props)
  return async (payload) => {
    const box = payload.box ?? await find({ id: payload.id })
    if(box instanceof Error) { return box }
    let err = await props.store.box.delete({id: box.id})
    if(err instanceof Error) { return err }
    if(box.fileId){
      err = await deleteFile({id: box.fileId})
      if(err instanceof Error) { return err }
    }
  }
}
export default Fn
