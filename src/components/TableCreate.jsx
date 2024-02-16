import React from "react";
import "../styles/TableCreate.css";

const TableCreate = ({ columns, values }) => {
  return (
    <div className="sqltable-wrapper">
      <table id="sqltable" className="sqltable">
        <thead>
          <tr className="sqltable-row sqltable-head">
            {columns &&
              columns.map((column, i) => (
                <th key={i} className="sqltable-cell">
                  {column}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {values &&
            values.map((value, i) => (
              <tr key={i} className="sqltable-row">
                {value &&
                  value.map((val, j) => (
                    <td key={j} className="sqltable-cell">
                      {val}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCreate;
