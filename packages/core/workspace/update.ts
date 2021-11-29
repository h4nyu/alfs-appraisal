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
      const newWorkspace = Workspace({
        ...workspace,
        name: payload.name,
      })
      const valErr = newWorkspace.validate()
      if(valErr instanceof Error) { return valErr }
      const uniqErr = await unique(newWorkspace)
      if(uniqErr instanceof Error) { return uniqErr }
      const updateErr = await props.store.workspace.update(newWorkspace);
      if (updateErr instanceof Error) { return updateErr; }
      return newWorkspace
    })
  }
}

export default UpdateFn
