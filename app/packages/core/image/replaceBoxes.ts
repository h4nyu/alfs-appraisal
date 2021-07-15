import { Store } from "@sivic/core"
import { Box } from "@sivic/core/box"
import { Image } from "@sivic/core/image"
import { File } from "@sivic/core/file"
import FindFn from "./find"
import CreateFn from "./create"
import FindFileFn from "@sivic/core/file/find"
import DeleteBoxFn from "@sivic/core/box/delete"
import CreateBoxFn from "@sivic/core/box/create"

export type Payload ={
  imageId:string,
  boxes: Box[],
}
export type Fn = (payload:Payload) => Promise<Image[] | Error>
export const Fn = (props:{
  store: Store
}):Fn => {
  const find = FindFn(props)
  const create = CreateFn(props)
  const findFile = FindFileFn(props)
  const deleteBoxFn = DeleteBoxFn(props)
  const createBox = CreateBoxFn(props)
  return async (payload: Payload) => {
    const baseImage = await find({id: payload.imageId})
    if(baseImage instanceof Error){ return baseImage }
    const baseFile = await findFile({id: baseImage.id})
    if(baseFile instanceof Error) { return baseFile }
    let err = await deleteBoxFn({imageId: baseImage.id})
    if(err instanceof Error) { return err }
    const boxes = payload.boxes.filter(b => b.imageId === baseImage.id)
    const cropedImages:Image[] = []
    const cropedBoxes: Box[] = []
    for(const [i, box] of boxes.entries()){
      const croped = await props.store.transform.crop({imageData: baseFile.data, box})
      if(croped instanceof Error) { return croped }
      const cropedImage = await create({
        name: `${baseImage.name}-{i}`,
        workspaceId: baseImage.workspaceId,
        data: croped,
        boxId: box.id,
      })
      if(cropedImage instanceof Error) { return cropedImage }
      cropedImages.push(cropedImage)
      cropedBoxes.push(box)
    }
    const createBoxErr = await createBox(cropedBoxes)
    if(createBoxErr instanceof Error) { return createBoxErr }
    return cropedImages
  }
}
export default Fn
