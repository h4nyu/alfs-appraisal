import { v4 as uuid } from 'uuid';
import { Lock, ErrorKind, Store } from "@sivic/core";
import { uniq } from "lodash"
export { CreateFn } from "@sivic/core/workspace/create"
export { UpdateFn } from "@sivic/core/workspace/update"
export { FindFn }from "@sivic/core/workspace/find"
export { DeleteFn } from "@sivic/core/workspace/delete"
export { FilterFn } from "@sivic/core/workspace/filter"

export type Workspace = {
  id: string
  name: string
  imageIds: string[]
  createdAt: Date
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
  return {
    id,
    name,
    imageIds,
    createdAt,
  }
}
