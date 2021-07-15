import { Store } from "@sivic/core"
import Line from "@sivic/core/line"
import FindFn from "./find"
import DeleteLineFn from "@sivic/core/line/delete"
import CreateLineFn from "@sivic/core/line/create"

export type Fn = (payload:{
  imageId: string,
  lines: {
    id: string
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  }[]
}) => Promise<Line[] | Error>

export const Fn = (props:{
  store: Store
}):Fn => {
  const find = FindFn(props)
  const deleteLine = DeleteLineFn(props)
  const createLine = CreateLineFn(props)
  return async (payload) => {
    const image = await find({id: payload.imageId})
    if(image instanceof Error) { return image }
    const deleteErr = await deleteLine({imageId: image.id})
    if(deleteLine instanceof Error) { return deleteLine }
    const lines = payload.lines.map(x => Line({
      ...x,
      imageId: image.id
    }))
    const createErr = await createLine(lines)
    if(createLine instanceof Error) { return createLine }
    return lines
  }
}
export default Fn
