import React from "react"
import { v4 as uuid } from "uuid";
import { Level } from "@alfs-appraisal/web/components/Toast"
import { toast } from 'react-toastify';




export const useToast = () => {
  const info = (message: string) => {
    show(message, "is-info")
  }
  // TODO
  const show = (message:string, color:string) => {
    toast(message, {
      className: `${color} p-0`,
    });
  }

  return {
    info,
  }
}
export default useToast
