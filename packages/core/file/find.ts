import { File } from '.'
import { Store } from '@alfs-appraisal/core'
import ErrorKind from '@alfs-appraisal/core/error'

export type Fn = (payload: {
  id?: string;
}) => Promise<File | Error>

export const Fn = (props: {
  store:Store
}):Fn => {
  return async (payload) => {
    const file = await  props.store.file.find(payload)
    if(file instanceof Error) { return file }
    if(file === undefined) { return new Error(ErrorKind.FileNotFound) }
    return file
  }
}
export default Fn
