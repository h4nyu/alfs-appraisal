import { Sql } from "postgres";
import { Store, Lock } from "@sivic/core";
import { FastifyPlugin } from "fastify";
import {
  CreateFn,
  FindFn,
  DeleteFn,
  FilterFn,
  ReplaceLinesFn,
  ReplacePointsFn,
} from "@sivic/core/image";

export const Routes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const { store, lock } = props;
  const create = CreateFn(props)
  const find = FindFn(props)
  const filter = FilterFn(props)
  const delete_ = DeleteFn(props)
  const replaceLines = ReplaceLinesFn(props)
  const replacePoints = ReplacePointsFn(props)
  return function (app, opts, done) {
    app.post<{ Body: Parameters<CreateFn>[0] }>("/create", {}, async (req, reply) => {
      const res = await create(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof delete_>[0] }>("/delete", {}, async (req, reply) => {
      const res = await delete_(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof find>[0] }>("/find", {}, async (req, reply) => {
      const res = await find(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof filter>[0] }>("/filter", {}, async (req, reply) => {
      const res = await filter(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof replaceLines>[0] }>("/replace-lines", {}, async (req, reply) => {
      const res = await replaceLines(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof replacePoints>[0] }>("/replace-ponts", {}, async (req, reply) => {
      const res = await replacePoints(req.body);
      reply.send(res);
    });
    done();
  };
};
export default Routes
