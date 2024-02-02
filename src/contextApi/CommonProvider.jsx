// CombinedContextProvider.js
import React from 'react';
import { CmdTypeProvider } from './CmdTypeContext'; 
import { DataProvider } from './DataContext';
import { ReadMeProvider } from './ReadmeContext';
import { DescriptionProvider } from './DescriptionContext';

const CommonProvider = ({ children }) => {
  return (
      <DataProvider>
        <ReadMeProvider>
          <CmdTypeProvider>
            <DescriptionProvider>
              {children}
            </DescriptionProvider>
          </CmdTypeProvider>
        </ReadMeProvider>
      </DataProvider>    
  );
};

export default CommonProvider;
