import React from 'react';
import './ConfirmDialog.css';
const ConfirmDialog = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) {
    return null; // Don't render the modal if 'show' is false
  }

  return (
    <div className="confirm-dialog">
      <div className="confirm-dialog-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmDialog;