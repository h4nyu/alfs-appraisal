import { Box } from "@sivic/core/box"
import { Store } from "@sivic/core"
import CreateFileFn from "@sivic/core/file/create"
import FindFileFn from "@sivic/core/file/find"
import FindImageFn from "@sivic/core/image/find"
import File from "@sivic/core/file"
import Image from "@sivic/core/image"
import FilterFn from "./filter"
import DeleteFn from "./delete"
import UpdateFn from "./update"
import CreateFn from "./create"

export type Fn = (payload:{
  imageId: string
  boxes: Box[],
}) => Promise<Box[] | Error>
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
    const boxes = payload.boxes.filter(x => x.imageId === image.id)
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
