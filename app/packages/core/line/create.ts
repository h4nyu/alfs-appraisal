import { Lock, ErrorKind, Store } from "@sivic/core";
import Line from ".";

export type Payload = Line[];
export type Fn = (payload: Payload) => Promise<Line[] | Error>
export const Fn = (props: {
  store: Store;
}) => {
  return async (payload: Payload) => {
    // const err = await props.store.line.load(payload)
    // if(err instanceof Error) { return err }
    // return payload
  }
}
export default Fn

