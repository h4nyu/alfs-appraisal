import { Lock, Store } from "@sivic/core";
import ErrorKind from "@sivic/core/error"
import { Tag } from ".";
import UniqueFn from "./unique"
import FindWorkspaceFn from "@sivic/core/workspace/find"


export type Fn = (payload: {
  id?: string;
  name: string;
  workspaceId?: string
  referenceBoxId?: string,
}) => Promise<Tag | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  const unique = UniqueFn(props)
  const findWorkspace = FindWorkspaceFn(props)
  return async (payload) => {
    if(payload.workspaceId){
      const workspace = await findWorkspace({ id: payload.workspaceId })
      if(workspace instanceof Error) { return workspace }
    }
    const tag = Tag(payload)
    const validateErr = tag.validate()
    if(validateErr instanceof Error) { return validateErr }
    const uniqueErr = await unique(tag)
    if(uniqueErr instanceof Error) { return uniqueErr }
    const insertErr = await props.store.tag.insert(tag)
    if(insertErr instanceof Error) { return insertErr }
    return tag
  }
}
export default Fn
