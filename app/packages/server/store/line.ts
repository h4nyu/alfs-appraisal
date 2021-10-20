import { Row, Sql } from "postgres";
import { Line } from "@sivic/core/line";
import { Point } from "@sivic/core/point";
import { LineStore } from "@sivic/core";
import { first } from "lodash"


const TABLE = "lines"
const COLUMNS = [
  "id", 
  "box_id",
  "start_x",
  "start_y",
  "end_x",
  "end_y",
] as const

export const Store = (
  sql: Sql<any>
): LineStore => {
  const to = (r: Row) => {
    return Line({
      id: r.id,
      boxId: r.boxId,
      start: Point({x: r.start_x, y: r.start_y}),
      end: Point({x: r.end_x, y: r.end_y}),
    });
  };

  const from = (r: Line): Row => {
    return {
      id: r.id,
      box_id: r.boxId,
      start_x: r.start.x,
      start_y: r.start.y,
      end_x: r.end.x,
      end_y: r.end.y,
    };
  };


  const filter = async (payload: {
    boxId?: string;
  }) => {
    try{
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


  const create = async (payload: Line): Promise<void | Error> => {
    try {
      await sql`
      INSERT INTO ${sql(TABLE)} ${sql(
        from(payload),...COLUMNS
      )}`;
    } catch (err) {
      return err;
    }
  };

  const delete_ = async (payload: {id?: string}) => {
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
