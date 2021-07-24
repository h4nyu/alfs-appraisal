import { v4 as uuid } from 'uuid';
import ErrorKind from "@sivic/core/error"
export { default as FilterFn } from "./filter"
export { default as CreateFn } from "./create"

export type Box = {
  id: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  tagId? :string,
  imageId?: string,
  fileId?: string,
  validate: () => void | Error;
}
export const Box = (args?:{
  id?: string,
  x0?: number,
  y0?: number,
  x1?: number,
  y1?: number,
  imageId?: string,
  tagId?:string,
  fileId?: string,
}):Box => {
  const id = args?.id ?? uuid()
  const x0 = args?.x0 ?? 0
  const y0 = args?.y0 ?? 0
  const x1 = args?.x1 ?? 0
  const y1 = args?.y1 ?? 0
  const imageId = args?.imageId
  const tagId = args?.tagId
  const fileId = args?.fileId
  const validate = () => {
    if (self.x0 >= self.x1 || self.y0 >= self.y1) {
      return new Error(ErrorKind.ZeroSizeBox);
    }
  }
  const self = {
    id,
    x0,
    y0,
    x1,
    y1,
    imageId,
    tagId,
    fileId,
    validate,
  }
  return self
}
export default Box
