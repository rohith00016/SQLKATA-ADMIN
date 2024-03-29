import React from 'react';
import { useData } from '../../contextApi/DataContext';

const QueryResultTable = ({ queryResult, maxHeight, error }) => {

  const { tables } = useData();

  return (
    <div className="container-fluid" key={queryResult}>
      <div className="row">
        <div className="col-12">
          <div className="result-table-container" style={{ maxHeight, overflowY: 'auto' }}>
            {queryResult && queryResult.map((resultSet, index) => (
              <React.Fragment key={index}>
                <h4>{tables && tables[index]}</h4>
                {resultSet.result && resultSet.result[0] && resultSet.result[0].columns && resultSet.result[0].values ? (
                  <table className="table table-bordered table-striped table-hover">
                    <thead>
                      <tr>
                        {resultSet.result[0].columns.map((columnName, colIndex) => (
                          <th key={colIndex} id={`column-${columnName}`}>
                            {columnName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {resultSet.result[0].values.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  {error} && <div className="text-danger">{error}</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryResultTable;
