import { Sql } from "postgres";
import { Store, Lock } from "@alfs-appraisal/core";
import { FastifyPlugin } from "fastify";
import { FindFn } from "@alfs-appraisal/core/file";

export const Routes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const find = FindFn(props)
  return function (app, opts, done) {
    app.post<{ Body: Parameters<typeof find>[0] }>("/find", {}, async (req, reply) => {
      const res = await find(req.body);
      reply.send(res);
    });
    done();
  };
};
export default Routes

