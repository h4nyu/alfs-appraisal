import { AxiosInstance } from "axios";
import { toError } from ".";
import Box, {
  FilterFn,
  CreateFn,
  UpdateFn,
  LoadFn,
} from "@sivic/core/box";

export const Api = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const filter:FilterFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/filter`, payload);
      return res.data.map(Box);
    } catch (err) {
      return toError(err);
    }
  };
  const create:CreateFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/create`, payload);
      return res.data.map(Box);
    } catch (err) {
      return toError(err);
    }
  };
  const load:LoadFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/load`, payload);
      return res.data.map(Box);
    } catch (err) {
      return toError(err);
    }
  };
  const update:UpdateFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/update`, payload);
      return Box(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  return {
    filter,
    create,
    update,
    load,
  };
};
export default Api
