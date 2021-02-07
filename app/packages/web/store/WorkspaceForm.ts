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

export type State = {
  id: string
  name: string;
};

export type WorkspaceFrom = {
  state: State;
  init: (id?:string) => Promise<void>;
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
  onInit?: (workspace:Workspace) => void;
  onSave?: (workspace:Workspace) => void;
  onDelete?: (id:string) => void;
}): WorkspaceFrom => {
  const { api, loading, toast, onInit, onSave, onDelete } = args;
  const state = observable(State());
  const reset = () => {
    const {id, name } = State()
    state.id = id
    state.name = name
  }

  const init = async (id?:string) => {
    if(!id){
      reset()
      return 
    }
    await loading(async () => {
      const row = await api.workspace.find({id})
      if(row instanceof Error) {
        return row
      }
      state.id = row.id
      state.name = row.name
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
    init,
    setName,
    save,
    delete: _delete
  }
};
export default WorkspaceFrom
