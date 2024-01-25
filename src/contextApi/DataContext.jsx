// DataContext.jsx
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [Table, setTable] = useState(null); // Initial value is null

  const setData = (tableData) => {
    setTable(tableData);
  };

  return (
    <DataContext.Provider value={{Table, setData }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
