import fastify, { FastifyPlugin } from "fastify";
import { Lock, Store } from "@sivic/core";
import path from "path";
import WorkspaceRoutes from "./workspace";
import ImageRoutes from "./image";
import BoxRoutes from "./box";
import FileRoutes from "./file";
import TagRoutes from "./tag"
import PointRoutes from "./point";
import LineRoutes from "./line";


import fastifyStatic from "fastify-static";
import fastifyHttpProxy from "fastify-http-proxy";


export const App = (args: { store: Store; lock: Lock }) => {
  const { store, lock } = args;
  const app = fastify({
    bodyLimit: 12485760,
    logger: true,
  });
  const prefix = path.join("/", process.env.PREFIX || "", "/api/v1");
  if(process.env.NODE_ENV !== "production") {
    app.register(fastifyStatic, {
      root: "/srv/packages/web/dist",
    });
    // TODO hotreload
    // app.register(fastifyHttpProxy, {
    //   upstream: 'http://ui:8080',
    //   prefix: `/`,
    // })
  }else{
    app.register(fastifyStatic, {
      root: "/srv/packages/web/dist",
    });
  }
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

  // app.register(DetectRoutes({ store, lock }), {
  //   prefix: `${prefix}/detect`,
  // });
  // app.register(LineRoutes({ store, lock }), {
  //   prefix: `${prefix}/line`,
  // });
  // app.register(TrasnformRoutes({ store, lock }), {
  //   prefix: `${prefix}/transform`,
  // });
  // app.register(TagRoutes({ store, lock }), {
  //   prefix: `${prefix}/tag`,
  // });
  // app.register(FileRoutes({ store, lock }), {
  //   prefix: `${prefix}/file`,
  // });
  app.ready(async () => {
    console.log(app.printRoutes());
  });
  return app;
};
