import { Store, ErrorKind, Lock } from "@alfs-appraisal/core";
export type CropPayload = {
  imageData: string,
  box:{
    x0:number,
    y0:number,
    x1:number,
    y1:number,
  }
};
export type CropFn = (payload: CropPayload) => Promise<string | Error>

export type Service = {
  crop: CropFn
};
export const Service = (args: {
  store: Store,
  lock: Lock,
}):Service => {
  const { store } = args;
  const crop = async (payload:CropPayload) => {
    return store.transform.crop(payload)
  }
  return {
    crop
  }
}
