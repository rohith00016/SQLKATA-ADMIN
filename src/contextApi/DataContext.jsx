import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [mainQuestion, setMainQuestion] = useState();
  const [tables, setTables] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [queryResult, setQueryResult] = useState([]);
  const [defaultQueries , setDefaultQueries] = useState(null);
  const [answers, setAnswers] = useState([{}]);
  const [dataTableCMD, setDataTableCMD] = useState([]);

  return (
    <DataContext.Provider 
      value={{
        mainQuestion,
        setMainQuestion,
      tables, 
      setTables ,
      queryResult,
      setQueryResult,
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