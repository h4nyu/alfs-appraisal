import { Sql } from "postgres";
import { Store, Lock } from "@sivic/core";
import { FastifyPlugin } from "fastify";
import {
  CreateFn,
} from "@sivic/core/workspace";

export const WorkspaceRoutes = (args: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const { store, lock } = args;
  return function (app, opts, done) {
    [
      ["/create", CreateFn]
    ].forEach(([path, Fn]) => {
      const fn = Fn({store})
      app.post<{ Body: Parameters<Fn>[0] }>("path", {}, async (req, reply) => {
        const res = await srv.create(req.body);
        reply.send(res);
      });
    })
    // app.post<{ Body: UpdatePayload }>("/update", {}, async (req, reply) => {
    //   const res = await srv.update(req.body);
    //   reply.send(res);
    // });
    // app.post<{ Body: FilterPayload }>("/filter", {}, async (req, reply) => {
    //   const res = await srv.filter(req.body);
    //   reply.send(res);
    // });
    // app.post<{ Body: FindPayload }>("/find", {}, async (req, reply) => {
    //   const res = await srv.find(req.body);
    //   reply.send(res);
    // });
    // app.post<{ Body: DeletePayload }>("/delete", {}, async (req, reply) => {
    //   const res = await srv.delete(req.body);
    //   reply.send(res);
    // });
    // done();
  };
};
