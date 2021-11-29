import React from "react"

export const LoadingButton = (props:{
  onClick?:() => Promise<void>
  children?:React.ReactNode,
  className?: string,
}) => {
  const [isActive, setIsActive] = React.useState(false)
  return (
    <div 
      className={`button ${isActive && "is-loading"} ${props.className ?? ""}`}
      onClick={async () => {
        if(props.onClick){
          setIsActive(true)
          await props.onClick()
          setIsActive(false)
        }
      }}
    >
      {props.children}
    </div>
  )
}
export default LoadingButton
