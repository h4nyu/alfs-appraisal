import { Sql } from "postgres";
import { Store, Lock } from "@sivic/core";
import { FastifyPlugin } from "fastify";
import Line, {
  FilterFn,
  LoadFn,
} from "@sivic/core/line";

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
        lines: req.body.lines.map(Line),
      });
      console.log(res)
      reply.send(res);
    });
    done();
  };
};
export default Routes
