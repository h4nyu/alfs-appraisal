import { observable, computed } from "mobx";
import Api from "@sivic/api";
import Point, { FilterFn, } from "@sivic/core/point";
import { uniqBy } from "lodash";

export type PointStore = {
  points: Point[];
  fetch: FilterFn
  delete: (payload:{boxId?:string, positionId?:string}) => void;
};

export const PointStore = (props: {
  api: Api;
}): PointStore => {
  const fetch = async (payload) => {
    const points = await props.api.point.filter(payload)
    if(points instanceof Error) { return points; }
    self.points = uniqBy([...self.points, ...points], x => x.id)
    return points;
  }
  const delete_ = (payload) => {
    if(payload.boxId){
      self.points = self.points.filter(x => x.boxId !== payload.boxId)
    }else if(payload.positionId){
      self.points = self.points.filter(x => x.positionId !== payload.positionId)
    }
  }
  const self = observable<PointStore>({
    points: [],
    fetch,
    delete: delete_
  })
  return self
}

export default PointStore 
