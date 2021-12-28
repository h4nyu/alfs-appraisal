import React from "react"
import { SpinnerCircular } from 'spinners-react';


export const Loading = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        zIndex: 999,
        opacity: 0.5,
      }}
      className="has-background-black"
    >
      <SpinnerCircular size={50} thickness={100} speed={100} color="rgba(181, 181, 181, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
    </div>
  )
}
export default Loading
