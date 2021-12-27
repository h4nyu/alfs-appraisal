import { Tag } from ".";
import { Store } from "@alfs-appraisal/core";
import ErrorKind from "@alfs-appraisal/core/error"

export type Payload = {
  id: string;
};
export type Fn = (payload: Payload) => Promise<Tag | Error>
export const Fn = (props: {
  store: Store,
}):Fn => {
  return async (payload: Payload) => {
    const tag = await props.store.tag.find(payload)
    if(tag instanceof Error) { return tag }
    if(tag === undefined) { return new Error(ErrorKind.TagNotFound) }
    return tag
  }
}
export default Fn;
