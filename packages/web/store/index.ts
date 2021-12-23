import { LoadingStore } from "./loading";
import { ToastStore } from "./toast";
import { RootApi } from "@sivic/api";
import { configure } from "mobx";
import { createHashHistory } from "history";
import { Workspace } from "@sivic/core/workspace";
import { Image } from "@sivic/core/image";
import WorkspaceForm from "@sivic/web/store/WorkspaceForm"
import { WorkspaceStore } from "@sivic/web/store/WorkspaceStore"
import { ImageStore } from "@sivic/web/store/ImageStore"
import BoxStore from "@sivic/web/store/BoxStore"
import ImageForm from "@sivic/web/store/ImageForm"
import ImageProcess from "@sivic/web/store/ImageProcess" 
import PointStore from "@sivic/web/store/PointStore"
import FileStore from "@sivic/web/store/FileStore"
import TagStore from "@sivic/web/store/TagStore"
import TagForm from "@sivic/web/store/TagForm"
import FeatureForm from "@sivic/web/store/FeatureForm"
import AssignTagForm from "@sivic/web/store/AssignTagForm"


configure({
  enforceActions: "never",
});


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
  boxStore:BoxStore;
  loadingStore: LoadingStore;
  toast: ToastStore;
  api: RootApi;
  workspaceForm: WorkspaceForm;
  imageForm: ImageForm;
  imageProcess: ImageProcess;
  pointStore: PointStore;
  fileStore: FileStore;
  tagStore: TagStore;
  tagForm: TagForm;
  featureForm: FeatureForm;
  assignTagForm: AssignTagForm;
  init: () => Promise<void>;
};
export const RootStore = (): RootStore => {
  const api = RootApi();
  const loadingStore = LoadingStore();
  const loading = loadingStore.loading;
  const toast = ToastStore();
  const fileStore = FileStore({ api })
  const workspaceStore = WorkspaceStore({ api });
  const imageStore = ImageStore({ api })
  const pointStore = PointStore({ api })
  const boxStore = BoxStore({ api })
  const tagStore = TagStore({api})

  const init = async () => {
    await workspaceStore.fetch({});
    toast.show("Success", Level.Success);
  };

  const imageForm = ImageForm({
    api,
    loading,
    toast,
    imageStore,
    onSave: async (workspaceId:string) => {
      workspaceForm.init(workspaceId)
    }
  })
  const imageProcess = ImageProcess({
    api,
    loading,
    toast,
    imageStore,
    fileStore,
    boxStore,
  })
  const assignTagForm = AssignTagForm({
    api,
    toast,
    boxStore,
  })
  const workspaceForm = WorkspaceForm({
    api,
    loading,
    toast,
    imageForm,
    imageStore,
    tagStore,
    boxStore,
    fileStore,
    pointStore,
    workspaceStore,
  })
  const tagForm = TagForm({ 
    api, 
    tagStore, 
    boxStore,
    pointStore,
    toast 
  })
  const featureForm = FeatureForm({ 
    api, 
    fileStore, 
    pointStore,
    boxStore,
    tagStore,
    toast,
  })

  return {
    api,
    workspaceStore,
    toast,
    loadingStore,
    init,
    workspaceForm,
    imageStore,
    boxStore,
    pointStore,
    imageForm,
    imageProcess,
    fileStore,
    tagStore,
    tagForm,
    featureForm,
    assignTagForm,
  };
};

export default RootStore();
