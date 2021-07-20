import { observable, computed } from "mobx";
import { Map, List } from "immutable";
import { v4 as uuid } from "uuid";
import { Workspaces } from ".";
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
import Editor from "@sivic/web/store/BoxEditor"
import ImageStore from "@sivic/web/store/ImageStore"
import File from "@sivic/core/file"
import FileStore from "@sivic/web/store/FileStore"

export type ImageProcess = {
  image?: Image;
  file?: File;
  lineWidth: number;
  init: (imageId:string) => Promise<void|Error>;
  save: () => void
  detectBoxes: () => void;
};

export const ImageProcess = (props: {
  api: RootApi;
  loading: <T>(fn: () => Promise<T>) => Promise<T>;
  imageStore: ImageStore,
  toast: ToastStore;
  onInit?: (imageId:string) => void
  editor: Editor
  fileStore?:FileStore,
}): ImageProcess => {
  const { api, loading, toast, onInit, editor, imageStore } = props;

  const init = async (imageId:string) => {
    await loading(async () => {
      const image = await api.image.find({id:imageId})
      if(image instanceof Error) { return image }
      self.image = image
      if(image.fileId){
        const file = await props.fileStore?.fetch({id: image.fileId})
        if(file instanceof Error) { return file }
        self.file = file
      }
      const boxes = await api.box.filter({imageId})
      if(boxes instanceof Error) { return boxes }
      editor.boxes = Map(boxes.map(x => [uuid(), x]))
      onInit && onInit(imageId)
    })
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

  const save = async () =>{
    const { image } = self
    if(image === undefined){ return }
    const boxes = editor.boxes.toList().toArray()
    await loading(async () => {
      const imageId = image.id
      const cropedImages = await api.image.replaceBoxes({
        imageId,
        boxes: boxes.map(x => Box({...x, imageId})),
      })
      if(cropedImages instanceof Error){
        toast.error(cropedImages)
        return
      }
      imageStore.delete({parentId: self.image?.id || ""})
      await imageStore.fetch({parentId: self.image?.id})
      toast.info("saved")
    })
  }

  const self = observable<ImageProcess>({
    image: undefined,
    lineWidth: 10,
    init,
    detectBoxes,
    save,
  })
  return self
};
export default ImageProcess 
