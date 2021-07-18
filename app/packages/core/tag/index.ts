import { v4 } from "uuid";
import { ErrorKind } from "@sivic/core/error"
export { default as FilterFn } from "./filter"
export { default as DeleteFn } from "./delete"
export { default as FindFn } from "./find"
export { default as CreateFn } from "./create"
export { default as UpdateFn } from "./update"

export type Tag = {
  id: string,
  name: string,
  workspaceId?: string,
}

export const Tag = (props?: {
  id?:string;
  name?: string;
  workspaceId?: string
}):Tag => {
  const id = props?.id ?? v4()
  const name = props?.name ?? ""
  const workspaceId = props?.workspaceId
  return {
    id,
    name,
    workspaceId
  }
}
export default Tag
