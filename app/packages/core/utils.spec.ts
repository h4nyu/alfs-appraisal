import {
  rotatePoint, getRefLine
} from "@sivic/core/utils";
import Point from "@sivic/core/point"
import Line from "@sivic/core/line"

describe("spec", () => {
  test("getRefLine", async () => {
    const points = [
      Point({x:0, y:0}), 
      Point({x:2, y:2}), 
      Point({x:5, y:5}),
    ]
    const baseline = getRefLine(points)
    expect(baseline?.start.x).toBe(0)
    expect(baseline?.start.y).toBe(0)
    expect(baseline?.end.x).toBe(5)
    expect(baseline?.end.y).toBe(5)
  })
  test("rotatePoint", async () => {
    const point = Point({x:5, y:1})
    const originPoint = Point({ x:1, y:1})
    const res = rotatePoint(point, originPoint, 90)
    expect(Math.round(res?.x)).toBe(1)
    expect(Math.round(res?.y)).toBe(5)
  });
});
