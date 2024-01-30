// CombinedContextProvider.js
import React from 'react';
import { CmdTypeProvider } from './CmdTypeContext'; 
import { DataProvider } from './DataContext';

const CommonProvider = ({ children }) => {
  return (
    <CmdTypeProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </CmdTypeProvider>
  );
};

export default CommonProvider;
