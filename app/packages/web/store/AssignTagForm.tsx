import { observable } from "mobx";
import RootApi from "@sivic/api";
import File from "@sivic/core/file"
import Box from "@sivic/core/box"
import Line from "@sivic/core/line"
import Point from "@sivic/core/point"
import FileStore from "@sivic/web/store/FileStore"
import TagStore from "@sivic/web/store/TagStore"
import PointEditor from "@sivic/web/store/PointEditor"
import PointStore from "@sivic/web/store/PointStore"
import BoxStore from "@sivic/web/store/BoxStore"
import Toast from "@sivic/web/store/toast"
import { getRefLine } from "@sivic/core/utils"
import Tag from "@sivic/core/tag"


export type AssignTagForm = {
  tagId?: string;
  setTagId: (tagId?:string) => void
  assign: (box:Box) => void
};

export const AssignTagForm = (props: {
  api: RootApi,
  boxStore?: BoxStore,
  toast?: Toast,
}): AssignTagForm => {
  const setTagId = async (value?:string) => {
    self.tagId = value
  }
  const assign = async (box:Box) => {
    if(box.tagId === self.tagId) { return }
    const updateErr = await props.api.box.update({
      box: Box({
        ...box,
        tagId: self.tagId,
      })
    })
    if(updateErr instanceof Error) { 
      props.toast?.error(updateErr) 
      return 
    }
    props.boxStore?.fetch({ imageId: box.imageId})
  }
  const self = observable<AssignTagForm>({
    setTagId,
    assign,
  })

  return self
};
export default AssignTagForm


