import { AxiosInstance } from "axios";
import { toError } from ".";
import Tag from "@sivic/core/tag"
import Image from "@sivic/core/image"
import Workspace, {
  CreateFn,
  UpdateFn,
  DeleteFn,
  CreateImageFn,
  CreateTagFn,
  UpdateTagFn,
  FindFn,
  FilterFn,
} from "@sivic/core/workspace";

export const Api = (arg: {
  http: AxiosInstance;
  prefix: string;
}) => {
  const { http, prefix } = arg;
  const to = (x:any): Workspace => {
    return  Workspace({
      ...x,
      createdAt: new Date(x.createdAt)
    })
  }
  const create:CreateFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/create`, payload);
      return to(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  const update:UpdateFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/update`, payload);
      return to(res.data);
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
  const createImage:CreateImageFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/image/create`, payload);
      return Image(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  const createTag:CreateTagFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/image/create`, payload);
      return Tag(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  const updateTag:UpdateTagFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/tag/update`, payload);
      return Tag(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  const find:FindFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/find`, payload);
      return Workspace(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  const filter:FilterFn = async (payload) => {
    try {
      const res = await http.post(`${prefix}/filter`, payload);
      return res.data.map(to);
    } catch (err) {
      return toError(err);
    }
  };
  return {
    create,
    update,
    delete: delete_,
    createImage,
    updateTag,
    createTag,
    find,
    filter,
  };
};
export default Api
