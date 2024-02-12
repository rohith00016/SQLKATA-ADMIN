// CombinedContextProvider.js
import React from 'react';
import { CmdTypeProvider } from './CmdTypeContext'; 
import { DataProvider } from './DataContext';
import { ReadMeProvider } from './ReadmeContext';
import { DescriptionProvider } from './DescriptionContext';
import ToastProvider from './ToastContext';
import { HardLevelProvider } from './HardLevelContext';

const CommonProvider = ({ children }) => {
  return (
    <ToastProvider>
      <DataProvider>
        <ReadMeProvider>
          <CmdTypeProvider>
            <DescriptionProvider>
              <HardLevelProvider>
              {children}
              </HardLevelProvider>
            </DescriptionProvider>
          </CmdTypeProvider>
        </ReadMeProvider>
      </DataProvider>
    </ToastProvider>   
  );
};

export default CommonProvider;
