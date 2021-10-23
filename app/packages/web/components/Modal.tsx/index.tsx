import React from 'react';

export const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  )
}
export default Modal;
