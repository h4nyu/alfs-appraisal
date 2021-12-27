import { Box } from "@alfs-appraisal/core/box"
import { Store } from "@alfs-appraisal/core"

export type Payload = {
  imageId?: string;
  tagId?:string,
}
export type Fn = (payload:Payload) => Promise<Box[] | Error>
export const Fn = (props: {
  store:Store,
}):Fn => {
  return async (payload: Payload) => {
    const boxes = await props.store.box.filter(payload)
    if(boxes instanceof Error) { return boxes }
    return boxes
  }
}
export default Fn

