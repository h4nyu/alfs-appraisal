import { observable } from "mobx";
import RootApi from "@sivic/api";
import File from "@sivic/core/file"
import Box from "@sivic/core/box"
import Point from "@sivic/core/point"
import BoxStore from "@sivic/web/store/BoxStore"
import FileStore from "@sivic/web/store/FileStore"
import TagStore from "@sivic/web/store/TagStore"
import PointEditor from "@sivic/web/store/PointEditor"


export type Form = {
  box?:Box;
  file?: File
  init: (box:Box) => void
  save: () => void;
};

export const Form = (props: {
  api: RootApi,
  pointEditor?: PointEditor,
  boxStore?: BoxStore,
  fileStore?: FileStore,
}): Form => {
  const init = async (box:Box) => {
    self.box = box
    box.fileId && await props.fileStore?.fetch({id: box.fileId})
  }

  const getFile = () => {
    return props.fileStore?.files.find(x => x.id === self.box?.fileId)
  }

  const save = async () => {
    const { box } = self
    if(box === undefined) { return }
    const points = props.pointEditor?.points.map(x => {
      return Point({
        ...x,
        boxId: box.id
      })
    })
    // props.api.point.l
  }

  const self = observable<Form>({
    get file() { return getFile()},
    init,
    save,
  })
  return self
};
export default Form

