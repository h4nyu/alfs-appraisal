import { observable, computed } from "mobx";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import { File, FindFn } from "@sivic/core/file";
import { saveAs } from 'file-saver';
import { MemoryRouter } from "react-router";
import { parseISO } from "date-fns";
import { Level } from "@sivic/web/store"
import { uniqBy } from "lodash"

export type FileStore = {
  files: File[];
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
    self.files = uniqBy([file, ...self.files], x => x.id)
    return file
  }
  const delete_ = (payload:{
    id:string
  }) => {
    const { id } = payload
    self.files = self.files.filter(x => x.id !== id)
  }
  const self = observable<FileStore>({
    files: [],
    fetch,
    delete: delete_
  })
  return self
}
export default FileStore
