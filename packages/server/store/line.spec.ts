import { Store } from "@alfs-appraisal/server"; 
import fs from "fs"; 
import { v4 as uuid } from "uuid";
import { Line } from "@alfs-appraisal/core/line";
import { Point } from "@alfs-appraisal/core/point";

const rootStore = Store();

afterAll(async () => {
  await rootStore.close();
});

describe("line", () => {
  const lineStore = rootStore.line;
  const boxId = uuid()
  const startPoint = Point({x: 30,  y: 80, boxId, positionId: "aaa"})
  const endPoint = Point({x: 30,  y: 80, boxId, positionId: "aaa"})
  const line = Line({id: uuid(), boxId, start:startPoint, end:endPoint})

  test("create and delete", async () => {
    let createErr = await lineStore.create(line)
    if(createErr instanceof Error) { throw createErr }
    let savedRows = await lineStore.filter({boxId})
    if(savedRows instanceof Error) { throw savedRows }
    expect(JSON.stringify(savedRows)).toEqual(JSON.stringify([line]))
    let delErr = await lineStore.delete({id: line.id})
    if(delErr instanceof Error) { throw delErr }
    savedRows = await lineStore.filter({boxId})
    if(savedRows instanceof Error) { throw savedRows }
    expect(savedRows).toEqual([])
  });
})
