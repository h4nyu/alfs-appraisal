import { observable } from "mobx";
import { Map, List } from "immutable";
import { RootApi } from "@sivic/api";
import { LoadingStore } from "./loading";
import { ToastStore } from "./toast";
import Point from "@sivic/core/point";
import { File } from "@sivic/core/file"
import { Box } from "@sivic/core/box";
import { v4 as uuid } from "uuid";
import { keyBy, zip, uniqBy } from "lodash";
import { rotatePoint, getBaseline} from "@sivic/core/utils"; import { Image } from "@sivic/core/image"
import Line from "@sivic/core/line"
import { ImageStore } from "@sivic/web/store/ImageStore"
import PointStore from "@sivic/web/store/PointStore"
import LineEditor from "@sivic/web/store/LineEditor"
export enum InputMode {
  Add = "Add",
  Edit = "Edit",
}

export type Editor = {
  files: File[];
  imageId: string;
  points: Point[];
  draggingId: string | undefined;
  pos: {x:number, y:number},
  size: number;
  mode: InputMode;
  toggleDrag: (id: string, mode: InputMode) => void;
  setMode: (mode: InputMode) => void;
  add: () => void;
  move: (pos: { x: number; y: number }) => void;
  del: () => void;
  changeSize: (size: number) => void;
  init: (imageId: string) => void;
  clear: () => void;
  save:() => void;
};

export const Editor = (props: {
  api: RootApi;
  pointStore: PointStore;
  lineEditor: LineEditor;
  loading: <T>(fn: () => Promise<T>) => Promise<T>;
  toast: ToastStore;
  onInit?: (id: string) => void;
  onDelete?: (id: string) => void;
}): Editor => {
  const {
    api,
    loading,
    toast,
    onInit,
    onDelete,
    pointStore,
    lineEditor,
  } = props;

  const init = async (boxId:string) => {
    props.onInit?.(boxId)
  };
  const getPoints = () => {
  }

  const clear = () => {
    self.points = [];
  };

  const setMode = (mode: InputMode) => {
    self.mode = mode;
  };

  const toggleDrag = (id: string, mode: InputMode) => {
    const { draggingId } = self;
    if (draggingId === id) {
      self.draggingId = undefined;
    } else {
      self.draggingId = id;
    }
    setMode(mode);
  };

  const move = (pos: { x: number; y: number }) => {
    const { points, draggingId, mode } = self;
    self.pos = pos;
    if (draggingId === undefined) {
      return;
    }
    if (mode === InputMode.Edit) {
      const point = points.find(p => p.id === draggingId);
      if (point === undefined) {
        return;
      }
      const newPoint = Point({...point, x: pos.x, y: pos.y})
      self.points = uniqBy([
        ...self.points,
        newPoint,
      ], x => x.id)
    } 
  };

  const add = () => {
    const { mode, pos, points } = self;
    if ((self.draggingId = undefined)) {
      self.draggingId = undefined;
      return;
    }
    const newId = uuid();
    if (
      [
        InputMode.Add,
        InputMode.Edit,
      ].includes(mode)
    ) {
      const newPoint = Point({
        x: pos.x,
        y: pos.y,
      })
      self.points = [...self.points, newPoint]
      self.draggingId = newPoint.id;
      setMode(InputMode.Edit);
    }
  };

  const del = () => {
    const { points, draggingId } = self;
    self.points = points.filter(p => p.id !== draggingId);
    self.draggingId = undefined;
  };

  const changeSize = (value: number) => {
    self.size = value;
  };

  const save = async () => {
    // const pointErr = await api.image.replacePoints({
    //   imageId: self.imageId, 
    //   // points: self.points
    // })
    // if(pointErr instanceof Error) { return pointErr }
    // const lines:{
    //   id: string,
    //   x0: number,
    //   y0: number,
    //   x1: number,
    //   y1: number,
    // }[] = lineEditor.lines;
    // const lineErr = await api.image.replaceLines({
    //   imageId: self.imageId, 
    //   lines,
    // })
    // if(lineErr instanceof Error) { return lineErr }
  };

  const self = observable<Editor>({
    imageId: "",
    points: [],
    draggingId: undefined,
    size: 10,
    files: [],
    pos: { x: 0, y:0 },
    mode: InputMode.Add,
    setMode,
    toggleDrag,
    move,
    changeSize,
    add,
    del,
    init,
    clear,
    save,
  })

  return self
};
export default Editor
