import React from 'react';
import { useCmdType } from '../contextApi/CmdTypeContext';

const CmdTypes = () => {
  const { commandType, handleCheckboxChange } = useCmdType();

  return (
    <div className="my-4 mx-4 d-flex align-items-center">
      <label className="me-2">Select Commands:</label>
      {["dml", "dcl", "tcl", "dql"].map((type) => (
        <div key={type} className="form-check me-3">
          <input
            type="radio"
            id={type}
            name="commandType"
            value={type}
            checked={commandType === type}
            onChange={() => handleCheckboxChange(type)}
            className="form-check-input"
          />
          <label htmlFor={type} className="form-check-label">
            {type}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CmdTypes;
