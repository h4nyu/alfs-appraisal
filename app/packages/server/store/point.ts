import { Row, Sql } from "postgres";
import { Point } from "@sivic/core/point";
import { PointStore } from "@sivic/core";

const TABLE = "points"
const COLUMNS = [
  "id", 
  "x",
  "y",
  "box_id", 
] as const


export const Store = (
  sql: Sql<any>
): PointStore => {
  const to = (r: Row) => {
    return Point({
      id: r.id,
      x: r.x,
      y: r.y,
      boxId: r.box_id || undefined,
    });
  };

  const from = (r: Point): Row => {
    return {
      id: r.id,
      x: r.x,
      y: r.y,
      box_id: r.boxId || null,
    };
  };
  const filter = async (payload: {
    boxId?: string;
  }) => {
    try {
      const { boxId } = payload
      const rows = await(async () => {
        if(boxId !== undefined){
          return await sql`SELECT * FROM ${sql(TABLE)} WHERE box_id = ${boxId}`
        }
        return []
      })()
      return rows.map(to)
    }catch(e){
      return e
    }
  };

  const create = async (payload: Point) => {
    try {
      await sql`
      INSERT INTO ${sql(TABLE)} ${sql(
        from(payload),...COLUMNS
      )}`;
    }catch(e){
      return e
    }
  };
  const delete_ = async (payload: {id?:string}) => {
    const { id } = payload
    try {
      if(id !== undefined) { 
        await sql`DELETE FROM ${sql(TABLE)} WHERE id = ${id}`
      }
    }catch(e) {
      return e
    }
  };

  return {
    filter,
    create,
    delete: delete_,
  };
};

export default Store
