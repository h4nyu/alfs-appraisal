import React from 'react';

export const Modal = (props: {
  isActive: boolean,
  children?: React.ReactNode,
  onClose?: VoidFunction,
}) => {
  return (
    <div className={`modal ${props.isActive ? "is-active" : "" }`}>
      <div className="modal-background"
        onClick={props.onClose}
      />
      <div 
        style={{
          position: "relative",
          overflow: "scroll",
        }}
      >
        {props.children}
      </div>
      <button 
        className="modal-close is-large" 
        aria-label="close"
        onClick={props.onClose}
      />
    </div>
  )
}
export default Modal;
