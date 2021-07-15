import { Sql } from "postgres";
import { Store, Lock } from "@sivic/core";
import { FastifyPlugin } from "fastify";
import {
  FindFn,
  DeleteFn,
  FilterFn,
  ReplaceBoxesFn,
  ReplaceLinesFn,
} from "@sivic/core/image";

export const Routes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const { store, lock } = props;
  const find = FindFn(props)
  const filter = FilterFn(props)
  const delete_ = DeleteFn(props)
  const replaceBoxes = ReplaceBoxesFn(props)
  const replaceLines = ReplaceLinesFn(props)
  return function (app, opts, done) {
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
    app.post<{ Body: Parameters<typeof replaceBoxes>[0] }>("/box/replace", {}, async (req, reply) => {
      const res = await replaceBoxes(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<typeof replaceLines>[0] }>("/line/replace", {}, async (req, reply) => {
      const res = await replaceLines(req.body);
      reply.send(res);
    });
    done();
  };
};
export default Routes
