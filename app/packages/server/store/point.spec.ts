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
  const point = Point({x: 30,  y: 80, boxId})
  test("load and delete", async () => {
    let loadErr = await pointStore.load([point])
    if(loadErr instanceof Error) { throw loadErr }
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
