import { Box } from "@sivic/core/box"
import { Store } from "@sivic/core"

export type Payload = {
  id?: string;
  imageId?:string;
}
export type Fn = (payload:Payload) => Promise<void | Error>
export const Fn = (props: {
  store:Store,
}):Fn => {
  return async (payload: Payload) => {
    const err = await props.store.box.delete(payload)
    if(err instanceof Error) { return err }
  }
}
export default Fn
