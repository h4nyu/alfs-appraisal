import React from 'react';

export const  CheckBox = (props: {
  value?: boolean,
  onChange?: () => void,
  children?: React.ReactNode,
}) => {
  return (
    <div 
      onClick={props.onChange && (() => props.onChange?.())}
      style={{
        cursor: props.onChange && "pointer",
        display: "flex",
        alignItems: "center"
      }}
    >
      {props.value ? <i className="fas fa-check-square"/> : <i className="fas fa-square" />}
      {props.children}
    </div>
  );
}


export default CheckBox;
