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
import BoxStore from "@sivic/web/store/BoxStore"
import ImageForm from "@sivic/web/store/ImageForm"
import ImageProcess from "@sivic/web/store/ImageProcess" 
import Editor from "@sivic/web/store/BoxEditor"
import PointEditor from "@sivic/web/store/PointEditor"
import PointStore from "@sivic/web/store/PointStore"
import FileStore from "@sivic/web/store/FileStore"
import TagStore from "@sivic/web/store/TagStore"
import TagForm from "@sivic/web/store/TagForm"
import FeatureForm from "@sivic/web/store/FeatureForm"
import AssignTagForm from "@sivic/web/store/AssignTagForm"


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
  boxStore:BoxStore;
  loadingStore: LoadingStore;
  editor: Editor;
  pointEditor: PointEditor;
  toast: ToastStore;
  history: History;
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
  const workspaceStore = WorkspaceStore({ api, loading, toast });
  const imageStore = ImageStore({ api })
  const pointStore = PointStore({ api })
  const boxStore = BoxStore({ api })
  const history = createHashHistory();
  const tagStore = TagStore({api})

  const editor = Editor({ 
    api, 
    loading,
    boxStore,
    toast,
  })

  const pointEditor = PointEditor({ 
    onInit: (id) => {
      history.push(`/point`)
    },
  })

  const init = async () => {
    await workspaceStore.fetch();
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
    editor,
    onSave: async (workspaceId:string) => {
      workspaceForm.init(workspaceId)
    },
    onDelete: async (workspaceId:string) => {
      workspaceForm.init(workspaceId)
    }
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
    onSave: (workspace) => {
      workspaceStore.fetch()
    },
    onDelete: (id:string) => {
      workspaceStore.fetch()
    }
  })
  const tagForm = TagForm({ 
    api, 
    tagStore, 
    boxStore,
    toast 
  })
  const featureForm = FeatureForm({ 
    api, 
    fileStore, 
    pointStore,
    pointEditor,
    boxStore,
    tagStore,
    toast,
  })

  return {
    api,
    workspaceStore,
    toast,
    loadingStore,
    editor,
    pointEditor,
    init,
    history,
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
