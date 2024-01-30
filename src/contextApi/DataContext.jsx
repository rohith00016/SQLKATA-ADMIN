import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [Table, setTable] = useState(null);
  const [defaultQueries , setDefaultQueries] = useState(null);
  const [answers, setAnswers] =useState([{}]);
  const [showInput, setShowInput] = useState(false);

  return (
    <DataContext.Provider value={{Table, 
    setTable ,
    defaultQueries, 
    setDefaultQueries, 
    answers, 
    setAnswers,
    showInput,
    setShowInput

    }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };