import { AxiosInstance } from "axios";
import { toError } from ".";
import {
  FilterPayload,
  CreatePayload,
  UpdatePayload,
  DeletePayload,
  FindPayload,
  AddImagePayload,
  DeleteImagePayload,
  Service,
  Workspace,
} from "@sivic/core/workspace";
import { parseISO } from "date-fns";

export type WorkspaceApi = Service;

export const WorkspaceApi = (arg: {
  http: AxiosInstance;
  prefix: string;
}): Service => {
  const { http, prefix } = arg;
  const to = (res: any) => {
    return {
      ...res,
      createdAt: new Date(res.createdAt),
    };
  };

  const filter = async (payload: FilterPayload) => {
    try {
      const res = await http.post(`${prefix}/filter`, payload);
      return res.data.map(to);
    } catch (err) {
      return toError(err);
    }
  };

  const find = async (payload: FindPayload) => {
    try {
      const res = await http.post(`${prefix}/find`, payload);
      return to(res.data);
    } catch (err) {
      return toError(err);
    }
  };
  const create = async (payload: CreatePayload) => {
    try {
      const res = await http.post(`${prefix}/create`, payload);
      return to(res.data);
    } catch (err) {
      return toError(err);
    }
  };

  const update = async (payload: UpdatePayload) => {
    try {
      const res = await http.post(`${prefix}/update`, payload);
      return to(res.data);
    } catch (err) {
      return toError(err);
    }
  };

  const delete_ = async (payload: DeletePayload) => {
    try {
      const res = await http.post(`${prefix}/delete`, payload);
      return res.data;
    } catch (err) {
      return toError(err);
    }
  };
  const addImage = async (payload: AddImagePayload) => {
    try {
      const res = await http.post(`${prefix}/add-image`, payload);
      return res.data;
    } catch (err) {
      return toError(err);
    }
  };
  const deleteImage = async (payload: DeleteImagePayload) => {
    try {
      const res = await http.post(`${prefix}/delete-image`, payload);
      return res.data;
    } catch (err) {
      return toError(err);
    }
  };

  return {
    create,
    update,
    addImage,
    deleteImage,
    find,
    filter,
    delete: delete_,
  };
};
