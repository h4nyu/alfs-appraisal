import React from "react"
import { keyBy, zip, uniqBy } from "lodash";
import Box from "@alfs-appraisal/core/box"
import { Position2D } from "@alfs-appraisal/core/point"

export enum InputMode {
  Box = "Box",
  TL = "TL",
  TR = "TR",
  BL = "BL",
  BR = "BR",
}

export const useBoxPlot = (props?: {
  boxes?: Box[]
  dragId?: string
}) => {
  const [dragId, setDragId] = React.useState<string|undefined>(props?.dragId)
  const [mode, setMode] = React.useState<InputMode>(InputMode.Box)
  const [boxes, setBoxes] = React.useState<Box[]>(props?.boxes ?? [])
  const [position, setPosition] = React.useState<Position2D>({x: 0, y: 0})

  const toggleDrag = (id: string, mode: InputMode) => {
    if (dragId === id) {
      setDragId(undefined)
    } else {
      setDragId(id)
    }
    setMode(mode);
  };

  const add = () => {
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
        x0: position.x,
        y0: position.y,
        x1: position.x,
        y1: position.y,
      })
      setBoxes([...boxes, newBox])
      setMode(InputMode.BR);
      setDragId(newBox.id)
    }
  };

  const move = (pos: Position2D) => {
    setPosition(pos)
    if (dragId === undefined) {
      return;
    }
    const newBox = (() => {
      const box = boxes.find(x => x.id === dragId);
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
      setBoxes(uniqBy([
        newBox,
        ...boxes,
      ], x => x.id))
    }
  };
  const shiftX = (value: number) => {
    setBoxes(boxes.map(b => {
      if(b.id !== dragId) { return b }
      return Box({
        ...b,
        x0: b.x0 + value,
        x1: b.x1 + value,
      })
    }))
  }

  const shiftY = (value: number) => {
    setBoxes(boxes.map(b => {
      if(b.id !== dragId) { return b }
      return Box({
        ...b,
        y0: b.y0 + value,
        y1: b.y1 + value,
      })
    }))
  }
  const remove = () => {
    if(dragId === undefined) { return }
    setBoxes(boxes.filter(x => x.id !== dragId))
    setDragId(undefined)
  }

  return {
    setBoxes,
    toggleDrag,
    setMode,
    boxes,
    move,
    add,
    dragId,
    remove,
    shiftY,
    shiftX,
    setDragId,
  }
}
export default useBoxPlot
