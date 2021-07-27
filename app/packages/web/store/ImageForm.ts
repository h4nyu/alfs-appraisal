import { observable, computed } from "mobx";
import { Map, List } from "immutable";
import { Workspaces } from ".";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import { Workspace } from "@sivic/core/workspace";
import { saveAs } from 'file-saver';
import { MemoryRouter } from "react-router";
import { take, flow, sortBy, map, find } from "lodash";
import { parseISO } from "date-fns";
import { Level } from "@sivic/web/store"
import { readAsBase64, b64toBlob } from "@sivic/web/utils";
import { Image, ImageTag } from "@sivic/core/image";
import { ErrorKind } from "@sivic/core";
import ImageStore from "@sivic/web/store/ImageStore"

export type ImageForm = {
  workspace?:Workspace;
  images: Image[];
  init: (workspace:Workspace) => Promise<void>;
  uploadFiles: (files:File[]) => Promise<void>;
  deleteImage: (imageId:string) => Promise<void|Error>;
  updateTag:({id:string, tag:ImageTag}) => Promise<void>;
};

export const ImageForm = (args: {
  api: RootApi;
  loading: <T>(fn: () => Promise<T>) => Promise<T>;
  imageStore: ImageStore,
  toast: ToastStore;
  onSave?: (workspaceId:string) => void
}): ImageForm => {
  const { api, loading, toast, onSave, imageStore } = args;
  const fetch = async () => {
    const { workspace } = self
    if(workspace === undefined) {return}
    const { imageIds } = workspace
  }

  const init = async (workspace:Workspace) => {
    self.workspace = workspace
    await fetch()
  }

  const updateTag = async (payload:{
    id:string,
    tag:ImageTag
  }) => {
    const {id, tag} = payload
    const workspaceId = self.workspace?.id
    if(workspaceId === undefined) {return}
    const image = await find(self.images, x => x.id === id)
  }

  const deleteImage = async (imageId:string) => {
    const workspaceId = self.workspace?.id
    if(workspaceId === undefined) {return}
    let err = await api.image.delete({
      id:imageId,
    })
    if(err instanceof Error) {
      toast.error(err)
      return err
    }
    imageStore.delete({ids:[imageId]})
    onSave && onSave(workspaceId)
  }

  const uploadFiles = async (files: File[]) => {
    const ids: string[] = [];
    const workspaceId = self.workspace?.id
    if(workspaceId === undefined){
      return
    }
    await loading(async () => {
      for (const f of files) {
        if (!f.type.includes("image")) {
          toast.error(Error("UnsupportedFormat"));
          continue;
        }
        const data = await readAsBase64(f);
        if (data instanceof Error) {
          toast.error(data);
          continue;
        }
        const image = await api.image.create({ 
          data, name:f.name, workspaceId
        });
        if (image instanceof Error) {
          toast.error(image);
          continue;
        }
      }
    });
    onSave && onSave(workspaceId)
  };
  const self = observable<ImageForm>({
    workspace: undefined,
    images:[],
    init,
    deleteImage,
    uploadFiles,
    updateTag
  })
  return self;
};

export default ImageForm 
