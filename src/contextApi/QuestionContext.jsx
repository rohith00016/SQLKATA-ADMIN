import React, { createContext, useContext, useState } from 'react';

const QuestionContext = createContext();

export const useQuestionContext = () => useContext(QuestionContext);

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [sqlQueries, setSqlQueries] = useState([]);
  const [errors, setErrors] = useState([]);
  const [queryResults, setQueryResults] = useState([]);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        sqlQueries,
        setSqlQueries,
        errors,
        setErrors,
        queryResults,
        setQueryResults,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
