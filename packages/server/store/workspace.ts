import { Row, Sql } from "postgres";
import { first } from "lodash";

import { Workspace } from "@alfs-appraisal/core/workspace";
import { WorkspaceStore } from "@alfs-appraisal/core";

const COLUMNS = [
  "id",
  "name",
  "created_at",
] as const
export const Store = (sql: Sql<any>): WorkspaceStore => {
  const to = (r: Row): Workspace => {
    return Workspace({
      id: r.id,
      name: r.name,
      imageIds: [],
      createdAt: r.created_at,
    });
  };

  const from = (r: Workspace): Row => {
    return {
      id: r.id,
      name: r.name,
      created_at: r.createdAt,
    };
  };

  const find = async (payload: {
    id?: string;
    name?: string
  }): Promise<Workspace | undefined | Error> => {
    try {
      const rows= await (async () => {
        const { id, name } = payload;
        if (id !== undefined) {
          return await sql`SELECT * FROM workspaces WHERE id=${id}`;
        }
        if (name !== undefined) {
          return await sql`SELECT * FROM workspaces WHERE name=${name}`;
        }
        return []
      })()
      const row = first(rows.map(to));
      if (row === undefined) {
        return;
      }
      const workspaceImages = await sql`SELECT * FROM images WHERE workspace_id = ${row.id}`
      row.imageIds = workspaceImages.map(x => x.id)
      return row;
    } catch (err) {
      return err;
    }
  };

  const filter = async (payload: {
    ids?: string[];
  }): Promise<Workspace[] | Error> => {
    try {
      const { ids } = payload;
      let rows = [];
      const columns = [
        "id",
        "name",
        "created_at",
      ];
      if (ids !== undefined && ids.length > 0) {
        rows = await sql`SELECT ${sql(
          columns
        )} FROM workspaces WHERE id IN (${ids})`;
      } else {
        rows = await sql`SELECT ${sql(columns)} FROM workspaces`;
      }
      if(rows.length === 0){
        return []
      }
      const workspaces = rows.map(to)
      const workspaceIds = workspaces.map(x => x.id)
      const workspaceImages = await sql`SELECT * FROM images WHERE workspace_id IN (${workspaceIds})`
      for(const workspace of workspaces){
        workspace.imageIds = workspaceImages.filter(x => x.workspace_id === workspace.id).map(x => x.image_id)
      }
      return workspaces;
    } catch (err) {
      return err;
    }
  };
  const insert = async (payload: Workspace): Promise<void | Error> => {
    try {
      await sql`
      INSERT INTO workspaces ${sql(
        from(payload),...COLUMNS
      )}`;
    } catch (err) {
      return err;
    }
  };
  const update = async (payload: Workspace): Promise<void | Error> => {
    try {
      await sql`UPDATE workspaces SET ${sql(from(payload),...COLUMNS)} WHERE id = ${payload.id}`;
    }catch (err) {
      return err;
    }
  };

  const delete_ = async (payload: {
    id?: string;
  }) => {
    try {
      const { id } = payload;
      if (id !== undefined) {
        await sql`DELETE FROM workspaces WHERE id=${id}`;
      }
    } catch (err) {
      return err;
    }
  };

  const clear = async (): Promise<void> => {
    try {
      await sql`TRUNCATE TABLE workspaces`;
    } catch (err) {
      return err;
    }
  };
  return {
    filter,
    find,
    insert,
    update,
    clear,
    delete: delete_,
  };
};
export default Store
