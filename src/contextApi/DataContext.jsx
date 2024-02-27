import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [mainSqlQuery, setMainSqlQuery] = useState('');
  const [mainQuestion, setMainQuestion] = useState('');
  const [tables, setTables] = useState(null);
  const [queryResult, setQueryResult] = useState([]);
  const [defaultQueries , setDefaultQueries] = useState(null);
  const [answers, setAnswers] = useState([{}]);
  const [dataTableCMD, setDataTableCMD] = useState([]);
  const [backButton, setBackButton] = useState(false);

  return (
    <DataContext.Provider 
      value={{
        backButton, 
        setBackButton,
        mainSqlQuery,
        setMainSqlQuery,
        mainQuestion,
        setMainQuestion,
        tables, 
        setTables ,
        queryResult,
        setQueryResult,
        dataTableCMD,
        setDataTableCMD,
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