import { Lock, ErrorKind, Store } from "@sivic/core";
import { Workspace } from ".";
import FindFn from "./find"
import { Tag } from "@sivic/core/tag"
import CreateFn from "@sivic/core/tag/create"

export type Payload = {
  id?: string;
  name: string;
  tagId: string;
  workspaceId: string;
} 

export type Fn = (payload: Payload) => Promise<Tag | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}) => {
  const find = FindFn(props)
  const createTag = CreateFn(props)
  return async (payload: Payload) => {
    const workspace = await find({ id: payload.workspaceId })
    if(workspace instanceof Error) { return workspace }
    const tag = await createTag(payload)
    if(tag instanceof Error) { return tag }
    return tag
  }
}
export default Fn
