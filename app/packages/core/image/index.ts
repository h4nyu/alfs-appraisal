import { v4 as uuid } from 'uuid';
import { Lock, Store, ErrorKind } from "@sivic/core"
import { Service as FileService } from "@sivic/core/file"
import { File } from "@sivic/core/file"
import FilterFn from "./filter"
import DeleteFn from "./delete"
import FindFn from "./find"
import CropFn from "./crop"

export const ImageTag = {
  Source: "Source",
  Target: "Target"
} as const


export type ImageTag = typeof ImageTag[keyof typeof ImageTag];

export type Image = {
  id: string,
  name: string,
  workspaceId?: string,
  parentId?: string
  tagId?: string,
  fileId?: string,
  boxId?:string,
  createdAt: Date,
}
export const Image = (args?:{
  id?:string,
  name?: string,
  workspaceId?:string,
  parentId?: string,
  tagId?:string,
  fileId?: string,
  boxId?: string,
  createdAt?: Date,
}):Image => {
  const id = args?.id ?? uuid()
  const name = args?.name ?? ""
  const workspaceId = args?.workspaceId
  const parentId = args?.parentId
  const tagId = args?.tagId
  const createdAt = args?.createdAt || new Date()
  const fileId = args?.fileId
  const boxId = args?.boxId
  return {
    id,
    name,
    workspaceId,
    parentId,
    tagId,
    fileId,
    createdAt,
    boxId,
  }
}


export type DetectBoxPayload = {imageId: string}

type DetectedBoxes = {
  x0:number,
  y0:number,
  x1:number,
  y1:number,
  confidence: number,
}[]
export type DetectBoxes = (payload: {data :string}) => Promise<[DetectedBoxes, string] | Error>;

// const DetectBoxFn = (props:{
//   store: Store,
//   detectBoxes: DetectBoxes,
//   lock: Lock
// }) => {
//   const findImage = FindFn(props)
//   return async (payload: {imageId:string}) => {
//     const image = await findImage({id: payload.imageId })
//     if(image instanceof Error) { return image }
//     const file = await services.file.find({id: image.id})
//     if(file instanceof Error) { return file }
//     const detectRes = await detectBoxes({data: file.data})
//     if(detectRes instanceof Error) { return detectRes }
//     const [boxes, data] = detectRes
//     return boxes.map( x => {
//       return {...x, imageId: image.id}
//     })
//   }
// }




export type Service = {
  filter: FindFn;
  delete: DeleteFn;
  find: FindFn;
  crop: CropFn;
};
