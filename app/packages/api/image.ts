import { AxiosInstance } from "axios";
import { toError } from ".";
import Image, {
  FilterFn,
  DeleteFn,
  FindFn,
  CreateFn,
  ReplaceLinesFn,
  ReplacePointsFn,
} from "@sivic/core/image";

export const Api = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const create:CreateFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/create`, payload);
      return Image({
        ...res.data,
        createdAt: new Date(res.data.createdAt)
      })
    } catch (err) {
      return toError(err);
    }
  };
  const delete_:DeleteFn = async (payload) => {
    try {
      await http.post(`${prefix}/update`, payload);
    } catch (err) {
      return toError(err);
    }
  };
  const replaceLines:ReplaceLinesFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/replace-lines`, payload);
      return res.data.map(Image)
    } catch (err) {
      return toError(err);
    }
  };
  const replacePoints:ReplacePointsFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/replace-points`, payload);
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
      return res.data.map(x => Image({...x, createdAt: new Date(x.createdAt)}));
    } catch (err) {
      return toError(err);
    }
  };
  return {
    create,
    filter,
    delete: delete_,
    find,
    replacePoints,
    replaceLines,
  };
};
export default Api
