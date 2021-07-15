import { Lock, Store } from "@sivic/core";
import ErrorKind from "@sivic/core/error"
import { Tag } from ".";
import UniqueFn from "./unique"

export type Payload = {
  id?: string;
  name: string;
  workspaceId?: string
};

export type Fn = (payload: Payload) => Promise<Tag | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  const unique = UniqueFn(props)
  return async (payload: Payload) => {
    const tag = Tag(payload)
    const uniqueErr = await unique(tag)
    if(uniqueErr instanceof Error) { return uniqueErr }
    return tag
  }
}
export default Fn
