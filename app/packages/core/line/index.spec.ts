import {
  Line, getRefLine
} from "@sivic/core/line";
import { Point } from "@sivic/core/point";

describe("line", () => {
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

  test("radian", async () => {
    const line = Line({
      start: Point({
        x:0,
        y:0,
      }),
      end: Point({
        x:1,
        y:0,
      })
    })
    expect(line.radian).toBe(0)
  })
  test("line", async () => {
    const line = Line({
      start: Point({
        x:0,
        y:3,
      }),
      end: Point({
        x:4,
        y:0,
      })
    })
    expect(line.length).toBe(5)
  })
});

