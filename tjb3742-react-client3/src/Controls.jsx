import React from 'react';

const Controls = ({ onAddRemove, buttonText }) => {
  return (
    <div className="button-wrapper">
      <button id="addRemoveBtn" onClick={onAddRemove}>
        {buttonText}
      </button>
    </div>
  );
};

export default Controls;
