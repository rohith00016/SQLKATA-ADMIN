import { createContext, useContext, useState } from "react";

const MarkDownContext = createContext();


const MarkDownProvider = ({ children }) => {

   const [MarkDown, setMarkDown] = useState('');

   const handleMarkDownChange = (newMarkDown) => {
     setMarkDown(newMarkDown);
   };
 
   return (
     <MarkDownContext.Provider value={{MarkDown, handleMarkDownChange}}>
       {children}
     </MarkDownContext.Provider>
   );
 };
 
 const useMarkDown = () => useContext(MarkDownContext);
 
 export { MarkDownProvider, useMarkDown };