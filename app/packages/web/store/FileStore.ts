import { observable, computed } from "mobx";
import { Map, List } from "immutable";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import { File, FindFn } from "@sivic/core/file";
import { saveAs } from 'file-saver';
import { MemoryRouter } from "react-router";
import { parseISO } from "date-fns";
import { Level } from "@sivic/web/store"

export type FileStore = {
  files: Map<string, File>;
  fetch: FindFn
  delete: (payload: { id: string }) => void
};

export const FileStore = (args: {
  api: RootApi;
}): FileStore => {
  const { api } = args;
  const fetch:FindFn = async (payload) => {
    const file = await api.file.find(payload)
    if(file instanceof Error) { return file }
    self.files = self.files.set(file.id, file)
    return file
  }
  const delete_ = (payload:{
    id:string
  }) => {
    const { id } = payload
    self.files = self.files.filter(x => x.id !== id)
  }
  const self = observable({
    files: Map<string, File>(),
    fetch,
    delete: delete_
  })
  return self
}
export default FileStore
