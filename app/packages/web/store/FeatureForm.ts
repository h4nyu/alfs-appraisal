import { observable } from "mobx";
import RootApi from "@sivic/api";
import File from "@sivic/core/file"
import Box from "@sivic/core/box"
import Point from "@sivic/core/point"
import BoxStore from "@sivic/web/store/BoxStore"
import FileStore from "@sivic/web/store/FileStore"
import TagStore from "@sivic/web/store/TagStore"
import PointEditor from "@sivic/web/store/PointEditor"
import PointStore from "@sivic/web/store/PointStore"
import Toast from "@sivic/web/store/toast"


export type Form = {
  box?:Box;
  file?: File
  init: (box:Box) => void
  save: () => void;
};

export const Form = (props: {
  api: RootApi,
  pointEditor: PointEditor,
  fileStore?: FileStore,
  pointStore?: PointStore,
  toast?: Toast,
}): Form => {
  const init = async (box:Box) => {
    self.box = box
    box.fileId && await props.fileStore?.fetch({id: box.fileId})
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
  }

  const self = observable<Form>({
    get file() { return getFile()},
    init,
    save,
  })
  return self
};
export default Form

