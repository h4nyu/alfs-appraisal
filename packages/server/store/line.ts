import { Row, Sql } from "postgres";
import { Line } from "@alfs-appraisal/core/line";
import { Point } from "@alfs-appraisal/core/point";
import { LineStore } from "@alfs-appraisal/core";
import { first } from "lodash"


const TABLE = "lines"
const COLUMNS = [
  "id", 
  "box_id",
  "start_id",
  "start_x",
  "start_y",
  "start_position_id",
  "end_id",
  "end_x",
  "end_y",
  "end_position_id",
] as const

export const Store = (
  sql: Sql<any>
): LineStore => {
  const to = (r: Row) => {
    return Line({
      id: r.id,
      boxId: r.box_id,
      start: Point({ id:r.start_id, x: r.start_x, y: r.start_y, positionId:r.start_position_id }),
      end: Point({id: r.end_id, x: r.end_x, y: r.end_y, positionId:r.end_position_id}),
    });
  };

  const from = (r: Line): Row => {
    return {
      id: r.id,
      box_id: r.boxId,
      start_id: r.start.id,
      start_x: r.start.x,
      start_y: r.start.y,
      start_position_id: r.start.positionId,
      end_id: r.end.id,
      end_x: r.end.x,
      end_y: r.end.y,
      end_position_id: r.end.positionId
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
