import { Store } from "@alfs-appraisal/core"
import ErrorKind from "@alfs-appraisal/core/error"
import { File } from "@alfs-appraisal/core/file"
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
