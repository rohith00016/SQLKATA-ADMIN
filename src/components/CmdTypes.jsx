import React from 'react';
import { useCmdType } from '../contextApi/CmdTypeContext';

const CmdTypes = () => {
  const { commandTypes, handleCheckboxChange } = useCmdType();

  return (
    <div className="my-4 mx-4 d-flex align-items-center justify-content-center">
      <div className="col-2 d-inline">
        <div className="form-check d-inline">
          <input
            type="checkbox"
            id="ddl"
            value="ddl"
            checked={commandTypes.includes("ddl")}
            onChange={() => handleCheckboxChange("ddl")}
            className="form-check-input rounded-circle"
          />
          <label htmlFor="ddl" className="form-check-label custom-label m-0">DDL</label>
        </div>
      </div>
      <div className="col-2">
        <div className="form-check d-inline">
          <input
            type="checkbox"
            id="dml"
            value="dml"
            checked={commandTypes.includes("dml")}
            onChange={() => handleCheckboxChange("dml")}
            className="form-check-input rounded-circle"
          />
          <label htmlFor="dml" className="form-check-label custom-label m-0">DML</label>
        </div>
      </div>
      <div className="col-2">
        <div className="form-check d-inline">
          <input
            type="checkbox"
            id="dcl"
            value="dcl"
            checked={commandTypes.includes("dcl")}
            onChange={() => handleCheckboxChange("dcl")}
            className="form-check-input rounded-circle"
          />
          <label htmlFor="dcl" className="form-check-label custom-label m-0">DCL</label>
        </div>
      </div>
      <div className="col-2">
        <div className="form-check d-inline">
          <input
            type="checkbox"
            id="tcl"
            value="tcl"
            checked={commandTypes.includes("tcl")}
            onChange={() => handleCheckboxChange("tcl")}
            className="form-check-input rounded-circle"
          />
          <label htmlFor="tcl" className="form-check-label custom-label m-0">TCL</label>
        </div>
      </div>
      <div className="col-2">
        <div className="form-check d-inline">
          <input
            type="checkbox"
            id="dql"
            value="dql"
            checked={commandTypes.includes("dql")}
            onChange={() => handleCheckboxChange("dql")}
            className="form-check-input rounded-circle"
          />
          <label htmlFor="dql" className="form-check-label custom-label m-0">DQL</label>
        </div>
      </div>
    </div>
  );
};

export default CmdTypes;
