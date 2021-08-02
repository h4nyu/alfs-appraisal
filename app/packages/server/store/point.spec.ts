import { Store } from "@sivic/server"; 
import fs from "fs"; 
import { v4 as uuid } from "uuid";
import { Point } from "@sivic/core/point";
import { Image, ImageTag } from "@sivic/core/image";

const rootStore = Store();

afterAll(async () => {
  await rootStore.close();
});

describe("point", () => {
  const pointStore = rootStore.point;
  const boxId = uuid()
  const point = Point({x: 30,  y: 80, boxId, serialNo: 0})
  test("create and delete", async () => {
    let createErr = await pointStore.create(point)
    if(createErr instanceof Error) { throw createErr }
    let savedRows = await pointStore.filter({boxId})
    if(savedRows instanceof Error) { throw savedRows }
    expect(JSON.stringify(savedRows)).toEqual(JSON.stringify([point]))
    let delErr = await pointStore.delete({id: point.id})
    if(delErr instanceof Error) { throw delErr }
    savedRows = await pointStore.filter({boxId})
    if(savedRows instanceof Error) { throw savedRows }
    expect(savedRows).toEqual([])
  });
});
