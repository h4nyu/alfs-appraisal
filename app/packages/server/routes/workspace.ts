import { Sql } from "postgres";
import { Store, Lock } from "@sivic/core";
import { FastifyPlugin } from "fastify";
import {
  CreateFn,
  UpdateFn,
  FindFn,
  DeleteFn,
  CreateImageFn,
  CreateTagFn,
  UpdateTagFn,
} from "@sivic/core/workspace";

export const Routes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const create = CreateFn(props)
  const update = UpdateFn(props)
  const find = FindFn(props)
  const delete_ = DeleteFn(props)
  const createImage = CreateImageFn(props)
  const createTag = CreateTagFn(props)
  const updateTag = UpdateTagFn(props)
  return function (app, opts, done) {
    app.post<{ Body: Parameters<typeof create>[0] }>("/create", {}, async (req, reply) => {
      const res = await create(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof update>[0] }>("/update", {}, async (req, reply) => {
      const res = await update(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof find>[0] }>("/find", {}, async (req, reply) => {
      const res = await find(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof delete_>[0] }>("/delete", {}, async (req, reply) => {
      const res = await delete_(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof createImage>[0] }>("/image/create", {}, async (req, reply) => {
      const res = await createImage(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof createTag>[0] }>("/tag/create", {}, async (req, reply) => {
      const res = await createTag(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof updateTag>[0] }>("/tag/update", {}, async (req, reply) => {
      const res = await updateTag(req.body);
      reply.send(res);
    });
    done();
  };
};
export default Routes
