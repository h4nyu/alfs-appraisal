import { Store } from "@sivic/core";
import { ErrorKind } from "@sivic/core/error"
import { Tag } from ".";

export type Fn = (tag:Tag) => Promise<void | Error>
export const Fn = (props: {
  store: Store
}):Fn => {
  return async (tag: Readonly<Tag>):Promise<void | Error> => {
    const row = await props.store.tag.find({
      name: tag.name,
      workspaceId: tag.workspaceId,
    })
    if(row instanceof Error){ return row }
    if(row !== undefined && row.id !== tag.id){
      return new Error(ErrorKind.TagAlreadyExist)
    }
  }
}
export default Fn
