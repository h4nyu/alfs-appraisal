import { Box } from "@sivic/core/box"
import { Store } from "@sivic/core"

export type Payload = Box[]
export type CreateFn = (payload:Payload) => Promise<Box[] | Error>
export const CreateFn = (props: {
  store:Store,
}):CreateFn => {
  return async (payload: Payload) => {
    const err = await props.store.box.load(payload)
    if(err instanceof Error) { return err }
    return payload
  }
}
export default CreateFn
