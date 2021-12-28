import { File } from "@alfs-appraisal/core/file"
import { Image } from "@alfs-appraisal/core/image";
import { Point } from "@alfs-appraisal/core/point"
import { Box } from "@alfs-appraisal/core/box"
import { RootApi } from "@alfs-appraisal/api";

const api = RootApi()

export const batchFetchFiles = async (req?: {
  images?:Image[],
  boxes?: Box[],
}) => {
  const ids = [
    ...req?.images?.map(x => x.fileId) ?? [],
    ...req?.boxes?.map(x => x.fileId) ?? [],
  ].filter(x => x) as string[]
  if(!ids) { return [] }
  const res:File[] = []
  for (const f of await Promise.all(ids.map(id => api.file.find({id})))){
    if(f instanceof Error) { return f }
    res.push(f)
  }
  return res
}

export const batchFetchBoxes = async (req?: {images?:Image[]}) => {
  let res:Box[] = []
  const ids = req?.images?.map(x => x.id).filter(x => x) ?? []
  for (const boxes of await Promise.all(ids.map(id => api.box.filter({imageId: id})))){
    if(boxes instanceof Error) { return boxes }
    res = res.concat(boxes)
  }
  return res
}

export const batchFetchPoints = async (req: {boxes?:Box[]}) => {
  const ids = req?.boxes?.map(x => x.id)
  if(!ids){ return ids}
  let res:Point[] = []
  for (const c of await Promise.all(ids.map(id => api.point.filter({boxId: id})))){
    if(c instanceof Error) { return c }
    res = res.concat(c)
  }
  return res
}

export default api 
