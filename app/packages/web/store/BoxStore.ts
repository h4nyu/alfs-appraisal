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
  fetch: FilterFn
};

export const BoxStore = (props: {
  api: Api;
}): BoxStore => {
  const fetch = async (payload) => {
    const boxes = await props.api.box.filter(payload)
    if(boxes instanceof Error) { return boxes }
    self.boxes = uniqBy([...self.boxes, ...boxes], x => x.id);
    return boxes
  }
  const self = observable<BoxStore>({
    boxes: [],
    fetch,
  })
  return self
}

export default BoxStore 
