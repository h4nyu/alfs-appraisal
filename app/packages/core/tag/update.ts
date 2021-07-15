import { Lock, Store } from "@sivic/core";
import ErrorKind from "@sivic/core/error"
import { Tag } from ".";
import UniqueFn from "./unique"
import FindFn from "./find"

export type Payload = {
  id: string;
  name: string;
  workspaceId?: string;
};

export type Fn = (payload: Payload) => Promise<Tag | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  const unique = UniqueFn(props)
  const find = FindFn(props)
  return async (payload: Payload) => {
    const tag = await find({id: payload.id})
    if(tag instanceof Error) {return tag}
    const uniqueErr = await unique(tag)
    if(uniqueErr instanceof Error) { return uniqueErr}
    const newTag = Tag({
      ...tag,
      ...payload,
    })
    let err = await props.store.tag.update(newTag);
    if (err instanceof Error) {
      return err;
    }
    return newTag;
  };
}
export default Fn
