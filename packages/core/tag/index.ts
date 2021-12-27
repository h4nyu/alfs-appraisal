import { v4 } from "uuid";
import { ErrorKind } from "@alfs-appraisal/core/error"
export { default as FilterFn } from "./filter"
export { default as DeleteFn } from "./delete"
export { default as FindFn } from "./find"
export { default as CreateFn } from "./create"
export { default as UpdateFn } from "./update"

export type Tag = {
  id: string,
  name: string,
  workspaceId?: string,
  referenceBoxId?: string,
  validate: () => void | Error
}

export const Tag = (props?: {
  id?:string;
  name?: string;
  referenceBoxId?: string,
  workspaceId?: string
}):Tag => {
  const id = props?.id ?? v4()
  const name = props?.name ?? "-"
  const workspaceId = props?.workspaceId
  const referenceBoxId = props?.referenceBoxId
  const validate = () => {
    if(name.length !== 1){
      return new Error(ErrorKind.InvalidTagNameFormat)
    }
  }
  return {
    id,
    name,
    workspaceId,
    referenceBoxId,
    validate,
  }
}
export default Tag
