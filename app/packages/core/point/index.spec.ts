import {
  Point,
  rotatePoint,
  normalizePoints,
} from "@sivic/core/point";
import { Line } from "@sivic/core/line";

describe("point", () => {
  test("rotatePoint", async () => {
    const point = Point({x:5, y:1})
    const originPoint = Point({ x:1, y:1})
    const radian = Math.PI / 2
    const res = rotatePoint({point, originPoint, radian})
    expect(Math.round(res?.x)).toBe(1)
    expect(Math.round(res?.y)).toBe(5)
  });

  test("normalizePoints", async () => {
    const line = Line({
      start: Point({x:0, y:0}),
      end: Point({x:1, y: 1}),
    })
    const points = [
      Point({x:0, y: 1})
    ]
    const res = normalizePoints({
      line,
      points
    })
    expect(res[0].x.toPrecision(4)).toBe((- 1 / Math.pow(2, 1/2)).toPrecision(4))
    expect(res[0].y.toPrecision(4)).toBe((1 / Math.pow(2, 1/2)).toPrecision(4))
  });
});
