import { AxiosInstance } from "axios";
import { toError } from ".";
import File, {
  FindFn
} from "@sivic/core/file";

export const Api = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const find:FindFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/find`, payload);
      return File(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  return {
    find,
  };
};
export default Api
