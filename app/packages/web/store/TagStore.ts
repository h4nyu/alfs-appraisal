import { observable, computed } from "mobx";
import Tag, { FilterFn, DeleteFn } from "@sivic/core/tag";
import { Map, List } from "immutable";
import { Images } from ".";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import { saveAs } from 'file-saver';
import { keyBy } from "lodash";

export type TagStore = {
  tags: Tag[];
  fetch: FilterFn
  delete: DeleteFn
};

export const TagStore = (args: {
  api: RootApi;
}): TagStore => {
  const { api } = args;
  const fetch:FilterFn = async (paylaod) => {
    const tags = await api.tag.filter(paylaod)
    if(tags instanceof Error) { return tags }
    self.tags = tags
    return self.tags
  }
  const delete_ = async (payload) => {
    self.tags = self.tags.filter(x => x.id !== payload.id)
  }
  const self = observable<TagStore>({
    tags: [],
    fetch,
    delete: delete_
  })
  return self
}

export default TagStore 
