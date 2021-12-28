import { Box } from "@alfs-appraisal/core/box"
import { Store } from "@alfs-appraisal/core"
import ErrorKind from "@alfs-appraisal/core/error"

export type Fn = (payload:{
  id?: string;
}) => Promise<Box | Error>
export const Fn = (props: {
  store:Store,
}):Fn => {
  return async (payload) => {
    const box = await props.store.box.find(payload)
    if(box instanceof Error) { return box }
    if(box === undefined) { return new Error(ErrorKind.BoxNotFound)}
    return box
  }
}
export default Fn

