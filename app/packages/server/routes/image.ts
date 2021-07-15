import { Sql } from "postgres";
import { Store, Lock } from "@sivic/core";
import { FastifyPlugin } from "fastify";
import {
  FindFn,
  DeleteFn,
  FilterFn,
  CropFn,
} from "@sivic/core/image";

export const Routes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const { store, lock } = props;
  const find = FindFn(props)
  const filter = FilterFn(props)
  const delete_ = DeleteFn(props)
  const crop = CropFn(props)
  return function (app, opts, done) {
    app.post<{ Body: Parameters<typeof crop>[0] }>("/crop", {}, async (req, reply) => {
      const res = await crop(req.body);
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
    app.post<{ Body: Parameters<typeof find>[0] }>("/delete", {}, async (req, reply) => {
      const res = await delete_(req.body);
      reply.send(res);
    });
    done();
  };
};
export default Routes
