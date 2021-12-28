import { Store } from "@alfs-appraisal/server"; 
import fs from "fs"; 
import { v4 as uuid } from "uuid";
import { Image, ImageTag } from "@alfs-appraisal/core/image";

const rootStore = Store();

describe("detect", () => {
  const store = rootStore.detect
  test("box", async () => {
    const res = await store.box({
      data: ""
    })
  });
});

