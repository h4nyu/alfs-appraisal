import { Store } from "@sivic/core"
import ErrorKind from "@sivic/core/error"
import { File } from "@sivic/core/file"
import { Image } from "."

export type Fn = (payload:{
  workspaceId?: string;
  parentId?: string
  ids?: string[]
}) => Promise<Image[] | Error>
export const Fn = (props: {
  store: Store,
}): Fn => {
  return async (payload) => {
    return await props.store.image.filter(payload)
  }
}
export default Fn
