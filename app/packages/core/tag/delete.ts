import { Store } from "@sivic/core"
import FindFn from "./find"

export type Payload = {
  id: string;
};
export type Fn = (payload:Payload) => Promise<void | Error>
export const Fn = (props: {
  store: Store,
}) => {
  const find = FindFn(props)
  return async (payload: Payload) => {
    const tag = await find({id: payload.id})
    if(tag instanceof Error) { return tag }
    let err = await props.store.tag.delete({id:payload.id})
  }
}
export default Fn

