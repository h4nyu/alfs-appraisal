import { Store } from "@alfs-appraisal/server"; 
import fs from "fs"; 
import { v4 as uuid } from "uuid";
import { Box } from "@alfs-appraisal/core/box";
import { Image, ImageTag } from "@alfs-appraisal/core/image";

const rootStore = Store();

afterAll(async () => {
  await rootStore.close();
});

describe("box", () => {
  const boxStore = rootStore.box;
  const imageId = uuid()
  const box = Box({
    x0: 30, 
    y0: 30, 
    x1: 80, 
    y1: 80, 
    imageId, 
    tagId:"t0",
    isReference: true,
  })
  const valErr = box.validate() 
  test("create and delete", async () => {
    let err = await boxStore.create(box)
    if(err instanceof Error) { throw err }
    let savedRows = await boxStore.filter({imageId})
    if(savedRows instanceof Error) { throw savedRows }
    expect(savedRows.length).toBe(1)
    expect(box.equals(savedRows[0])).toBe(true)

    box.tagId = undefined
    let updateErr = await boxStore.update(box)
    if(updateErr instanceof Error) { throw updateErr }
    savedRows = await boxStore.filter({imageId})
    if(savedRows instanceof Error) { throw savedRows }
    expect(savedRows.length).toBe(1)
    expect(box.equals(savedRows[0])).toBe(true)

    err = await boxStore.delete({id: box.id})
    if(err instanceof Error) { throw err }
    savedRows = await boxStore.filter({imageId})
    if(savedRows instanceof Error) { throw savedRows }
    expect(savedRows.length).toBe(0)
  });
});
