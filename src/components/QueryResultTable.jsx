import React from 'react';

const QueryResultTable = ({ queryResult }) => {
  if (!queryResult || queryResult.length === 0) {
    return null;
  }

  const { columns, values } = queryResult[0]; 

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="result-table-container">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  {columns.map((columnName, index) => (
                    <th key={index} id={`column-${columnName}`}>
                      {columnName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {values.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((value, colIndex) => (
                      <td key={colIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryResultTable;
