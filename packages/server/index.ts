import { Store as _Store } from "@alfs-appraisal/server/store";

export const Store = () => _Store({
  url: process.env.DATABASE_URL || "",
  imageUrl: process.env.IMAGE_URL || "",
  detectUrl: process.env.DETECTION_URL || "",
});
