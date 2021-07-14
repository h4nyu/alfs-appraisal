import { Lock, ErrorKind, Store } from "@sivic/core";
import { Workspace } from "@sivic/core/workspace";
import UniqueFn from "@sivic/core/workspace/unique"
import FindFn from "@sivic/core/workspace/find"

export type Payload = {
  id: string;
  name: string;
};
export type UpdateFn = (payload: Payload) => Promise<Workspace | Error>
export const UpdateFn = (props: {
  store: Store;
  lock: Lock;
}) => {
  const unique = UniqueFn(props)
  const find = FindFn(props)
  return async (payload: Payload) => {
    return await props.lock.auto(async () => {
      const workspace = await find({id: payload.id})
      if(workspace instanceof Error) { return workspace }

      workspace.name = payload.name

      const uniqErr = await unique(workspace)
      if(uniqErr instanceof Error) { return uniqErr }

      const updateErr = await props.store.workspace.update(workspace);
      if (updateErr instanceof Error) { return updateErr; }
      return workspace
    })
  }
}

export default UpdateFn
