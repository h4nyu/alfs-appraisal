import React from "react"


export const useModal = (props?: {isActive?:boolean}) => {
  const [isActive, setIsActive] = React.useState<boolean>(props?.isActive ?? false)
  const toggle = () => {
    setIsActive(!isActive)
  }
  const open = () => {
    setIsActive(true)
  }
  const close = () => {
    setIsActive(false)
  }
  return {
    isActive,
    toggle,
    open,
    close,
  }
}
export default useModal
