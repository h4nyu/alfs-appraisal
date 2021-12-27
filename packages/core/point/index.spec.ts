import {
  Point,
  rotate,
  normalizePoints,
} from "@alfs-appraisal/core/point";
import { round } from "lodash"
import { Line } from "@alfs-appraisal/core/line";

describe("point", () => {
  test("rotate", async () => {
    const point = Point({x:5, y:1})
    const radian = Math.PI / 2
    const res = rotate({point, radian})
    expect(Math.round(res?.x)).toBe(-1)
    expect(Math.round(res?.y)).toBe(5)
  });
});

describe("normalizePoints", () => {
  test("primaryLine", async () => {
    const line = Line({
      start: Point({x:1, y:1}),
      end: Point({x:2, y: 3}),
    })
    const points = [
      Point({x:2, y: 3}),
      Point({x:1, y: 1})
    ]
    const res = normalizePoints({
      line,
      points
    })
    expect(res[0].x.toFixed(4)).toBe(0.0.toFixed(4))
    expect(res[0].y.toFixed(4)).toBe(0.0.toFixed(4))

    expect(res[1].x.toFixed(4)).toBe(0.0.toFixed(4))

    expect(round(res[1].y, 4)).toBe(round(-line.length,4))
  });
})
