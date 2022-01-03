import React from "react"
import { v4 as uuid } from "uuid";
import { toast } from 'react-toastify';


export const useToast = () => {
  const info = (message: string) => {
    show(message, "is-info")
  }
  const error = (message: string) => {
    show(message, "is-danger")
  }
  const show = (message:string, color:string) => {
    toast(message, {
      className: `message ${color} p-0`,
    });
  }

  return {
    info,
    error,
  }
}
export default useToast
