import { Sql } from "postgres";
import { Store, Lock } from "@sivic/core";
import { FastifyPlugin } from "fastify";
import {
  CreateFn,
  UpdateFn,
  FindFn,
  DeleteFn,
} from "@sivic/core/workspace";

export const WorkspaceRoutes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const { store, lock } = props;
  const create = CreateFn(props)
  const update = UpdateFn(props)
  const find = FindFn(props)
  const delete_ = DeleteFn(props)
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
    app.post<{ Body: Parameters<typeof find>[0] }>("/delete", {}, async (req, reply) => {
      const res = await delete_(req.body);
      reply.send(res);
    });
    done();
  };
};
