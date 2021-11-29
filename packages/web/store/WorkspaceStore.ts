import { observable, computed } from "mobx";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import {
  Workspace, FilterFn
} from "@sivic/core/workspace";
import { saveAs } from 'file-saver';
import { MemoryRouter } from "react-router";
import { keyBy } from "lodash";
import { parseISO } from "date-fns";
import { Level } from "@sivic/web/store"
import { ImageForm } from "@sivic/web/store/ImageForm"

export type WorkspaceStore = {
  workspaces: Workspace[];
  fetch: FilterFn
};

export const WorkspaceStore = (args: {
  api: RootApi;
}): WorkspaceStore => {
  const { api } = args;
  const fetch = async (payload) => {
    const workspaces = await api.workspace.filter(payload)
    if(workspaces instanceof Error) { return workspaces }
    self.workspaces = workspaces
    return workspaces
  }
  const self = observable<WorkspaceStore>({
    workspaces: [],
    fetch,
  })
  return self
}
export default WorkspaceStore
