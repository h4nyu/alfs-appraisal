import { observable, computed } from "mobx";
import { Map, List } from "immutable";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import Workspace from "@sivic/core/workspace";
import Image from "@sivic/core/image";
import { saveAs } from 'file-saver';
import { MemoryRouter } from "react-router";
import { take, flow, sortBy, map } from "lodash/fp";
import { parseISO } from "date-fns";
import { Level } from "@sivic/web/store"
import { ImageForm } from "@sivic/web/store/ImageForm"
import { ImageStore } from "@sivic/web/store/ImageStore"
import { BoxStore } from "@sivic/web/store/BoxStore"
import { Tag } from "@sivic/core/tag"
import FileStore from "@sivic/web/store/FileStore"
import TagStore from "@sivic/web/store/TagStore"


export type Form = {
  id: string,
  name: string,
  workspaceId?: string,
  init: (props?:{id?:string, workspaceId?: string}) => Promise<void|Error>
  save: () => Promise<void|Error>
  setName: (value:string) => void;
  setWorkspaceId: (value?: string) => void;
};

export const Form = (props: {
  api: RootApi;
  tagStore?: TagStore;
  toast?: ToastStore;
  onInit?: () => void;
}): Form => {
  const init = async (state?:{id?: string, workspaceId?:string}) => {
    self.id = state?.id ?? ""
    self.name = ""
    self.workspaceId = state?.workspaceId
    if(self.id !== "") {
      const tag = await props.api.tag.find({id: self.id})
      if(tag instanceof Error) { return tag }
      self.id = tag.id
      self.name = tag.name
      self.workspaceId = tag.workspaceId
    }
    props.onInit?.()
  }
  const setName = (value:string) => {
    self.name = value
  }
  const setWorkspaceId = (value?: string) =>{
    self.workspaceId = value
  }
  const save = async () =>{
    const tag = await (async () => {
      if(self.id === ""){
        return await props.api.tag.create({
          name: self.name,
          workspaceId: self.workspaceId,
        })
      }else{
        return await props.api.tag.update({
          id: self.id,
          name: self.name,
          workspaceId: self.workspaceId
        })
      }
    })()
    if(tag instanceof Error) { 
      props.toast?.error(tag)
      return tag 
    }
    await props.tagStore?.fetch({workspaceId: self.workspaceId})
    props.toast?.info("Success")
  }
  const self = observable<Form>({
    id:"", 
    name:"",
    workspaceId: undefined,
    setName,
    setWorkspaceId,
    init,
    save,
  })
  return self
};
export default Form
