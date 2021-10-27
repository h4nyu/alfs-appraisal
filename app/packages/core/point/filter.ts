import { Lock, ErrorKind, Store } from "@sivic/core";
import Point from ".";

export type Payload = {
  boxId?: string;
  positionId?: string;
};
export type Fn = (payload: Payload) => Promise<Point[] | Error>
export const Fn = (props: {
  store: Store;
}) => {
  return async (payload: Payload) => {
    const points = await props.store.point.filter(payload)
    if(points instanceof Error) { return points }
    return points
  }
}
export default Fn
