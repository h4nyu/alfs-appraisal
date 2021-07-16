import { AxiosInstance } from "axios";
import { toError } from ".";
import Line, {
  FilterFn,
} from "@sivic/core/line";

export const Api = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const filter:FilterFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/filter`, payload);
      return res.data.map(Line);
    } catch (err) {
      return toError(err);
    }
  };
  return {
    filter,
  };
};
export default Api
