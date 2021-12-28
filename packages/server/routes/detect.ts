import { Sql } from "postgres";
import { Store, Lock } from "@alfs-appraisal/core";
import { FastifyPlugin } from "fastify";
import { DetectPayload, Service } from "@alfs-appraisal/core/detect";

export const DetectRoutes = (args: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const { store, lock } = args;
  const srv = Service({store, lock})
  return function (app, opts, done) {
    app.post<{ Body: DetectPayload }>("/box", {}, async (req, reply) => {
      const res = await srv.box(req.body);
      reply.send(res);
    });
    done();
  };
};

export default DetectRoutes;
