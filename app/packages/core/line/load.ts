import { Lock, ErrorKind, Store } from "@sivic/core";
import Line, { LineProps } from ".";

export type Payload = {
  boxId: string;
  lines: Pick<LineProps, "id"|"start"|"end">[]
};
export type Fn = (payload: Payload) => Promise<Line[] | Error>
export const Fn = (props: {
  store: Store;
}) => {
  return async (payload: Payload) => {
    // check boxId is ref box
    // line count must be 2
    // delete old lines
    const lines = payload.lines.map(l => Line({...l, boxId: payload.boxId}))
    // const err = await props.store.line.load(payload)
    // if(err instanceof Error) { return err }
    // return payload
  }
}
export default Fn

