import { observable, computed } from "mobx";
import { Map, List } from "immutable";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import Image, { FilterFn } from "@sivic/core/image";
import { saveAs } from 'file-saver';
import { MemoryRouter } from "react-router";
import { parseISO } from "date-fns";
import { Level } from "@sivic/web/store"

export type ImageStore = {
  images: Map<string, Image>;
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
    if(images instanceof Error) { return images }
    self.images = self.images.merge(Map(images.map(x => [x.id, x])))
    return images
  }
  const delete_ = (payload:{
    workspaceId?: string,
    parentId?: string,
    ids?: string[]
  }) => {
    const { ids, workspaceId, parentId } = payload
    if(workspaceId !== undefined){
      self.images = self.images.filter(x => x.workspaceId !== workspaceId)
    }else if(ids) {
      self.images = self.images.filter(x => !(ids.includes(x.id) || ids.includes(x.parentId || "")))
    }else if(parentId) {
      self.images = self.images.filter(x => x.parentId !== parentId)
    }
  }
  const self = observable({
    images: Map<string, Image>(),
    fetch,
    delete: delete_
  })
  return self
}
export default ImageStore
