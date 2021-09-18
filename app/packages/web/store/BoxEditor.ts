import { observable } from "mobx";
import { RootApi } from "@sivic/api";
import { LoadingStore } from "./loading";
import { ToastStore } from "./toast";
import  Box from "@sivic/core/box";
import { v4 as uuid } from "uuid";
import { keyBy, zip, uniqBy } from "lodash";
import BoxStore from "@sivic/web/store/BoxStore"

export enum InputMode {
  Box = "Box",
  TL = "TL",
  TR = "TR",
  BL = "BL",
  BR = "BR",
}

export type Editor = {
  boxes: Box[];
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
  init: (id: string) => void;
  clear: () => void;
};

export const Editor = (root: {
  api: RootApi;
  loading: <T>(fn: () => Promise<T>) => Promise<T>;
  toast: ToastStore;
  boxStore?:BoxStore;
  onInit?: (id: string) => void;
  onDelete?: (id: string) => void;
}): Editor => {
  const {
    api,
    loading,
    toast,
    boxStore,
    onInit,
    onDelete,
  } = root;
  const init = async (id: string) => {
  };
  const clear = () => {
    self.boxes = [];
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
      const box = self.boxes.find(x => x.id === id);
      if (box === undefined) {
        return;
      }
      self.boxes = uniqBy([
        Box({
          ...box,
        }),
        ...self.boxes,
      ], x => x.id)
    }
    setMode(mode);
  };

  const move = (pos: { x: number; y: number }) => {
    const { boxes, draggingId, mode } = self;
    self.pos = pos;
    if (draggingId === undefined) {
      return;
    }
    const newBox = (() => {
      const box = boxes.find(x => x.id === draggingId);
      if (box === undefined) {
        return;
      }
      if (mode === InputMode.TL) {
        if (pos.x > box.x1) {
          setMode(InputMode.TR);
          return 
        }
        if (pos.y > box.y1) {
          setMode(InputMode.BL);
          return 
        }
        return Box({...box, x0: pos.x, y0: pos.y})
      } else if (mode === InputMode.BR) {
        if (pos.x < box.x0) {
          setMode(InputMode.BL);
          return 
        }
        if (pos.y < box.y0) {
          setMode(InputMode.TR);
          return 
        }
        return Box({...box, x1: pos.x, y1: pos.y})
      } else if (mode === InputMode.BL) {
        if (pos.x > box.x1) {
          setMode(InputMode.BR);
          return 
        }
        if (pos.y < box.y0) {
          setMode(InputMode.TL);
          return 
        }
        return Box({...box, x0: pos.x, y1: pos.y})
      } else if (mode === InputMode.TR) {
        if (pos.x < box.x0) {
          setMode(InputMode.TL);
          return 
        }
        if (pos.y > box.y1) {
          setMode(InputMode.BR);
          return 
        }
        return Box({...box, x1: pos.x, y0: pos.y})
      }
    })()
    if(newBox !== undefined){
      self.boxes = uniqBy([
        newBox,
        ...boxes,
      ], x => x.id)
    }
  };

  const add = () => {
    const { mode, pos, boxes } = self;
    if ((self.draggingId = undefined)) {
      self.draggingId = undefined;
      return;
    }
    if (
      [
        InputMode.Box,
        InputMode.TR,
        InputMode.TL,
        InputMode.BL,
        InputMode.BR,
      ].includes(mode)
    ) {
      const newBox = Box({
        x0: pos.x,
        y0: pos.y,
        x1: pos.x,
        y1: pos.y,
      })
      self.boxes = [...self.boxes, newBox]
      setMode(InputMode.BR);
      self.draggingId = newBox.id;
    }
  };

  const del = () => {
    const { boxes, draggingId } = self;
    self.boxes = boxes.filter(x => x.id !== draggingId);
    self.draggingId = undefined;
  };

  const changeSize = (value: number) => {
    self.size = value;
  };


  const self = observable<Editor>({
    boxes: [],
    draggingId: undefined,
    size: 10,
    pos: { x: 0, y:0 },
    mode: InputMode.Box,
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
