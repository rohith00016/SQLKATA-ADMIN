import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [tables, setTables] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [defaultQueries , setDefaultQueries] = useState(null);
  const [answers, setAnswers] = useState([{}]);
  const [dataTableCMD, setDataTableCMD] = useState([]);

  return (
    <DataContext.Provider 
      value={{
      tables, 
      setTables ,
      dataTableCMD,
      setDataTableCMD,
      tableData,
      setTableData,
      defaultQueries, 
      setDefaultQueries, 
      answers, 
      setAnswers
    }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };