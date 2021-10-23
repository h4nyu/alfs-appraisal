import { Lock, ErrorKind, Store } from "@sivic/core";
import Line from ".";

export type Payload = {
  boxId: string;
};
export type Fn = (payload: Payload) => Promise<Line[] | Error>
export const Fn = (props: {
  store: Store;
}) => {
  return async (payload: Payload) => {
    const lines = await props.store.line.filter(payload)
    if(lines instanceof Error) { return lines }
    return lines
  }
}
export default Fn

