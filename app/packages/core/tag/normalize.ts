import { Tag } from ".";
import { Store } from "@sivic/core";
import ErrorKind from "@sivic/core/error"
import { Box } from "@sivic/core/box"
import { Point } from "@sivic/core/point"
import { Line } from "@sivic/core/line"

export type Payload = {
  id: string;
};
export type Fn = (payload: {
  id: string
}) => Promise<{
  box: Box,
  points: Point[],
  line: Line,
}[] | Error>
export const Fn = (props: {
  store: Store,
}):Fn => {
  return async (payload) => {
    return []
  }
}
export default Fn;
