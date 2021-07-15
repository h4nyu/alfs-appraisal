import { Store } from "@sivic/core"
import FindFn from "./find"
import DeleteBoxFn from "@sivic/core/box/delete"

export type Payload = {
  id: string;
};
export type DeleteFn = (payload:Payload) => Promise<void | Error>
export const DeleteFn = (props: {
  store: Store,
}) => {
  const find = FindFn(props)
  const deleteBox = DeleteBoxFn(props)
  return async (payload: Payload) => {
    const image = await find({id: payload.id})
    if(image instanceof Error) { return image }
    let err = await props.store.image.delete({id:payload.id})
    if(err instanceof Error) { return err }
    err = await props.store.file.delete({id:image.fileId})
    if(err instanceof Error) { return err }
    err = await deleteBox({imageId:image.id})
    if(err instanceof Error) { return err }
  }
}
export default DeleteFn
