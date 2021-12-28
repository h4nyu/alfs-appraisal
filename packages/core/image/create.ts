import { v4 as uuid } from 'uuid';
import { Lock, Store, ErrorKind } from "@alfs-appraisal/core"
import CreateFileFn from "@alfs-appraisal/core/file/create"
import { Image } from "@alfs-appraisal/core/image"
import FindWorkspaceFn from "@alfs-appraisal/core/workspace/find"

export type Fn = (payload: {
  name: string;
  workspaceId?: string;
  data: string; //base64
}) => Promise<Image | Error>

export const Fn = (props: {
  store: Store,
}):Fn => {
  const createFile = CreateFileFn(props)
  const findWorkspace = FindWorkspaceFn(props)
  return async (payload) => {
    if(payload.workspaceId){
      const workspace = await findWorkspace({ id: payload.workspaceId })
      if(workspace instanceof Error) { return workspace }
    }
    const file = await createFile({ data: payload.data })
    if(file instanceof Error) { return file }
    const image = Image({
      name: payload.name,
      fileId: file.id,
      workspaceId: payload.workspaceId,
    })
    const imageErr = await props.store.image.insert(image)
    if(imageErr instanceof Error) { return imageErr}
    return image
  }
}

export default Fn
