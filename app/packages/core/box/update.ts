import { Box } from "@sivic/core/box"
import { Store } from "@sivic/core"
import Image from "@sivic/core/image"
import File from "@sivic/core/file"
import DeleteFn from "./delete"
import CreateFn from "./create"

export type Fn = (payload:{
  box: Box,
  oldBox: Box,
  image?: Image,
  file?: File,
}) => Promise<Box | Error>
export const Fn = (props: {
  store:Store,
}):Fn => {
  const delete_ = DeleteFn(props)
  const create = CreateFn(props)
  return async (payload) => {
    if(payload.box.equals(payload.oldBox)){
      return payload.box
    }
    if(!payload.box.posEquals(payload.oldBox)){
      const deleteErr = await delete_(payload.box)
      if(deleteErr instanceof Error) { return deleteErr }
      const createdBox = await create(payload)
      if(createdBox instanceof Error) { return createdBox }
      return createdBox
    }else{
      const updateErr = await props.store.box.update(payload.box)
      if(updateErr instanceof Error) { return updateErr }
      return payload.box
    }
  }
}
export default Fn
