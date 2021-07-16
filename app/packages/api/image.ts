import { AxiosInstance } from "axios";
import { toError } from ".";
import Image, {
  FilterFn,
  DeleteFn,
  FindFn,
  ReplaceBoxesFn,
  ReplaceLinesFn,
} from "@sivic/core/image";

export const Api = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const delete_:DeleteFn = async (payload) => {
    try {
      await http.post(`${prefix}/update`, payload);
    } catch (err) {
      return toError(err);
    }
  };
  const replaceBoxes:ReplaceBoxesFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/image/replace-boxes`, payload);
      return res.data.map(Image)
    } catch (err) {
      return toError(err);
    }
  };
  const replaceLines:ReplaceLinesFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/image/replace-lines`, payload);
      return res.data.map(Image)
    } catch (err) {
      return toError(err);
    }
  };
  const find:FindFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/find`, payload);
      return Image(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  const filter:FilterFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/filter`, payload);
      return res.data.map(Image);
    } catch (err) {
      return toError(err);
    }
  };
  return {
    filter,
    delete: delete_,
    find,
    replaceBoxes,
  };
};
export default Api
