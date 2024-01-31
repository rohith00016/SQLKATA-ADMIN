import { createContext, useContext, useState } from "react";

const ReadMeContext = createContext();


const ReadMeProvider = ({ children }) => {

   const [readMe, setReadMe] = useState('');

   return (
     <ReadMeContext.Provider value={{readMe, setReadMe}}>
       {children}
     </ReadMeContext.Provider>
   );
 };
 
 const useReadMe = () => useContext(ReadMeContext);
 
 export { ReadMeProvider, useReadMe };