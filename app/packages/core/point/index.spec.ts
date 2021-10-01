import {
  Point,
  rotate,
  normalizePoints,
} from "@sivic/core/point";
import { Line } from "@sivic/core/line";

describe("point", () => {
  test("rotate", async () => {
    const point = Point({x:5, y:1})
    const originPoint = Point({ x:1, y:1})
    const radian = Math.PI / 2
    const res = rotate({point, originPoint, radian})
    expect(Math.round(res?.x)).toBe(1)
    expect(Math.round(res?.y)).toBe(5)
  });

});

describe("normalizePoints", () => {
  // test("primaryLine", async () => {
  //   const line = Line({
  //     start: Point({x:1, y:1}),
  //     end: Point({x:2, y: 3}),
  //   })
  //   const points = [
  //     Point({x:1, y: 1}),
  //     Point({x:2, y: 1})
  //   ]
  //   const res = normalizePoints({
  //     line,
  //     points
  //   })
  //   expect(res[0].x.toFixed(4)).toBe(0.0.toFixed(4))
  //   expect(res[0].y.toFixed(4)).toBe((-Math.sqrt(5)).toFixed(4))

  //   expect(res[1].x.toFixed(4)).toBe((2/Math.sqrt(5)).toFixed(4))
  //   expect(res[1].y.toFixed(4)).toBe((-2 * 2/Math.sqrt(5)).toFixed(4))
  // });

  test("secondaryLine", async () => {
    const line = Line({
      end: Point({x:1, y:3}),
      start: Point({x:2, y: 1}),
    })
    const points = [
      Point({x:2, y: 1}),
      Point({x:2, y: 3})
    ]
    const res = normalizePoints({
      line,
      points
    })
    console.log(res)
    // expect(res[0].x.toFixed(4)).toBe(0.0.toFixed(4))
    // expect(res[0].y.toFixed(4)).toBe((-Math.sqrt(5)).toFixed(4))

    // expect(res[1].x.toFixed(4)).toBe((2/Math.sqrt(5)).toFixed(4))
    // expect(res[1].y.toFixed(4)).toBe((-2 * 2/Math.sqrt(5)).toFixed(4))
  });

})
