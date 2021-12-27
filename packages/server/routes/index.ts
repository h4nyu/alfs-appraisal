import fastify, { FastifyPlugin } from "fastify";
import { Lock, Store } from "@alfs-appraisal/core";
import path from "path";
import WorkspaceRoutes from "./workspace";
import ImageRoutes from "./image";
import BoxRoutes from "./box";
import FileRoutes from "./file";
import TagRoutes from "./tag"
import PointRoutes from "./point";
import LineRoutes from "./line";
import DetectRoutes from "./detect";

import fastifyStatic from "fastify-static";
import fastifyHttpProxy from "fastify-http-proxy";


export const App = (args: { store: Store; lock: Lock }) => {
  const { store, lock } = args;
  const app = fastify({
    bodyLimit: 12485760,
    logger: true,
  });
  const prefix = path.join("/", process.env.PREFIX || "", "/api/v1");
  app.register(fastifyStatic, {
    root: "/app/packages/web/dist",
  });
  app.register(WorkspaceRoutes({ store, lock }), {
    prefix: `${prefix}/workspace`,
  });
  app.register(ImageRoutes({ store, lock }), {
    prefix: `${prefix}/image`,
  });
  app.register(BoxRoutes({ store, lock }), {
    prefix: `${prefix}/box`,
  });
  app.register(FileRoutes({ store, lock }), {
    prefix: `${prefix}/file`,
  });
  app.register(TagRoutes({ store, lock }), {
    prefix: `${prefix}/tag`,
  });
  app.register(PointRoutes({ store, lock }), {
    prefix: `${prefix}/point`,
  });
  app.register(LineRoutes({ store, lock }), {
    prefix: `${prefix}/line`,
  });
  app.register(DetectRoutes({ store, lock }), {
    prefix: `${prefix}/detect`,
  });
  app.ready(async () => {
    console.log(app.printRoutes());
  });
  return app;
};
