import React from 'react';

function ComponentSelectionModal({ onClose, onSelect }) {
  const handleSelect = (type) => {
    onSelect(type);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">×</button>
        <h2>Select Component Type</h2>
        <button onClick={() => handleSelect("h1")}>Heading 1</button>
        <button onClick={() => handleSelect("h2")}>Heading 2</button>

      </div>
    </div>
  );
}

export default ComponentSelectionModal;
