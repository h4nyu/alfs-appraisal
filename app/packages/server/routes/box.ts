import { Sql } from "postgres";
import { Store, Lock } from "@sivic/core";
import { FastifyPlugin } from "fastify";
import {
  CreateFn,
  DeleteFn,
  FilterFn,
} from "@sivic/core/box";

export const Routes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const { store, lock } = props;
  const create = CreateFn(props)
  const filter = FilterFn(props)
  const delete_ = DeleteFn(props)
  return function (app, opts, done) {
    app.post<{ Body: Parameters<typeof create>[0] }>("/create", {}, async (req, reply) => {
      const res = await create(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof filter>[0] }>("/filter", {}, async (req, reply) => {
      const res = await filter(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof delete_>[0] }>("/delete", {}, async (req, reply) => {
      const res = await delete_(req.body);
      reply.send(res);
    });
    done();
  };
};
export default Routes
