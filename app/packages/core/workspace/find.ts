import { Workspace } from "@sivic/core/workspace";
import { Lock, ErrorKind, Store } from "@sivic/core";

export type Payload = {
  id: string;
};
export type FindFn = (payload: Payload) => Promise<Workspace | Error>
export const FindFn = (props: {
  store: Store,
}):FindFn => {
  return async (payload: Payload) => {
    const workspace = await props.store.workspace.find(payload)
    if(workspace instanceof Error) { return workspace }
    if(workspace === undefined) { return new Error(ErrorKind.WorkspaceNotFound) }
    return workspace
  }
}
export default FindFn;
