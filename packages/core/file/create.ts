import { Lock, Store } from "@sivic/core";
import ErrorKind from "@sivic/core/error"
import { File } from ".";

export type Payload = {
  id?: string,
  data: string; //base64
  createdAt?: Date,
};

export type Fn = (payload: Payload) => Promise<File | Error>
export const Fn = (props: {
  store: Store;
}):Fn => {
  return async (payload: Payload) => {
    const file = File(payload)
    const err = await props.store.file.insert(file)
    if(err instanceof Error) { return err }
    return file
  }
}
export default Fn
