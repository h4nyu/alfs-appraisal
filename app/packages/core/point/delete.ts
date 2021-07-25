import { Lock, ErrorKind, Store } from "@sivic/core";
import Point from ".";

export type Fn = (payload: {
  id?: string
}) => Promise<void | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload) => {
    const err = await props.store.point.delete(payload)
    if(err instanceof Error) { return err }
  }
}
export default Fn
