import { observable, computed } from "mobx";
import { Map, List } from "immutable";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import Workspace from "@sivic/core/workspace";
import Image from "@sivic/core/image";
import { saveAs } from 'file-saver';
import { MemoryRouter } from "react-router";
import { take, flow, sortBy, map } from "lodash/fp";
import { parseISO } from "date-fns";
import { Level } from "@sivic/web/store"
import { ImageForm } from "@sivic/web/store/ImageForm"
import { ImageStore } from "@sivic/web/store/ImageStore"
import { BoxStore } from "@sivic/web/store/BoxStore"
import { Tag } from "@sivic/core/tag"
import Box from "@sivic/core/box"
import FileStore from "@sivic/web/store/FileStore"
import TagStore from "@sivic/web/store/TagStore"
import PointStore from "@sivic/web/store/PointStore"

export type WorkspaceFrom = {
  id: string,
  name: string,
  imageForm: ImageForm,
  tags?: Tag[],
  images?: Image[],
  boxes?: Box[],
  init: (id?:string) => void;
  setName: (value:string) => void;
  save: () => Promise<void>;
  delete: (id:string) => Promise<void>;
};

export const WorkspaceFrom = (props: {
  api: RootApi;
  loading: <T>(fn: () => Promise<T>) => Promise<T>;
  toast?: ToastStore;
  imageForm: ImageForm;
  imageStore: ImageStore;
  fileStore?: FileStore;
  tagStore?: TagStore;
  boxStore:BoxStore;
  pointStore?: PointStore,
  onInit?: (workspace:Workspace) => void;
  onCreate?:() => void;
  onSave?: (workspace:Workspace) => void;
  onDelete?: (id:string) => void;
}): WorkspaceFrom => {
  const { api, 
    loading, 
    toast, 
    onInit, 
    onSave, 
    onDelete, 
    imageForm, 
    imageStore, 
    boxStore, 
    onCreate,
    fileStore,
  } = props;
  const reset = () => {
    self.id = ""
    self.name = ""
  }
  const init = async (workspaceId?:string) => {
    if(!workspaceId){
      reset()
      return 
    }
    const row = await api.workspace.find({id: workspaceId})
    if(row instanceof Error) {
      return row
    }
    self.id = row.id
    self.name = row.name
    await imageForm.init(row)
    const images = await imageStore.fetch({workspaceId})
    if(images instanceof Error) { return images }
    await props.tagStore?.fetch({workspaceId})
    for (const image of images){
      const boxes = await props.boxStore?.fetch({ imageId: image.id})
      if(boxes instanceof Error) { return boxes }
      for(const b of boxes){
        b.fileId && await fileStore?.fetch({id: b.fileId})
        await props.pointStore?.fetch({boxId: b.id})
      }
      await fileStore?.fetch({id: image.fileId})
    }
    onInit && onInit(row)
  }


  const setName = (value:string) => {
    self.name = value
  }

  const save = async ():Promise<void> => {
    await loading(async () => {
      const workspace = await (async () => {
        if(self.id){
          return await api.workspace.update({
            id: self.id,
            name:self.name
          });
        }else{
          return await api.workspace.create({name:self.name});
        }
      })()
      if(workspace instanceof Error) {
        props.toast?.error(workspace)
        return 
      }
      await init(workspace.id)
      onSave && onSave(workspace)
      props.toast?.info("Success");
    })
  }

  const _delete = async (id:string):Promise<void> => {
    await loading(async () => {
      const deleteErr = await api.workspace.delete({id});
      if (deleteErr instanceof Error) { return; }
      props.toast?.show("Success", Level.Success);
      props.onDelete?.(id)
    })
  }
  const getTags = () => {
    return props.tagStore?.tags
  }

  const getImages = () => {
    return imageStore.images.filter(x => x.workspaceId === self.id)
  }

  const getBoxes = () => {
    const imageIds = self.images.map(x => x.id)
    return props.boxStore.boxes.filter(b => imageIds.includes(b.imageId))
  }

  const self = observable<WorkspaceFrom>({
    id:"", 
    name:"",
    imageForm,
    init,
    setName,
    save,
    get tags() { return getTags() },
    get images() { return getImages() },
    get boxes() { return getBoxes() },
    delete: _delete
  })
  return self
};
export default WorkspaceFrom
