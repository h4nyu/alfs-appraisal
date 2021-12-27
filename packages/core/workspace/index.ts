import { v4 as uuid } from 'uuid';
import ErrorKind from '@alfs-appraisal/core/error'
export { default as CreateFn } from "@alfs-appraisal/core/workspace/create"
export { default as UpdateFn } from "@alfs-appraisal/core/workspace/update"
export { default as DeleteFn } from "@alfs-appraisal/core/workspace/delete"
export { default as FindFn }from "@alfs-appraisal/core/workspace/find"
export { default as FilterFn } from "@alfs-appraisal/core/workspace/filter"

export type Workspace = {
  id: string
  name: string
  imageIds: string[]
  createdAt: Date
  validate: () => void|Error
  equals: (other:Workspace) => boolean
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
  const equals = (other:Workspace) => {
    return JSON.stringify(self) === JSON.stringify(other)
  }
  const self = {
    id,
    name,
    imageIds,
    createdAt,
    validate,
    equals,
  }
  return self
}
export default Workspace
