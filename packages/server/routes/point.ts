import { Sql } from "postgres";
import { Store, Lock } from "@alfs-appraisal/core";
import { FastifyPlugin } from "fastify";
import Point, {
  FilterFn,
  LoadFn,
} from "@alfs-appraisal/core/point";

export const Routes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const { store, lock } = props;
  const filter = FilterFn(props)
  const load = LoadFn(props)
  return function (app, opts, done) {
    app.post<{ Body: Parameters<FilterFn>[0] }>("/filter", {}, async (req, reply) => {
      const res = await filter(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<LoadFn>[0] }>("/load", {}, async (req, reply) => {
      const res = await load({
        ...req.body,
        points: req.body.points.map(Point),
      });
      reply.send(res);
    });
    done();
  };
};
export default Routes
