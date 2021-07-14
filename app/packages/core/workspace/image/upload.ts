import { Lock, ErrorKind, Store } from "@sivic/core";
import { Workspace } from "@sivic/core/workspace";
import FindFn from "@sivic/core/workspace/find"
import { Image } from "@sivic/core/image"
import { CreateFn } from "@sivic/core/image/create"
export type Payload = {
  workspaceId: string;
  data:string;
  name:string;
} 

export type Fn = (payload: Payload) => Promise<Image | Error>
export const Fn = (props: {
  store: Store;
  lock: Lock;
}) => {
  const find = FindFn(props)
  const createImage = CreateFn(props)
  return async (payload: Payload) => {
    const workspace = find({id: payload.workspaceId})
    if(workspace instanceof Error) { return workspace }
    const image = await createImage(payload)
    if(image instanceof Error) { return image}
    return image
  }
}

export default Fn
