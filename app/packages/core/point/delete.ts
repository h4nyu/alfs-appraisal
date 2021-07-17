import { Lock, ErrorKind, Store } from "@sivic/core";
import Point from ".";

export type Payload = {
  imageId:string
};
export type Fn = (payload: Payload) => Promise<void | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const err = await props.store.point.delete(payload)
    if(err instanceof Error) { return err }
  }
}
export default Fn
