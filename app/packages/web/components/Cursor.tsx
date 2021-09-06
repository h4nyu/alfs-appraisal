import React from "react"

export const Cursor = (props:{
  onUp?:() =>void,
  onDown?:() =>void,
  onRight?:() =>void,
  onLeft?:() =>void,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: "repeat(3, auto)",
        gridTemplateColumns: "repeat(3, auto)",
      }}
    >
      <div className="button"
        style={{
          gridColumn:2,
          gridRow:1,
        }}
        onClick={props.onUp && (() => props.onUp?.())}
      >
        <i className="fas fa-arrow-up"></i>
      </div>
      <div className="button"
        style={{
          gridColumn:1,
          gridRow:2,
        }}
        onClick={props.onLeft && (() => props.onLeft?.())}
      >
        <i className="fas fa-arrow-left"></i>
      </div>
      <div className="button"
        style={{
          gridColumn:3,
          gridRow:2,
        }}
        onClick={props.onRight && (() => props.onRight?.())}
      >
        <i className="fas fa-arrow-right"></i>
      </div>
      <div className="button"
        style={{
          gridColumn:2,
          gridRow:3,
        }}
        onClick={props.onDown && (() => props.onDown?.())}
      >
        <i className="fas fa-arrow-down"></i>
      </div>
    </div>
  )
}
export default Cursor
