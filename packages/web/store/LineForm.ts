import { observable } from "mobx";
import { Point } from "@sivic/core/point";
import { File } from "@sivic/core/file"
import { Box } from "@sivic/core/box";
import { v4 as uuid } from "uuid";
import { keyBy, zip, uniqBy, sortBy } from "lodash";
import Line from "@sivic/core/line"
import { ImageStore } from "@sivic/web/store/ImageStore"
import PointStore from "@sivic/web/store/PointStore"


export type LineForm = {
  init: (points?:Point[]) => void;
  points: Point[];
  lines: Line[];
  clear: () => void;
};

export const LineForm = (props: {
}): LineForm => {
  const init = (points?:Point[]) => {
    self.points = points || []
  }
  const clear = () => {
    self.lines = []
  }

  const self = observable<LineForm>({
    points: observable([]),
    lines: observable([]),
    init,
    clear,
  })
  return self
};
export default LineForm
