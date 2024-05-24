import React from 'react';

function Modal({ handleClose, component }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>{component.type}</h2>
        <p>{component.content}</p>
      </div>
    </div>
  );
}

export default Modal;
