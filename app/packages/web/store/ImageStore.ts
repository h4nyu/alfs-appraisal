import { observable, computed } from "mobx";
import RootApi from "@sivic/api";
import Image, { FilterFn } from "@sivic/core/image";
import { Set } from "immutable";
import { uniqBy } from "lodash"

export type ImageStore = {
  images: Image[];
  fetch: FilterFn,
  delete: (payload: {
    parentId?: string,
    workspaceId?:string, 
    ids?:string[]
  }) => void
};

export const ImageStore = (args: {
  api: RootApi;
}): ImageStore => {
  const { api } = args;
  const fetch:FilterFn = async (payload) => {
    const images = await api.image.filter(payload)
    if(images instanceof Error) { return images}
    self.images = uniqBy([...images, ...self.images], x => x.id)
    return images
  }

  const delete_ = (payload:{
    workspaceId?: string,
    ids?: string[]
  }) => {
    const { ids, workspaceId } = payload
    if(workspaceId !== undefined){
      self.images = self.images.filter(x => x.workspaceId !== workspaceId)
    }else if(ids) {
      self.images = self.images.filter(x => !ids.includes(x.id))
    }
  }
  const self = observable<ImageStore>({
    images: [],
    fetch,
    delete: delete_
  })
  return self
}
export default ImageStore
