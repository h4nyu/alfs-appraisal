import { Lock, ErrorKind, Store } from "@sivic/core";
import Point from ".";

export type Payload = Point[];
export type Fn = (payload: Payload) => Promise<Point[] | Error>
export const Fn = (props: {
  store: Store;
}) => {
  return async (payload: Payload) => {
    const err = await props.store.point.load(payload)
    if(err instanceof Error) { return err }
    return payload
  }
}
export default Fn
