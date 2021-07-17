import { observable, computed } from "mobx";
import { Line } from "@sivic/core/line";
import { Map, List } from "immutable";
import { Images } from ".";
import { ToastStore } from "./toast";
import { LoadingStore } from "./loading";
import { RootApi } from "@sivic/api";
import {
  FilterFn
} from "@sivic/core/line";
import { saveAs } from 'file-saver';
import { keyBy } from "lodash";

export type LineStore = {
  lines: Map<string, Line>;
  fetch: FilterFn
};

export const LineStore = (args: {
  api: RootApi;
}): LineStore => {
  const { api } = args;
  const fetch:FilterFn = async (payload) => {
    const lines = await api.line.filter(payload)
    if(lines instanceof Error) { return lines }
    self.lines = self.lines.merge(Map(keyBy(lines, x => x.id)))
    return lines
  }
  const self = observable({
    lines: Map<string, Line>(),
    fetch,
  })
  return self
}

export default LineStore 
