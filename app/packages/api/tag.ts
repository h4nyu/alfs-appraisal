import { AxiosInstance } from "axios";
import { toError } from ".";
import Tag, {
  DeleteFn,
  FilterFn,
} from "@sivic/core/tag";

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
  const filter:FilterFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/filter`, payload);
      return res.data.map(Tag);
    } catch (err) {
      return toError(err);
    }
  };
  return {
    delete: delete_,
    filter,
  };
};
export default Api
