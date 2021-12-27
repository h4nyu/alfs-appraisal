import { Store } from "@alfs-appraisal/core"
import ErrorKind from "@alfs-appraisal/core/error"
import { Image } from "./"

export type Payload = {
  id?: string;
};
export type FindFn = (payload:Payload) => Promise<Image | Error>
export const FindFn = (props: {
  store: Store,
}): FindFn => {
  return async (payload: Payload) => {
    const image = await props.store.image.find(payload)
    if(image instanceof Error) { return image }
    if(image === undefined) { return new Error(ErrorKind.ImageNotFound) }
    return image
  }
}
export default FindFn
