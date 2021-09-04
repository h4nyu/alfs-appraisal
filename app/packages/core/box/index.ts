import ErrorKind from "@sivic/core/error"
import { nanoid } from 'nanoid'
export { default as FilterFn } from "./filter"
export { default as CreateFn } from "./create"
export { default as UpdateFn } from "./update"
export { default as LoadFn } from "./load"
export { default as DeleteFn } from "./delete"


// tag <- box

export type Box = {
  id: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  tagId? :string,
  imageId?: string,
  fileId?: string,

  height: number // getter
  width: number // getter

  isReference?: boolean,
  validate: () => void | Error;
  equals:(other: Box) => boolean
  posEquals:(other: Box) => boolean
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
  isReference?: boolean,
}):Box => {
  const id = args?.id ?? nanoid(9)
  const x0 = args?.x0 ?? 0
  const y0 = args?.y0 ?? 0
  const x1 = args?.x1 ?? 0
  const y1 = args?.y1 ?? 0
  const imageId = args?.imageId
  const tagId = args?.tagId
  const fileId = args?.fileId
  const isReference = args?.isReference
  const validate = () => {
    if (self.x0 >= self.x1 || self.y0 >= self.y1) {
      return new Error(ErrorKind.ZeroSizeBox);
    }
  }
  const equals = (other:Box) => {
    return JSON.stringify(self) === JSON.stringify(other)
  }
  const posEquals = (other:Box) => {
    return (
      self.x0 === other.x0
      && self.y0 === other.y0
      && self.x1 === other.x1
      && self.y1 === other.y1
      && self.imageId === other.imageId
    )
  }
  const getHeight = () => {
    return self.y1 - self.y0
  }
  const getWidth = () => {
    return self.x1 - self.x0
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
    get height() { return getHeight() },
    get width() { return getWidth() },
    validate,
    equals,
    posEquals,
    isReference,
  }
  return self
}
export default Box
