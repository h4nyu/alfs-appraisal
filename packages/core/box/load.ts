import { Box } from "@alfs-appraisal/core/box"
import { Store } from "@alfs-appraisal/core"
import CreateFileFn from "@alfs-appraisal/core/file/create"
import FindFileFn from "@alfs-appraisal/core/file/find"
import FindImageFn from "@alfs-appraisal/core/image/find"
import File from "@alfs-appraisal/core/file"
import Image from "@alfs-appraisal/core/image"
import FilterFn from "./filter"
import DeleteFn from "./delete"
import UpdateFn from "./update"
import CreateFn from "./create"

export type Payload = {
  imageId: string
  boxes: Box[],
}
export type Fn = (payload:Payload) => Promise<Box[] | Error>
export const Fn = (props: {
  store:Store,
}):Fn => {
  const findImage = FindImageFn(props)
  const findFile = FindFileFn(props)
  const filter = FilterFn(props)
  const delete_ = DeleteFn(props)
  const update = UpdateFn(props)
  const create = CreateFn(props)
  return async (payload) => {
    const image = await findImage({id: payload.imageId })
    if(image instanceof Error) { return image }
    const file = await findFile({id: image.fileId })
    if(file instanceof Error) { return file }
    const oldBoxes = await filter({imageId: image.id})
    if(oldBoxes instanceof Error) { return oldBoxes }
    const boxes = payload.boxes.filter(b => Box({
      ...b,
      imageId: image.id,
    }))
    for(const oldBox of oldBoxes){
      const matched = boxes.find(b => b.id === oldBox.id)
      if(!matched){
        const err = await delete_({box: oldBox})
      }
    }
    const newBoxes:Box[] = []
    for(const box of boxes){
      const oldBox = oldBoxes.find(ob => ob.id === box.id)
      const newBox = await (async () => {
        if(oldBox){
          return await update({ 
            box, 
            oldBox,
            image,
            file,
          })
        }else{
          return await create({
            box, 
            image,
            file,
          })
        }
      })()
      if(newBox instanceof Error) { return newBox }
      newBoxes.push(newBox)
    }
    return newBoxes
  }
}
export default Fn
