// CombinedContextProvider.js
import React from 'react';
import { CmdTypeProvider } from './CmdTypeContext'; 
import { DataProvider } from './DataContext';
import { ReadMeProvider } from './ReadmeContext';

const CommonProvider = ({ children }) => {
  return (
      <DataProvider>
        <ReadMeProvider>
          <CmdTypeProvider>
              {children}
          </CmdTypeProvider>
        </ReadMeProvider>
      </DataProvider>    
  );
};

export default CommonProvider;
