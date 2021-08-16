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


export type Form = {
  box?:Box;
  file?: File,
  tagId?: string;
  refLines?: Line[],
  setTagId:(value?:string) => void;
  init: (box:Box) => void
  delete: (boxId?: string) => void;
  save: () => void;
};

export const Form = (props: {
  api: RootApi,
  pointEditor: PointEditor,
  fileStore?: FileStore,
  pointStore?: PointStore,
  boxStore?: BoxStore,
  tagStore?: TagStore,
  toast?: Toast,
}): Form => {
  const reset = () => {
    self.box = undefined;
    self.tagId = undefined;
  }
  const init = async (box:Box) => {
    self.box = box
    box.fileId && await props.fileStore?.fetch({id: box.fileId})
    self.tagId = box.tagId
    const points = await props.pointStore?.fetch({boxId: box.id})
    if(points instanceof Error) { return points }
    props.pointEditor?.init(points)
  }

  const getFile = () => {
    return props.fileStore?.files.find(x => x.id === self.box?.fileId)
  }

  const save = async () => {
    const { box } = self
    if(box === undefined) { return }
    const points = props.pointEditor?.points ?? []
    const err = await props.api.point.load({
      boxId: box.id,
      points
    })
    if(err instanceof Error) { 
      props.toast?.error(err) 
      return 
    }
    props.toast?.info("Success")
    props.pointStore?.delete({boxId: box.id})
    props.pointStore?.fetch({boxId: box.id})
    props.boxStore?.delete({imageId: box.imageId})
    props.boxStore?.fetch({imageId: box.imageId})
  }
  const setTagId = async (value?:string) => {
    self.tagId = value
    const { box } = self
    if(box === undefined) { return }
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
  const getRefLines = () => {
    let points = props.pointEditor?.points ?? []
    const firstLine = getRefLine(points)
    return []
    // if(!firstLine) { return }
    // points = points.filter(p => {
    //   return (
    //     !firstLine.start.posEquals(p) && !firstLine.end.posEquals(p)
    //   )
    // })
    // const secondLine = getRefLine(points)
    // if(!secondLine) { return [firstLine] }
    // return [firstLine, secondLine]
  }
  const delete_ = async (boxId?: string) => {
    const id = boxId ?? self.box?.id
    if(id === undefined) { return }
    const err = await props.api.box.delete({id})
    if(err instanceof Error) {
      props.toast?.error(err)
      return err
    }
    if(boxId === undefined){
      reset()
    }
    props.boxStore?.delete({id})
  }

  const self = observable<Form>({
    get file() { return getFile() },
    get refLines() { return getRefLines() },
    init,
    setTagId,
    delete: delete_,
    save,
  })
  return self
};
export default Form

