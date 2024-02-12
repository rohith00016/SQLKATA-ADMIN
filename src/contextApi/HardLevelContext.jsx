import { createContext, useContext, useState } from "react";

const HardLevelContext = createContext();


const HardLevelProvider = ({ children }) => {

   const [HardLevel, setHardLevel] = useState('easy');

   return (
     <HardLevelContext.Provider value={{HardLevel, setHardLevel}}>
       {children}
     </HardLevelContext.Provider>
   );
 };
 
 const useHardLevel = () => useContext(HardLevelContext);
 
 export { HardLevelProvider, useHardLevel };