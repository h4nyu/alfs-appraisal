import { Sql } from "postgres";
import { Store, Lock } from "@sivic/core";
import { FastifyPlugin } from "fastify";
import Box, {
  CreateFn,
  FilterFn,
  UpdateFn,
  LoadFn,
} from "@sivic/core/box";

export const Routes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const { store, lock } = props;
  const filter = FilterFn(props)
  const create = CreateFn(props)
  const update = UpdateFn(props)
  const load = LoadFn(props)
  return function (app, opts, done) {
    app.post<{ Body: Parameters<CreateFn>[0] }>("/create", {}, async (req, reply) => {
      const res = await create(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<UpdateFn>[0] }>("/update", {}, async (req, reply) => {
      const res = await update(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<FilterFn>[0] }>("/filter", {}, async (req, reply) => {
      const res = await filter(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<LoadFn>[0] }>("/load", {}, async (req, reply) => {
      const res = await load({
        ...req.body,
        boxes: req.body.boxes.map(Box),
      });
      reply.send(res);
    });
    done();
  };
};
export default Routes
