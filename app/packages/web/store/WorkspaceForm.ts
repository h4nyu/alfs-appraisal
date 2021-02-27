import { observable, computed } from "mobx";
import { Map, List } from "immutable";
import { Workspaces } from ".";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import {
  Workspace,
} from "@sivic/core/workspace";
import { saveAs } from 'file-saver';
import { MemoryRouter } from "react-router";
import { take, flow, sortBy, map } from "lodash/fp";
import { parseISO } from "date-fns";
import { Level } from "@sivic/web/store"
import { readAsBase64, b64toBlob } from "@charpoints/web/utils";
import { ImageForm } from "@sivic/web/store/ImageForm"


export type State = {
  id: string
  name: string;
};

export type WorkspaceFrom = {
  state: State;
  imageForm: ImageForm,
  create: () => void;
  update: (id:string) => void;
  setName: (value:string) => void;
  save: () => Promise<void>;
  delete: (id:string) => Promise<void>;
};

const State = ():State => {
  return {
    id: "",
    name: "",
  };
};

export const WorkspaceFrom = (args: {
  api: RootApi;
  loading: <T>(fn: () => Promise<T>) => Promise<T>;
  toast: ToastStore;
  imageForm: ImageForm;
  onInit?: (workspace:Workspace) => void;
  onCreate?:() => void;
  onSave?: (workspace:Workspace) => void;
  onDelete?: (id:string) => void;
}): WorkspaceFrom => {
  const { api, loading, toast, onInit, onSave, onDelete, imageForm, onCreate } = args;
  const state = observable(State());
  const reset = () => {
    const {id, name } = State()
    state.id = id
    state.name = name
  }

  const create = async () => {
    reset()
    onCreate && onCreate()
  }


  const update = async (id:string) => {
    await loading(async () => {
      const row = await api.workspace.find({id})
      if(row instanceof Error) {
        return row
      }
      state.id = row.id
      state.name = row.name
      await imageForm.init(row)
      onInit && onInit(row)
    })
  }

  const setName = (value:string) => {
    state.name = value
  }

  const save = async ():Promise<void> => {
    await loading(async () => {
      const row = await api.workspace.create({name:state.name});
      if (row instanceof Error) {
        toast.error(row)
        return;
      }
      onSave && onSave(row)
      toast.show("Success", Level.Success);
    })
  }

  const _delete = async (id:string):Promise<void> => {
    await loading(async () => {
      const row = await api.workspace.delete({id});
      if (row instanceof Error) {
        return;
      }
      onDelete && onDelete(row)
      toast.show("Success", Level.Success);
    })
  }

  return {
    state,
    imageForm,
    create,
    update,
    setName,
    save,
    delete: _delete
  }
};
export default WorkspaceFrom
