import React from "react"
import { keyBy, zip, uniqBy } from "lodash";
import Point from "@alfs-appraisal/core/point"
import { Position2D } from "@alfs-appraisal/core/point"

export const usePointPlot = (props?: {
  points?: Point[]
  draggingId?: string
}) => {
  const [draggingId, setDraggingId] = React.useState<string|undefined>(props?.draggingId)
  const [points, setPoints] = React.useState<Point[]>(props?.points ?? [])
  const [position, setPosition] = React.useState<Position2D>({x: 0, y: 0})
  const toggleDrag = (id: string) => {
    if (draggingId === id) {
      setDraggingId(undefined)
    } else {
      setDraggingId(id)
    }
  };

  const add = () => {
    if(draggingId === undefined) {
      const newPoint = Point({ ...position, })
      setPoints([...points, newPoint])
      setDraggingId(newPoint.id)
    }else{
      setDraggingId(undefined)
    }
  };

  const move = (pos: Position2D) => {
    setPosition(pos)
    if (draggingId === undefined) {
      return;
    }
    setPoints(
      points.map(p => {
        if(p.id === draggingId){
          return Point({...p, ...position})
        }
        return p
      })
    )
  };
  const remove = () => {
    if(draggingId === undefined) { return }
    setPoints(points.filter(x => x.id !== draggingId))
    setDraggingId(undefined)
  }

  return {
    toggleDrag,
    points,
    move,
    add,
    draggingId,
    remove,
  }
}
export default usePointPlot

