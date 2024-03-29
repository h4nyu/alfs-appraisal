import { Workspace } from "@alfs-appraisal/core/workspace";
import { Lock, ErrorKind, Store } from "@alfs-appraisal/core";


export type Payload = {
  ids?: string[];
};
export type FilterFn = (payload: Payload) => Promise<Workspace[] | Error>
export const FilterFn = (props: {
  store: Store,
}):FilterFn => {
  return async (payload: Payload) => {
    const workspaces = await props.store.workspace.filter(payload)
    if(workspaces instanceof Error) { return workspaces }
    return workspaces
  }
}
export default FilterFn;
