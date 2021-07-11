import { Row, Sql } from "postgres";
import { Tag } from "@sivic/core/tag";
import { first } from "lodash"

const TABLE = "tags"
const COLUMNS = [
  "id", 
  "image_id", 
  "x0", 
  "y0",
  "x1",
  "y1",
] as const

export const Store = (
  sql: Sql<any>
) => {
  const to = (r: Row) => {
    return Tag({
      id: r.id,
      name: r.name,
      workspaceId: r.workspace_id ?? undefined,
    });
  };

  const from = (r: Tag): Row => {
    return {
      id: r.id,
      name: r.name,
      workspace_id: r.workspaceId ?? null,
    };
  };

  const filter = async (payload: {
    imageId?: string;
  }) => {
    try{
      const { imageId } = payload
      const rows =  await (async () =>{
        if(imageId) {
          return await sql`SELECT * FROM tags WHERE image_id = ${imageId}`
        }
        return []
      })()
      return rows.map(to)
    }catch(err){
      return err
    }
  };

  const find = async (payload: {
    id?: string;
    name?: string;
    workspaceId?: string;
  }) => {
    try{
      const { id } = payload
      const rows =  await (async () =>{
        if(id) {
          return await sql`SELECT * FROM tags WHERE id = ${id} LIMIT 1`
        }
        return []
      })()
      return first(rows.map(to))
    }catch(err){
      return err
    }
  };

  const insert = async (payload: Tag) => {
    try{
      await sql` INSERT INTO tags ${sql(
        from(payload),
        ...COLUMNS,
      )}`;
    }catch(err){
      return err
    }
  };

  const update = async (payload: Tag) => {
    try{
      await sql`UPDATE ${sql(TABLE)} SET ${sql(from(payload), ...COLUMNS)} WHERE id = ${payload.id}`
    }catch(err){
      return err
    }
  };

  const delete_ = async (payload: {
    imageId: string;
  }) => {
    try {
      const { imageId } = payload;
      await sql`DELETE FROM tags WHERE image_id=${imageId}`;
    } catch (err) {
      return err;
    }
  };

  return {
    filter,
    insert,
    update,
    delete: delete_
  };
};
export default Store
