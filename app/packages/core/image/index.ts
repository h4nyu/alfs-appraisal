import { v4 as uuid } from 'uuid';
import { Lock, Store, ErrorKind } from "@sivic/core"
import { Service as FileService } from "@sivic/core/file"
import { File } from "@sivic/core/file"
import FilterFn from "./filter"
import DeleteFn from "./delete"
import FindFn from "./find"

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
};

// export const Service = (args: { store: Store; lock: Lock }): Service => {
//   const { store, lock } = args;
//   const filter = async (payload:FilterPayload) => {
//     return await store.image.filter(payload);
//   }
//   const find = async (payload: FindPayload) => {
//     const image = await store.image.find(payload);
//     if (image instanceof Error) {
//       return image;
//     }
//     if (image === undefined) {
//       return new Error(ErrorKind.ImageNotFound);
//     }
//     return image;
//   };

//   const delete_ = async (payload: DeletePayload) => {
//     return await lock.auto(async () => {
//       const { id } = payload;
//       const row = await find({ id });
//       if (row instanceof Error) { return row; }
//       let err = await store.image.delete({ id });
//       if (err instanceof Error) { return err; }
//       err = await store.file.delete({ id: row.fileId });
//       if (err instanceof Error) { return err; }
//       return row.id
//     });
//   };

//   return {
//     find,
//     filter,
//     delete: delete_,
//   };
// };
