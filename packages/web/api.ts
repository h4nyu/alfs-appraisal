import { File } from "@sivic/core/file"
import { Point } from "@sivic/core/point"
import { Box } from "@sivic/core/box"
import { RootApi } from "@sivic/api";

const api = RootApi()

export const batchFetchFiles = async (...ids:string[]) => {
  const res:File[] = []
  for (const f of await Promise.all(ids.map(id => api.file.find({id})))){
    if(f instanceof Error) { return f }
    res.push(f)
  }
  return res
}

export const batchFetchBoxes = async (...ids:string[]) => {
  let res:Box[] = []
  for (const boxes of await Promise.all(ids.map(id => api.box.filter({imageId: id})))){
    if(boxes instanceof Error) { return boxes }
    res.concat(boxes)
  }
  return res
}

export const batchFetchPoints = async (...ids:string[]) => {
  let res:Point[] = []
  for (const c of await Promise.all(ids.map(id => api.point.filter({boxId: id})))){
    if(c instanceof Error) { return c }
    res.concat(c)
  }
  return res
}

export default api 
