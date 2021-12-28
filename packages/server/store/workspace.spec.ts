import { Store } from "@alfs-appraisal/server"; 
import fs from "fs"; 
import { Workspace } from "@alfs-appraisal/core/workspace";

const rootStore = Store();

afterAll(async () => {
  await rootStore.close();
});

describe("workspace", () => {
  const store = rootStore.workspace;
  let row = Workspace()

  beforeAll(async () => {
    await store.clear();
  });

  test("insert, find and update", async () => {
    const err = await store.insert(row);
    if (err instanceof Error) {
      throw err;
    }
    let res = await store.find({ id: row.id });
    if (res instanceof Error) {
      throw res;
    }
    row = Workspace({
      ...row,
      name: "update"
    })
    const update = await store.update(row);
    if (update instanceof Error) {
      throw update;
    }
    res = await store.find({ id: row.id });
    if (res instanceof Error) {
      throw res;
    }
    expect(res?.equals(row)).toBe(true);
  });
  test("filter", async () => {
    const rows = await store.filter({});
    if (rows instanceof Error) {
      throw rows;
    }
    expect(rows.length).toBe(1);
    expect(rows[0].equals(row)).toBe(true);

  });
  test("delete", async () => {
    const err = await store.delete({ id: row.id });
    if (err instanceof Error) {
      throw err;
    }
    const rows = await store.filter({});
    if (rows instanceof Error) {
      throw rows;
    }
    expect(rows).toEqual([]);
  });
});
