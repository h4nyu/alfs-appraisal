
import { Sql } from "postgres";
import { Store, Lock } from "@alfs-appraisal/core";
import { FastifyPlugin } from "fastify";
import {
  Service,
  CropPayload,
} from "@alfs-appraisal/core/transform";

export const TrasnformRoutes = (args: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const { store, lock } = args;
  const srv = Service({ store, lock });
  return function (app, opts, done) {
    app.post<{ Body: CropPayload }>("/crop", {}, async (req, reply) => {
      const res = await srv.crop(req.body);
      reply.send(res);
    });
    done();
  };
};
