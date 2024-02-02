import { createContext, useContext, useState } from "react";

const CmdTypeContext = createContext();

const CmdTypeProvider = ({ children }) => {
  const [commandType, setCommandType] = useState('');

  const handleCheckboxChange = (type) => {
    setCommandType(type);
  };

  return (
    <CmdTypeContext.Provider value={{ commandType, handleCheckboxChange }}>
      {children}
    </CmdTypeContext.Provider>
  );
};

const useCmdType = () => useContext(CmdTypeContext);

export { CmdTypeProvider, useCmdType };
