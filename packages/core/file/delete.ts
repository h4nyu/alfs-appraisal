import { Store } from "@sivic/core"

export type Fn = (payload:{
  id: string;
}) => Promise<void | Error>
export const Fn = (props: {
  store: Store,
}):Fn => {
  return async (payload) => {
    const err = await props.store.file.delete({id:payload.id})
    if(err instanceof Error) { return err }
  }
}
export default Fn

