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
      Point({x:1, y: 1}),
      Point({x:2, y: 3}),
    ]
    expect(line.origin).toMatchObject({x:1, y: 1})
    const res = normalizePoints({
      line,
      points
    })
    expect(round(res[0].x, 4)).toBe(round(0, 4))
    expect(round(res[0].y, 4)).toBe(round(0, 4))
    expect(round(res[1].x, 4)).toBe(round(-0, 4))

    expect(round(res[1].y, 4)).toBe(round(line.length,4))
  });

  test("secondary", async () => {
    const line = Line({
      start: Point({x:3, y:1}),
      end: Point({x:2, y: 3}),
    })
    const points = [
      Point({x:3, y: 1}),
      Point({x:2, y: 3}),
    ]
    const res = normalizePoints({
      line,
      points
    })
    expect(round(res[0].x, 4)).toBe(round(0, 4))
    expect(round(res[0].y, 4)).toBe(round(0, 4))
    expect(round(res[1].x, 4)).toBe(round(0, 4))
    expect(round(res[1].y, 4)).toBe(round(line.length,4))
  });
  test("other", async () => {
    const line = Line({
      start: Point({
        x: 25.459513346354168,
        y: 5.319010416666667
      }),
      end: Point({
        x: 0.7191162109375,
        y: 29.786458333333332
      }),
    })
    const points = [
      Point({
        x: 25.459513346354168,
        y: 5.319010416666667
      }),
      Point({
        x: 0.7191162109375,
        y: 29.786458333333332
      }),
    ]
    const res = normalizePoints({
      line,
      points
    })
    expect(round(res[0].x, 4)).toBe(round(0, 4))
    expect(round(res[0].y, 4)).toBe(round(0, 4))
    expect(round(res[1].x, 4)).toBe(round(0, 4))
    expect(round(res[1].y, 4)).toBe(round(line.length,4))
  });
})
