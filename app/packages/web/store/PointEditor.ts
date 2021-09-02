import { observable } from "mobx";
import { Map, List } from "immutable";
import { Point, colors } from "@sivic/core/point";
import { File } from "@sivic/core/file"
import { Box } from "@sivic/core/box";
import { v4 as uuid } from "uuid";
import { keyBy, zip, uniqBy, sortBy } from "lodash";
import Line from "@sivic/core/line"
import { ImageStore } from "@sivic/web/store/ImageStore"
import PointStore from "@sivic/web/store/PointStore"

export enum InputMode {
  Add = "Add",
  Edit = "Edit",
}

export type Editor = {
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
  init: (points?:Point[]) => void;
  clear: () => void;
};

export const Editor = (props: {
  onInit?: (id: string) => void;
  onDelete?: (id: string) => void;
}): Editor => {
  const {
    onInit,
    onDelete,
  } = props;

  const init = async (points) => {
    self.points = points ?? []
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
      self.points = self.points.map(p => {
        if(p.id === draggingId){
          return Point({...p, x: pos.x, y: pos.y})
        }
        return p
      });
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
      self.points.push(newPoint);
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


  const self = observable<Editor>({
    points: observable([]),
    draggingId: undefined,
    size: 10,
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
  })
  return self
};
export default Editor
