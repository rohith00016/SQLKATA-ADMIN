import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [Table, setTable] = useState(null);
  const [defaultQueries , setDefaultQueries] = useState(null);

  const setData = (Data) => {
    setTable(Data);
  };

  const setQueries = (query) =>{
    setDefaultQueries(query);
  }

  return (
    <DataContext.Provider value={{Table, setData ,defaultQueries, setQueries}}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };