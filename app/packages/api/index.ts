// import { DetectApi } from "./detect";
// import { PointApi } from "./point";
import FileApi from "./file"
import WorkspaceApi from "./workspace";
import ImageApi from "./image";
import BoxApi from "./box";
import TagApi from "./tag"
import PointApi from "./point";
import LineApi from "./line";
import axios from "axios";

export function toError(err: any): Error {
  const message = err.response?.data?.message;
  if (message) {
    return new Error(message);
  } else {
    return new Error(err.message);
  }
}

export type RootApi = {
  setUrl: (url: string) => void;
  getImageStoreUrl: () => Promise<string|Error>;
  // detect: DetectApi;
  file: ReturnType<typeof FileApi>;
  workspace: ReturnType<typeof WorkspaceApi>;
  image: ReturnType<typeof ImageApi>;
  box: ReturnType<typeof BoxApi>;
  tag: ReturnType<typeof TagApi>;
  point: ReturnType<typeof PointApi>;
  line: ReturnType<typeof LineApi>;
};

export const RootApi = (): RootApi => {
  const http = axios.create();
  const prefix = "api/v1";
  const workspace = WorkspaceApi({ http, prefix: `${prefix}/workspace` });
  const image = ImageApi({ http, prefix: `${prefix}/image` });
  // const detect = DetectApi({ http, prefix: `${prefix}/detect` });
  const box = BoxApi({ http, prefix: `${prefix}/box` });
  const point = PointApi({ http, prefix: `${prefix}/point` });
  const file = FileApi({ http, prefix: `${prefix}/file` });
  const tag = TagApi({ http, prefix: `${prefix}/tag` });
  const line = LineApi({ http, prefix: `${prefix}/line` });

  const setUrl = (url: string) => {
    http.defaults.baseURL = url;
  };

  const getImageStoreUrl = async () => {
    try {
      const res = await http.get(`${prefix}/image-store-url`);
      return res.data;
    } catch (err) {
      return toError(err);
    }
  };
  return {
    setUrl,
    getImageStoreUrl,
    workspace,
    image,
    // detect,
    box,
    point,
    file,
    tag,
    line,
  };
};
export default RootApi
