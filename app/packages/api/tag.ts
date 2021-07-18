import { AxiosInstance } from "axios";
import { toError } from ".";
import Tag, {
  CreateFn,
  UpdateFn,
  DeleteFn,
  FilterFn,
  FindFn,
} from "@sivic/core/tag";

export const Api = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const create:CreateFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/create`, payload);
      return Tag(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  const update:UpdateFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/update`, payload);
      return Tag(res.data);
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
  const filter:FilterFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/filter`, payload);
      return res.data.map(Tag);
    } catch (err) {
      return toError(err);
    }
  };
  const find:FindFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/find`, payload);
      return Tag(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  return {
    create,
    update,
    delete: delete_,
    filter,
    find,
  };
};
export default Api
