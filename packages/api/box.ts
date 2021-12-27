import { AxiosInstance } from "axios";
import { toError } from ".";
import Box, {
  FindFn,
  FilterFn,
  CreateFn,
  UpdateFn,
  LoadFn,
  DeleteFn,
} from "@sivic/core/box";

export const Api = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const find:FindFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/find`, payload);
      return Box(res.data);
    } catch (err) {
      return toError(err);
    }
  };
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

  const delete_:DeleteFn = async (payload) => {
    try {
      await http.post(`${prefix}/delete`, payload);
    } catch (err) {
      return toError(err);
    }
  };
  return {
    find,
    filter,
    create,
    update,
    load,
    delete: delete_,
  };
};
export default Api
