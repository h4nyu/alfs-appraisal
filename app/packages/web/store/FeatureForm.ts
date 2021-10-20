import { observable } from "mobx";
import RootApi from "@sivic/api";
import File from "@sivic/core/file"
import Box from "@sivic/core/box"
import Line from "@sivic/core/line"
import Point, { ResizeFn } from "@sivic/core/point"
import FileStore from "@sivic/web/store/FileStore"
import TagStore from "@sivic/web/store/TagStore"
import PointEditor from "@sivic/web/store/PointEditor"
import PointStore from "@sivic/web/store/PointStore"
import BoxStore from "@sivic/web/store/BoxStore"
import Toast from "@sivic/web/store/toast"
import { getRefLine } from "@sivic/core/line"
import Tag from "@sivic/core/tag"

export type Form = {
  box?:Box;
  tag?:Tag; // getter
  file?: File, // getter
  points?: Point[],
  referenceBox?: Box; // getter
  referenceFile?:File, // getter
  referencePoints?: Point[], // getter
  selectedReferencePoint?: Point, // getter
  referenceLines?: Line[],
  isReference?: boolean, // getter
  lines?: Line[],
  init: (box:Box) => void
  resetPoints: () => void;
  delete: (boxId?: string) => void;
  save: (lines?:Line[]) => Promise<void>;
};

export const Form = (props: {
  api: RootApi,
  pointEditor: PointEditor,
  pointStore: PointStore,
  fileStore?: FileStore,
  boxStore?: BoxStore,
  tagStore?: TagStore,
  toast?: Toast,
}): Form => {

  const resetPoints = () => {
    const { box, referenceBox } = self
    if(box === undefined || referenceBox === undefined) { return }
    const resize = ResizeFn({source:referenceBox, target:box})
    const points =self.referencePoints?.map(p => Point({
      x: p.x,
      y: p.y,
      boxId: p.boxId,
      positionId: p.positionId,
    })).map(resize)
    props.pointEditor.init(points)
  }

  const init = async (box?:Box) => {
    props.pointEditor.init()
    self.box = box
    if(box === undefined) { return }

    box.fileId && await props.fileStore?.fetch({id: box.fileId})
    if(self.referenceBox === undefined) { return }
    self.referenceBox?.id && props.pointStore?.fetch({boxId: self.referenceBox.id})
    self.referenceBox?.fileId && await props.fileStore?.fetch({id: self.referenceBox.fileId})

    const referenceLines = await props.api.line.filter({boxId: self.referenceBox.id})
    if(referenceLines instanceof Error) { return referenceLines }
    self.referenceLines = referenceLines

    const points = await props.pointStore?.fetch({boxId: box.id})
    if(points instanceof Error) { return points }
    if(self.isReference || points.length > 0) {
      props.pointEditor?.init(points)
    }else{
      resetPoints()
    }
  }

  const getPoints = () => {
    return props.pointStore?.points.filter(x => x.boxId === self.box?.id)
  }

  const getTag = () => {
    return props.tagStore?.tags.find(x => x.id === self.box?.tagId)
  }

  const getRefernceBox = () => {
    return props.boxStore?.boxes.find(x => x.id === self.tag?.referenceBoxId && x.tagId === self.tag.id)
  }

  const getRefernceFile = () => {
    return props.fileStore?.files.find(x => x.id === self.referenceBox?.fileId)
  }

  const getReferncePoints = () => {
    return props.pointStore?.points.filter(x => x.boxId === self.referenceBox?.id)
  }

  const getFile = () => {
    return props.fileStore?.files.find(x => x.id === self.box?.fileId)
  }

  const save = async (lines) => {
    const { box } = self
    const points = props.pointEditor.points ?? []
    const err = await props.api.point.load({
      boxId: box.id,
      points
    })
    if(err instanceof Error) { 
      props.toast?.error(err) 
      return 
    }
    if(lines !== undefined) {
      const err = await props.api.line.load({
        boxId: box.id,
        lines
      })
      if(err instanceof Error) { 
        props.toast?.error(err) 
        return 
      }
    }

    props.toast?.info("Success")
    props.pointStore?.delete({boxId: box.id})
    props.pointStore?.fetch({boxId: box.id})
  }

  const generateRefLines = () => {
    let points = (self.isReference ? props.pointEditor?.points : self.referencePoints) ?? []
    const firstLine = getRefLine(points)
    if(!firstLine) { return }
    points = points.filter(p => {
      return (
        !firstLine.start.posEquals(p) && !firstLine.end.posEquals(p)
      )
    })
    const secondLine = getRefLine(points)
    if(!secondLine) { return [firstLine] }
    return [firstLine, secondLine]
  }

  const getLines = () => {
    return self.referenceLines?.map(x => {
      const start = props.pointEditor.points.find(p => p.positionId === x.start.positionId)
      const end = props.pointEditor.points.find(p => p.positionId === x.end.positionId)
      return Line({
        start,
        end,
        boxId: self.box?.id,
      })
    })
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
      init()
    }
    props.boxStore?.delete({id})
  }

  const getIsReference = () => {
    return self.box?.id === self.referenceBox?.id
  }
  const getSelectedReferencePoint = () => {
    const point = props.pointEditor.points.find(p => p.id === props.pointEditor.draggingId)
    return self.referencePoints?.find(p => p.positionId === point?.positionId)
  }

  const self = observable<Form>({
    get file() { return getFile() },
    get tag() { return getTag() },
    get referenceBox() { return getRefernceBox() },
    get referenceFile() { return getRefernceFile() },
    get referencePoints() { return getReferncePoints() },
    get points() { return getPoints() },
    referenceLines: observable([]),
    get isReference() { return getIsReference() },
    get selectedReferencePoint() { return getSelectedReferencePoint() },
    get lines() { return getLines() },
    init,
    resetPoints,
    delete: delete_,
    save,
  })
  return self
};

export default Form
