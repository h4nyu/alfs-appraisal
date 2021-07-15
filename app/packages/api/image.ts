import { AxiosInstance } from "axios";
import { toError } from ".";
import Image, {
  FilterFn,
  DeleteFn,
  FindFn,
  CropFn,
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
  const crop:CropFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/tag/update`, payload);
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
    crop,
  };
};
export default Api
