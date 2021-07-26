import { Box } from "@sivic/core/box"
import { Store } from "@sivic/core"
import DeleteFn from "./delete"
import CreateFileFn from "@sivic/core/file/create"
import FindFileFn from "@sivic/core/file/find"
import FindImageFn from "@sivic/core/image/find"
import FilterFn from "./filter"

export type Fn = (payload:{
  imageId: string,
  boxes: {
    id?: string,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    tagId?:string,
  }[]
}) => Promise<Box[] | Error>
export const Fn = (props: {
  store:Store,
}):Fn => {
  const findImage = FindImageFn(props)
  const findFile = FindFileFn(props)
  const createFile = CreateFileFn(props)
  const delete_ = DeleteFn(props)
  const filter = FilterFn(props)
  return async (payload) => {
    const baseImage = await findImage({id: payload.imageId })
    if(baseImage instanceof Error) { return baseImage }
    const baseFile = await findFile({id: baseImage.fileId })
    if(baseFile instanceof Error) { return baseFile }
    const oldBoxes = await filter({imageId: baseImage.id})
    if(oldBoxes instanceof Error) { return oldBoxes }
    for (const ob of oldBoxes){
      const err = await delete_({box: ob})
      if(err instanceof Error) { return err}
    }
    const cropedBoxes: Box[] = []
    for(const [i, box] of payload.boxes.entries()){
      const data = await props.store.transform.crop({imageData: baseFile.data, box})
      if(data instanceof Error) { return data }
      const file = await createFile({ data })
      if(file instanceof Error) { continue }
      cropedBoxes.push(Box({
        id: box.id,
        imageId: payload.imageId,
        x0: box.x0,
        y0: box.y0,
        x1: box.x1,
        y1: box.y1,
        fileId: file.id,
        tagId: box.tagId,
      }))
    }
    const createBoxErr = await props.store.box.load(cropedBoxes)
    if(createBoxErr instanceof Error) { return createBoxErr }
    return cropedBoxes
  }
}
export default Fn
