import { v4 as uuid } from 'uuid';
import { Lock, Store, ErrorKind } from "@sivic/core"
import CreateFileFn from "@sivic/core/file/create"
import { Image } from "@sivic/core/image"

export type Payload = {
  name: string;
  workspaceId?: string;
  data: string; //base64
  boxId?: string;
};
export type CreateFn = (payload: Payload) => Promise<Image | Error>
export const CreateFn = (props: {
  store: Store,
}):CreateFn => {
  const createFile = CreateFileFn(props)
  return async (payload: Payload) => {
    const file = await createFile({ data: payload.data })
    if(file instanceof Error) { return file }
    const image = Image({
      name: payload.name,
      fileId: file.id,
      workspaceId: payload.workspaceId,
      boxId: payload.boxId,
    })
    const imageErr = await props.store.image.insert(image)
    if(imageErr instanceof Error) { return imageErr}
    return image
  }
}

export default CreateFn
