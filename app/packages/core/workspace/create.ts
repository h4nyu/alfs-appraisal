import { Lock, ErrorKind, Store } from "@sivic/core";
import { Workspace } from "@sivic/core/workspace";
import { UniqueFn } from "@sivic/core/workspace/unique"

export type Payload = {
  id?: string;
  name: string;
};
export type Fn = (payload: Payload) => Promise<Workspace | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}):Fn => {
  const unique = UniqueFn(props)
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const workspace = Workspace(payload)
      const valErr = workspace.validate()
      if(valErr instanceof Error) { return valErr }
      const uniqueErr = await unique(workspace)
      if(uniqueErr instanceof Error) { return uniqueErr }
      const insertErr = await props.store.workspace.insert(workspace)
      if(insertErr instanceof Error) { return insertErr }
      return workspace
    })
  }
}

export default Fn
