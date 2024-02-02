import { createContext, useContext, useState } from "react";

const DescriptionContext = createContext();


const DescriptionProvider = ({ children }) => {

   const [description, setDescription] = useState('');

   const handleDescriptionChange = (newDescription) => {
     setDescription(newDescription);
   };
 
   return (
     <DescriptionContext.Provider value={{description, handleDescriptionChange}}>
       {children}
     </DescriptionContext.Provider>
   );
 };
 
 const useDescription = () => useContext(DescriptionContext);
 
 export { DescriptionProvider, useDescription };