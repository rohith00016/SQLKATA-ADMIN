import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [tables, setTables] = useState(null);
  const [defaultQueries , setDefaultQueries] = useState(null);
  const [answers, setAnswers] = useState([{}]);

  return (
    <DataContext.Provider 
      value={{
      tables, 
      setTables ,
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