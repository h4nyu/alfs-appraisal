import { Store } from "@alfs-appraisal/core";
import { ErrorKind } from "@alfs-appraisal/core/error"
import { Workspace } from "@alfs-appraisal/core/workspace";

export type UniqueFn = (workspace:Workspace) => Promise<void | Error>
export const UniqueFn = (props: {
  store: Store
}) => {
  return async (workspace: Workspace):Promise<void | Error> => {
    const row = await props.store.workspace.find({name: workspace.name})
    if(row instanceof Error) { return row }
    if(row?.id !== workspace.id && row?.name === workspace.name ){
      return new Error(ErrorKind.WorkspaceAlreadyExist)
    }
  }
}
export default UniqueFn
