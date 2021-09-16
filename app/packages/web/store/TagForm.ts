import { observable, computed } from "mobx";
import { Map, List } from "immutable";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import Workspace from "@sivic/core/workspace";
import Image from "@sivic/core/image";
import Box from "@sivic/core/box"
import { saveAs } from 'file-saver';
import { MemoryRouter } from "react-router";
import { take, flow, sortBy, map, join, pipe } from "lodash/fp";
import { parseISO } from "date-fns";
import { Level } from "@sivic/web/store"
import { ImageForm } from "@sivic/web/store/ImageForm"
import { ImageStore } from "@sivic/web/store/ImageStore"
import BoxStore from "@sivic/web/store/BoxStore"
import Line, { getRefLines } from "@sivic/core/line"
import { normalizePoints } from "@sivic/core/point"
import { Tag } from "@sivic/core/tag"
import FileStore from "@sivic/web/store/FileStore"
import TagStore from "@sivic/web/store/TagStore"
import PointStore from "@sivic/web/store/PointStore"
import Summary from "@sivic/core/summary"


export type Form = {
  tag?: Tag,
  id: string,
  name: string,
  workspaceId?: string,
  referenceBoxId?:string,
  refLines?: Line[],
  boxes?:Box[],
  summaryPairs?: Summary[][],
  init: (props?:{id?:string, workspaceId?: string}) => Promise<void|Error>
  save: () => Promise<void | Error>
  delete?: () => Promise<void>;
  setName: (value:string) => void;
  setWorkspaceId: (value?: string) => void;
  setReferenceBoxId: (value?: string) => void;
};

export const Form = (props: {
  api: RootApi;
  tagStore?: TagStore;
  boxStore?: BoxStore;
  pointStore?: PointStore;
  toast?: ToastStore;
  onInit?: () => void;
  onDelete?: (tagId:string) => void;
}): Form => {
  const init = async (state?:{id?: string, workspaceId?:string}) => {
    self.tag = undefined;
    self.id = state?.id ?? ""
    self.name = ""
    self.workspaceId = state?.workspaceId
    self.referenceBoxId = undefined
    if(self.id !== "") {
      const tag = await props.api.tag.find({id: self.id})
      if(tag instanceof Error) { return tag }
      self.tag = tag
      self.id = tag.id
      self.name = tag.name
      self.workspaceId = tag.workspaceId
      self.referenceBoxId = tag.referenceBoxId
    }
    props.onInit?.()
  }
  const setReferenceBoxId = (value?:string) => {
    self.referenceBoxId = value
  }
  const setName = (value:string) => {
    self.name = value
  }
  const setWorkspaceId = (value?: string) =>{
    self.workspaceId = value
  }
  const save = async () =>{
    const tag = await (async () => {
      if(self.tag === undefined){
        return await props.api.tag.create({
          name: self.name,
          workspaceId: self.workspaceId,
          referenceBoxId: self.referenceBoxId,
        })
      }else{
        return await props.api.tag.update({
          id: self.id,
          name: self.name,
          workspaceId: self.workspaceId,
          referenceBoxId: self.referenceBoxId,
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
  const getDelete = () => {
    if(self.id === "") { return }
    return async () => {
      const imageIds = props.boxStore?.boxes.filter(x => x.tagId === self.id).map(x => x.imageId) || []
      const err = await props.api.tag.delete({id:self.id})
      if(err instanceof Error) {
        props.toast?.error(err)
        return
      }
      props.tagStore?.delete({id:self.id})
      for(const imageId of imageIds){
        await props.boxStore?.fetch({imageId})
      }
      props.toast?.info("Success")
      props.onDelete?.(self.id)
    }
  } 
  const getBoxes = () => {
    return self.id && props.boxStore?.boxes.filter(x => x.tagId === self.id)
  }
  const _refLines = () => {
    const points = props.pointStore?.points.filter(x => x.boxId === self.referenceBoxId) ?? []
    return getRefLines({points})
  }

  const getSummaryPairs = () => {
    return self.refLines?.map(refLine => {
      return self.boxes?.map(box => {
        const points = props.pointStore?.points.filter(x => x.boxId === box.id) ?? []
        const start = points.find(p => p.positionId === refLine.start.positionId)
        const end = points.find(p => p.positionId === refLine.end.positionId)
        const line = Line({
          start,
          end,
        })
        return {
          box,
          line,
          points: normalizePoints({
            line,
            points,
          })
        }
      })
    })
  }

  const self = observable<Form>({
    tag: undefined,
    id:"", 
    name:"",
    workspaceId: undefined,
    setName,
    setWorkspaceId,
    setReferenceBoxId,
    init,
    get delete() { return getDelete() },
    get boxes() { return getBoxes() },
    get summaryPairs() { return getSummaryPairs() },
    get refLines() { return _refLines() },
    save,
  })
  return self
};
export default Form
