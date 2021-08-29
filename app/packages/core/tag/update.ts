import { Lock, Store } from "@sivic/core";
import ErrorKind from "@sivic/core/error"
import { Tag } from ".";
import UniqueFn from "./unique"
import FindFn from "./find"
import FindWorkspaceFn from "@sivic/core/workspace/find"

export type Fn = (payload: {
  id: string;
  name: string;
  workspaceId?: string;
  referenceBoxId?: string;
}) => Promise<Tag | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  const unique = UniqueFn(props)
  const find = FindFn(props)
  const findWorkspace = FindWorkspaceFn(props)
  return async (payload) => {
    if(payload.workspaceId){
      const workspace = await findWorkspace({ id: payload.workspaceId })
      if(workspace instanceof Error) { return workspace }
    }
    const tag = await find({id: payload.id})
    if(tag instanceof Error) {return tag}
    const newTag = Tag({
      ...tag,
      ...payload,
    })
    const validateErr = newTag.validate()
    if(validateErr instanceof Error) { return validateErr }
    const uniqueErr = await unique(newTag)
    if(uniqueErr instanceof Error) { return uniqueErr}
    let err = await props.store.tag.update(newTag);
    if (err instanceof Error) {
      return err;
    }
    return newTag;
  };
}
export default Fn
