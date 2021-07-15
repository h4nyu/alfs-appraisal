import { Sql } from "postgres";
import { Store, Lock } from "@sivic/core";
import { FastifyPlugin } from "fastify";
import {
  FilterFn,
} from "@sivic/core/box";

export const Routes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const { store, lock } = props;
  const filter = FilterFn(props)
  return function (app, opts, done) {
    app.post<{ Body: Parameters<typeof filter>[0] }>("/filter", {}, async (req, reply) => {
      const res = await filter(req.body);
      reply.send(res);
    });
    done();
  };
};
export default Routes
