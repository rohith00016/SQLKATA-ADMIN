import { createContext, useContext, useState } from "react";

const CmdTypeContext = createContext();


const CmdTypeProvider = ({ children }) => {

   const [commandTypes, setCommandTypes] = useState([]);

   const handleCheckboxChange = (value) => {
      if (commandTypes.includes(value)) {
        setCommandTypes(commandTypes.filter(type => type !== value));
      } else {
        setCommandTypes([...commandTypes, value]);
      }
    };
 
   return (
     <CmdTypeContext.Provider value={{commandTypes, handleCheckboxChange}}>
       {children}
     </CmdTypeContext.Provider>
   );
 };
 
 const useCmdType = () => useContext(CmdTypeContext);
 
 export { CmdTypeProvider, useCmdType };