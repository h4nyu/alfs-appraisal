import { AxiosInstance } from "axios";
import { toError } from ".";
import point, {
  FilterFn,
  LoadFn,
} from "@alfs-appraisal/core/point";

export const Api = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const filter:FilterFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/filter`, payload);
      return res.data.map(point);
    } catch (err) {
      return toError(err);
    }
  };
  const load:LoadFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/load`, payload);
      return res.data.map(point);
    } catch (err) {
      return toError(err);
    }
  };
  return {
    filter,
    load,
  };
};
export default Api
