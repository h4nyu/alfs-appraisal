import { Store } from "@sivic/core"
import ErrorKind from "@sivic/core/error"
import { File } from "@sivic/core/file"
import { Image } from "."

export type Payload = {
  workspaceId?: string;
  parentId?: string
  ids?: string[]
};
export type FilterFn = (payload:Payload) => Promise<Image[] | Error>
export const FilterFn = (props: {
  store: Store,
}): FilterFn => {
  return async (payload: Payload) => {
    return await props.store.image.filter(payload)
  }
}
export default FilterFn
