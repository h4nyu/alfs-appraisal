import { Row, Sql } from "postgres";
import { Box } from "@sivic/core/box";
import { BoxStore } from "@sivic/core";
import { first } from "lodash"


const TABLE = "boxes"
const COLUMNS = [
  "id", 
  "x0",
  "y0",
  "x1",
  "y1",
  "image_id", 
  "tag_id", 
  "file_id", 
] as const

export const Store = (
  sql: Sql<any>
): BoxStore => {
  const to = (r: Row) => {
    return Box({
      id: r.id,
      x0: r.x0,
      y0: r.y0,
      x1: r.x1,
      y1: r.y1,
      imageId: r.image_id ?? undefined,
      tagId: r.tag_id ?? undefined,
      fileId: r.file_id ?? undefined,
    });
  };

  const from = (r: Box): Row => {
    return {
      id: r.id,
      x0: r.x0,
      y0: r.y0,
      x1: r.x1,
      y1: r.y1,
      tag_id: r.tagId ?? null,
      image_id: r.imageId ?? null,
      file_id: r.fileId ?? null,
    };
  };

  const find = async (payload: {
    id?: string;
  }) => {
    try{
      const { id } = payload
      const rows = await(async () => {
        if(id !== undefined){
          return await sql`SELECT * FROM ${sql(TABLE)} WHERE id = ${id} LIMIT 1`
        }
        return []
      })()
      return first(rows.map(to))
    }catch(e){
      return e
    }
  };

  const filter = async (payload: {
    imageId?: string;
    tagId?:string;
  }) => {
    try{
      const { imageId, tagId } = payload
      const rows = await(async () => {
        if(imageId !== undefined){
          return await sql`SELECT * FROM ${sql(TABLE)} WHERE image_id = ${imageId}`
        }else if(tagId !== undefined){
          return await sql`SELECT * FROM ${sql(TABLE)} WHERE tag_id = ${tagId}`
        }
        return []
      })()
      return rows.map(to)
    }catch(e){
      return e
    }
  };

  const update = async (payload:  Box) => {
    try {
      await sql`UPDATE ${sql(TABLE)} SET ${sql(from(payload), ...COLUMNS)} WHERE id = ${payload.id}`
    }catch(e){
      return e
    }
  };

  const create = async (payload: Box): Promise<void | Error> => {
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
    find,
    filter,
    create,
    update,
    delete: delete_,
  };
};
export default Store
