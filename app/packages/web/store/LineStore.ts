import { observable, computed } from "mobx";
import Line, { FilterFn } from "@sivic/core/line";
import { uniqBy } from "lodash";
import Api from "@sivic/api"

export type LineStore = {
  lines: Line[];
  fetch: FilterFn
};

export const LineStore = (args: {
  api: Api;
}): LineStore => {
  const { api } = args;
  const fetch:FilterFn = async (payload) => {
    const lines = await api.line.filter(payload)
    if(lines instanceof Error) { return lines }
    self.lines = uniqBy([...self.lines, ...lines], x => x.id)
    return lines
  }
  const self = observable<LineStore>({
    lines: [],
    fetch,
  })
  return self
}

export default LineStore 
