import { v4 as uuid } from 'uuid';
import ErrorKind  from "@sivic/core/error"
export { default as FilterFn } from "./filter"
export { default as DeleteFn } from "./delete"
export { default as FindFn } from "./find"
export { default as CreateFn } from "./create"

export const ImageTag = {
  Source: "Source",
  Target: "Target"
} as const

export type ImageTag = typeof ImageTag[keyof typeof ImageTag];

export type Image = {
  id: string,
  name: string,
  workspaceId?: string,
  fileId?: string,
  createdAt: Date,
}
export const Image = (args?:{
  id?:string,
  name?: string,
  workspaceId?:string,
  fileId?: string,
  createdAt?: Date,
}):Image => {
  const id = args?.id ?? uuid()
  const name = args?.name ?? ""
  const workspaceId = args?.workspaceId
  const createdAt = args?.createdAt || new Date()
  const fileId = args?.fileId
  return {
    id,
    name,
    workspaceId,
    fileId,
    createdAt,
  }
}
export default Image


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
