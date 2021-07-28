import { observable, computed } from "mobx";
import { Box, FilterFn } from "@sivic/core/box";
import { LoadingStore } from "./loading";
import Api from "@sivic/api";
import {
  Image,
} from "@sivic/core/image";
import { saveAs } from 'file-saver';
import { uniqBy } from "lodash";

export type BoxStore = {
  boxes: Box[];
  fetch: FilterFn;
  delete: (payload: { id?: string, imageId?: string, ids?:string[] }) => void;
};

export const BoxStore = (props: {
  api: Api;
}): BoxStore => {
  const fetch = async (payload) => {
    const boxes = await props.api.box.filter(payload)
    if(boxes instanceof Error) { return boxes }
    self.boxes = uniqBy([...boxes, ...self.boxes], x => x.id);
    return boxes
  }

  const delete_ = async (payload:{
    id?: string,
    imageId?:string,
    ids?: string[],
  }) => {
    if(payload.id){
      self.boxes = self.boxes.filter(x => x.id !== payload.id)
    }else if (payload.imageId){
      self.boxes = self.boxes.filter(x => x.imageId !== payload.imageId)
    }else if(payload.ids){
      self.boxes = self.boxes.filter(x => !payload.ids?.includes(x.id))
    }
    console.log(self.boxes)
  }

  const self = observable<BoxStore>({
    boxes: [],
    fetch,
    delete: delete_
  })
  return self
}

export default BoxStore 
