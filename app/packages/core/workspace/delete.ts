import { v4 as uuid } from 'uuid';
import { Lock, ErrorKind, Store } from "@sivic/core";
import FindFn from "@sivic/core/workspace/find"
import DeleteImageFn from "@sivic/core/image/delete"
import FilterImageFn from "@sivic/core/image/filter"

export type Payload = {
  id: string;
};


export type DeleteFn = (payload: Payload) => Promise<void | Error>
export const DeleteFn = (props: {
  store: Store,
}) => {
  const find = FindFn(props)
  const deleteImage = DeleteImageFn(props)
  const filterImage = FilterImageFn(props)
  return async (payload: Payload) => {
    const workspace = await find(payload)
    if(workspace instanceof Error) { return workspace }

    const images = await filterImage({workspaceId: workspace.id})
    if(images instanceof Error) { return images}
    for(const image of images){
      const err = await deleteImage({id: image.id})
      if (err instanceof Error) { return err; }
    }

    let err = await props.store.workspace.delete({id: payload.id})
    if(err instanceof Error) { return err }
  }
}
export default DeleteFn
