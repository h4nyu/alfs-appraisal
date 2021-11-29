import { v4 as uuid } from 'uuid';
export { default as FindFn } from './find'

export type File = {
  id: string,
  data: string; //base64
  createdAt: Date,
}

export const File = (props?:{
  id?: string,
  data?: string,
  createdAt?: Date,
}) => {
  const id = props?.id ?? uuid()
  const data = props?.data ?? ""
  const createdAt = props?.createdAt ?? new Date()
  return {
    id,
    data,
    createdAt,
  }
}
export default File
