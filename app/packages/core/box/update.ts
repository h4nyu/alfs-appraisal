import { Box } from "@sivic/core/box"
import { Store } from "@sivic/core"
import DeleteFn from "./delete"
import CreateFileFn from "@sivic/core/file/create"
import FindFileFn from "@sivic/core/file/find"
import FindImageFn from "@sivic/core/image/find"
import FilterFn from "./filter"

export type Fn = (payload:Box) => Promise<Box | Error>
export const Fn = (props: {
  store:Store,
}):Fn => {
  return async (payload) => {
    const updateErr = await props.store.box.update(payload)
    if(updateErr instanceof Error) { return updateErr }
    return payload
  }
}
export default Fn
