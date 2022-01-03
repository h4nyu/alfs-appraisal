import React from "react"
import { v4 as uuid } from "uuid";
import { Level } from "@alfs-appraisal/web/components/Toast"



export const useToast = (props?: {
  message?: string
  level?: Level
}) => {
  const [id, setId] = React.useState<string>("")
  const [message, setMessage] = React.useState<string>(props?.message ?? "")
  const [level, setLevel] = React.useState<Level>(props?.level ?? Level.Info)
  const show = (message: string, level?: Level) => {
    setMessage(message)
    if(level){
      setLevel(level)
    }
    setId(uuid())
  }

  const info = (message: string) => {
    setMessage(message)
    setLevel(Level.Info)
    setId(uuid())
  }
  const error = () => {
  }
  return {
    message,
    level,
    id,
    info,
  }
}
export default useToast
