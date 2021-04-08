import { LoadingStore } from "./loading";
import { ToastStore } from "./toast";
import { RootApi } from "@sivic/api";
import { configure } from "mobx";
import { Map, List } from "immutable";
import { createHashHistory } from "history";
import { Workspace } from "@sivic/core/workspace";
import { Image } from "@sivic/core/image";
import WorkspaceForm from "@sivic/web/store/WorkspaceForm"
import { WorkspaceStore } from "@sivic/web/store/WorkspaceStore"
import { ImageStore } from "@sivic/web/store/ImageStore"
import ImageForm from "@sivic/web/store/ImageForm"
import ImageProcess from "@sivic/web/store/ImageProcess"
import Editor from "@sivic/web/store/BoxEditor"

configure({
  enforceActions: "never",
});

export type Workspaces = List<Workspace>;
export type Images = List<Image>;
export enum Level {
  Info,
  Success,
  Warning,
  Error,
}
export type LoadingFn =  <T>(fn: () => Promise<T>) => Promise<T>;

export type History = {
  push: (name: string) => void;
  goBack: () => void;
};

export type RootStore = {
  workspaceStore: WorkspaceStore;
  imageStore: ImageStore;
  loadingStore: LoadingStore;
  editor: Editor;
  toast: ToastStore;
  history: History;
  api: RootApi;
  workspaceForm: WorkspaceForm;
  imageForm: ImageForm;
  imageProcess: ImageProcess;
  init: () => Promise<void>;
};
export const RootStore = (): RootStore => {
  const api = RootApi();
  const loadingStore = LoadingStore();
  const loading = loadingStore.loading;
  const toast = ToastStore();
  const workspaceStore = WorkspaceStore({ api, loading, toast });
  const imageStore = ImageStore({ api, loading, toast})
  const history = createHashHistory();
  const editor = Editor({})

  const init = async () => {
    await workspaceStore.fetch();
    toast.show("Success", Level.Success);
  };

  const imageForm = ImageForm({
    api,
    loading,
    toast,
    onSave: async (workspaceId:string) => {
      workspaceForm.update(workspaceId)
    }
  })
  const imageProcess = ImageProcess({
    api,
    loading,
    toast,
    onInit: (workspaceId, imageId) => {
      history.push(`/workspace/id/${workspaceId}/image-id/${imageId}`)
    }
  })
  const workspaceForm = WorkspaceForm({
    api,
    loading,
    toast,
    imageForm,
    onInit: (workspace) => {
      history.push(`/workspace/id/${workspace.id}`)
      imageStore.fetch(workspace.id)
    },
    onCreate: () => {
      history.push(`/workspace/create`)
    },
    onSave: (workspace) => {
      workspaceStore.fetch()
    },
    onDelete: (id:string) => {
      workspaceStore.fetch()
    }
  })

  return {
    api,
    workspaceStore,
    toast,
    loadingStore,
    editor,
    init,
    history,
    workspaceForm,
    imageStore,
    imageForm,
    imageProcess,
  };
};

export default RootStore();
