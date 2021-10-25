import { observable, computed } from "mobx";
import { v4 as uuid } from "uuid";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import { Workspace } from "@sivic/core/workspace";
import { Image } from "@sivic/core/image"
import { saveAs } from 'file-saver';
import { MemoryRouter } from "react-router";
import { take, flow, sortBy, map } from "lodash/fp";
import { parseISO } from "date-fns";
import { Level } from "@sivic/web/store"
import { Box } from "@sivic/core/box";
import Tag from "@sivic/core/tag"
import ImageStore from "@sivic/web/store/ImageStore"
import File from "@sivic/core/file"
import FileStore from "@sivic/web/store/FileStore"
import TagStore from "@sivic/web/store/TagStore"
import BoxStore from "@sivic/web/store/BoxStore"

export type ImageFrom = {
  image?: Image;
  file?: File;
  boxes: Box[] // getter
  lineWidth: number;
  init: (imageId:string) => Promise<void|Error>;
  updateImage: (payload:{name:string}) => Promise<void>;
  save: (payload: {boxes:Box[]}) => Promise<void>;
  delete:() => Promise<void>;
  detectBoxes: () => void;
};

export const ImageFrom = (props: {
  api: RootApi;
  loading: <T>(fn: () => Promise<T>) => Promise<T>;
  imageStore?: ImageStore,
  fileStore?:FileStore,
  boxStore?:BoxStore,
  toast: ToastStore;
}): ImageFrom => {
  const { api, loading, toast, imageStore, boxStore } = props;
  const init = async (imageId:string) => {
    const image = await api.image.find({id:imageId})
    if(image instanceof Error) { return image }
    self.image = image
    if(image.fileId){
      const file = await props.fileStore?.fetch({id: image.fileId})
      if(file instanceof Error) { return file }
      self.file = file
    }
    await props.boxStore?.fetch({imageId: self.image?.id})
  }
  const detectBoxes = async () => {
    const { file } = self
    if(file === undefined) { return }
    const { data } = file
    if(data === undefined) { return}
    await loading(async () => {
      // const boxes = await api.detect.box({data})
      // if(boxes instanceof Error) { return boxes }
      // editor.boxes = Map(boxes.map(x => {
      //   return [uuid(), x]
      // }))
    })
  }

  const save = async ({boxes}) =>{
    const { image } = self
    if(image === undefined){ return }
    const imageId = image.id
    const cropedImages = await api.box.load({
      imageId,
      boxes,
    })
    if(cropedImages instanceof Error){
      toast.error(cropedImages)
      return
    }
    props.imageStore?.delete({parentId: self.image?.id || ""})
    await props.imageStore?.fetch({parentId: self.image?.id})
    await props.boxStore?.delete({imageId: self.image?.id})
    await props.boxStore?.fetch({imageId: self.image?.id})

    for(const b of self.boxes){
      b.fileId && await props.fileStore?.fetch({id: b.fileId})
    }
    toast.info("saved")
  }
  const getBoxes = () => {
    return props.boxStore?.boxes.filter(x => x.imageId === self.image?.id)
  }

  const delete_ = async () =>{
    const { image } = self
    if(image === undefined){ return }
    const imageId = image.id
    const err = await props.api?.image.delete({id:imageId})
    if(err instanceof Error) { return }
    self.image = undefined
    self.file = undefined
    props.imageStore?.delete({ids: [image?.id ?? ""]})
    props.boxStore?.delete({imageId: image?.id ?? ""})
    props.fileStore?.delete({id: image.id})
    toast.info("delete")
  }

  const updateImage = async ({name}) => {
    if(!self.image){ return }
    const image = await props.api.image.update(Image({
      ...self.image,
      name,
    }))
    if(image instanceof Error) {
      props.toast?.error(image)
      return
    }
    self.image = image
    await props.imageStore?.fetch({ids: [image.id]})
    toast.info("update")
  }

  const self = observable<ImageFrom>({
    image: undefined,
    get boxes() { return getBoxes() },
    lineWidth: 10,
    init,
    detectBoxes,
    save,
    delete: delete_,
    updateImage,
  })
  return self
};

export default ImageFrom 
