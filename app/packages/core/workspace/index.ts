import { v4 as uuid } from 'uuid';
import ErrorKind from '@sivic/core/error'
export { default as CreateFn } from "@sivic/core/workspace/create"
export { default as UpdateFn } from "@sivic/core/workspace/update"
export { default as DeleteFn } from "@sivic/core/workspace/delete"
export { default as FindFn }from "@sivic/core/workspace/find"
export { default as FilterFn } from "@sivic/core/workspace/filter"

export type Workspace = {
  id: string
  name: string
  imageIds: string[]
  createdAt: Date
  validate: () => void|Error
}

export const Workspace = (args?: {
  id?: string,
  name?: string,
  imageIds?:string[],
  createdAt?: Date,
}):Workspace => {
  const id = args?.id ?? uuid()
  const name = args?.name ?? ""
  const imageIds = args?.imageIds ?? []
  const createdAt = args?.createdAt ?? new Date()
  const validate = () => {
    if(!name) {
      return new Error(ErrorKind.InvalidWorkspaceNameFormat)
    }
  }
  return {
    id,
    name,
    imageIds,
    createdAt,
    validate,
  }
}
export default Workspace
