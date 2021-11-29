import Tag from "."
import { Store } from "@sivic/core";
import ErrorKind from "@sivic/core/error"

export type Payload = {
  workspaceId?: string;
};
export type Fn = (payload: Payload) => Promise<Tag[] | Error>
export const Fn = (props: {
  store: Store,
}):Fn => {
  return async (payload: Payload) => {
    const tags = await props.store.tag.filter(payload)
    if(tags instanceof Error) { return tags }
    return tags
  }
}
export default Fn;

