import { Box } from "@alfs-appraisal/core/box"
import { Store } from "@alfs-appraisal/core"
import CreateFileFn from "@alfs-appraisal/core/file/create"
import FindFileFn from "@alfs-appraisal/core/file/find"
import FindImageFn from "@alfs-appraisal/core/image/find"
import File from "@alfs-appraisal/core/file"
import Image from "@alfs-appraisal/core/image"

export type Fn = (payload:{
  box: Box,
  image?: Image,
  file?: File,
}) => Promise<Box | Error>
export const Fn = (props: {
  store:Store,
}):Fn => {
  const findImage = FindImageFn(props)
  const findFile = FindFileFn(props)
  const createFile = CreateFileFn(props)
  return async (payload) => {
    const baseImage = payload.image ?? await findImage({id: payload.box.imageId })
    if(baseImage instanceof Error) { return baseImage }
    const baseFile = payload.file ?? await findFile({id: baseImage.fileId })
    if(baseFile instanceof Error) { return baseFile }
    const data = await props.store.transform.crop({imageData: baseFile.data, box: payload.box})
    if(data instanceof Error) { return data }
    const file = await createFile({ data })
    if(file instanceof Error) { return file }
    const box = Box({
      ...payload.box,
      imageId: baseImage.id,
      fileId: file.id,
    })
    const createBoxErr = await props.store.box.create(box)
    if(createBoxErr instanceof Error) { return createBoxErr }
    return box
  }
}
export default Fn
