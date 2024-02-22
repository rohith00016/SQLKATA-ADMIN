import React from 'react';
import { CmdTypeProvider } from './CmdTypeContext'; 
import { DataProvider } from './DataContext';
import { DescriptionProvider } from './DescriptionContext';
import ToastProvider from './ToastContext';
import { HardLevelProvider } from './HardLevelContext';
import { MarkDownProvider } from './MarkDownContext';

const CommonProvider = ({ children }) => {
  return (
    <ToastProvider>
      <DataProvider>
          <CmdTypeProvider>
            <DescriptionProvider>
              <MarkDownProvider>
              <HardLevelProvider>
                  {children}
              </HardLevelProvider>
              </MarkDownProvider>
            </DescriptionProvider>
          </CmdTypeProvider>
      </DataProvider>
    </ToastProvider>   
  );
};

export default CommonProvider;
