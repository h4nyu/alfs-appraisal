import { observable } from "mobx";
import RootApi from "@sivic/api";
import File from "@sivic/core/file"
import Box from "@sivic/core/box"
import Line from "@sivic/core/line"
import Point, { ResizeFn } from "@sivic/core/point"
import FileStore from "@sivic/web/store/FileStore"
import TagStore from "@sivic/web/store/TagStore"
import PointStore from "@sivic/web/store/PointStore"
import BoxStore from "@sivic/web/store/BoxStore"
import Toast from "@sivic/web/store/toast"
import { getRefLine } from "@sivic/core/line"
import Tag from "@sivic/core/tag"
import { difference } from "lodash"

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
  save: (payload: {lines?:Line[], points:Point[]}) => Promise<void>;
};

export const Form = (props: {
  api: RootApi,
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
    self.points = points
  }

  const init = async (box?:Box) => {
    self.box = box
    if(box === undefined) { return }

    box.fileId && await props.fileStore?.fetch({id: box.fileId})
    if(self.referenceBox === undefined) { return }
    self.referenceBox?.id && props.pointStore?.fetch({boxId: self.referenceBox.id})
    self.referenceBox?.fileId && await props.fileStore?.fetch({id: self.referenceBox.fileId})

    const referenceLines = await props.api.line.filter({boxId: self.referenceBox.id})
    if(referenceLines instanceof Error) { return referenceLines }
    self.referenceLines = referenceLines
    await props.pointStore?.fetch({boxId: box.id})
  }

  const getRefernceBox = () => {
    return props.boxStore?.boxes.find(x => x.id === self.tag?.referenceBoxId && x.tagId === self.tag.id)
  }

  const getReferncePoints = () => {
    return props.pointStore?.points.filter(x => x.boxId === self.referenceBox?.id)
  }

  const getPoints = () => {
    const points =  props.pointStore?.points.filter(x => x.boxId === self.box?.id)
    const diffPositionIds = difference(
      self.referencePoints.map(x => x.positionId),
      points.map(x => x.positionId), 
    )
    const defaultPoints = self.referencePoints
      .filter(x => diffPositionIds.includes(x.positionId))
      .map(p => {
        return Point({
          x: p.x,
          y:p.y,
          positionId: p.positionId,
          boxId: self.box.id,
        })
      })
    return [...points, ...defaultPoints]
  }

  const getTag = () => {
    return props.tagStore?.tags.find(x => x.id === self.box?.tagId)
  }


  const getRefernceFile = () => {
    return props.fileStore?.files.find(x => x.id === self.referenceBox?.fileId)
  }


  const getFile = () => {
    return props.fileStore?.files.find(x => x.id === self.box?.fileId)
  }


  const generateRefLines = () => {
    let points = (self.isReference ? self.points : self.referencePoints) ?? []
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
      const start = self.points.find(p => p.positionId === x.start.positionId)
      const end = self.points.find(p => p.positionId === x.end.positionId)
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

  const save = async ({lines, points}:{
    points:Point[];
    lines?:Line[];
  }) => {
    const { box } = self
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
    if(self.isReference){
      difference(
        self.points.map(x => x.positionId), 
        points.map(x => x.positionId),
      ).forEach(positionId =>{
        props.pointStore?.delete({positionId})
      })
    }
    props.pointStore?.delete({boxId: box.id})
    props.pointStore?.fetch({boxId: box.id})
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
    get lines() { return getLines() },
    init,
    resetPoints,
    delete: delete_,
    save,
  })
  return self
};

export default Form
