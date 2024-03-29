import { Sql } from "postgres";
import { Store, Lock } from "@alfs-appraisal/core";
import { FastifyPlugin } from "fastify";
import {
  CreateFn,
  UpdateFn,
  FindFn,
  FilterFn,
  DeleteFn,
} from "@alfs-appraisal/core/workspace";

export const Routes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const create = CreateFn(props)
  const update = UpdateFn(props)
  const delete_ = DeleteFn(props)
  const find = FindFn(props)
  const filter = FilterFn(props)
  return function (app, opts, done) {
    app.post<{ Body: Parameters<CreateFn>[0] }>("/create", {}, async (req, reply) => {
      const res = await create(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<UpdateFn>[0] }>("/update", {}, async (req, reply) => {
      const res = await update(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<DeleteFn>[0] }>("/delete", {}, async (req, reply) => {
      const res = await delete_(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<FindFn>[0] }>("/find", {}, async (req, reply) => {
      const res = await find(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<FilterFn>[0] }>("/filter", {}, async (req, reply) => {
      const res = await filter(req.body);
      reply.send(res);
    });
    done();
  };
};
export default Routes
