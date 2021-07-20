import { observable, computed } from "mobx";
import Api from "@sivic/api";
import Point, { FilterFn, } from "@sivic/core/point";
import { uniqBy } from "lodash";

export type PointStore = {
  points: Point[];
  fetch: (payload: Parameters<FilterFn>[0]) => Promise<void>
};

export const PointStore = (props: {
  api: Api;
}): PointStore => {
  const fetch = async (payload) => {
    const points = await props.api.point.filter(payload)
    if(points instanceof Error) { return }
    self.points = uniqBy([...self.points, ...points], x => x.id)
  }
  const self = observable<PointStore>({
    points: [],
    fetch,
  })
  return self
}

export default PointStore 
