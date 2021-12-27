import { v4 as uuid } from 'uuid';
import { Lock, Store, ErrorKind } from "@alfs-appraisal/core"
import CreateFileFn from "@alfs-appraisal/core/file/create"
import Image from "."
import FindFn from "./find"

export type Fn = (payload: {
  id: string;
  name?: string;
  oldImage?: Image;
}) => Promise<Image | Error>

export const Fn = (props: {
  store: Store,
}):Fn => {
  const find = FindFn(props)
  return async (payload) => {
    const oldImage = payload.oldImage ?? await find({id: payload.id})
    if(oldImage instanceof Error) { return oldImage }
    const newImage = Image({
      ...oldImage,
      name: payload.name,
    })
    const updateErr = await props.store.image.update(newImage)
    if(updateErr instanceof Error) { return updateErr }
    return newImage
  }
}

export default Fn
