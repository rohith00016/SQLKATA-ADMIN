import React, { useState, useEffect } from 'react';
import SQLEngine from '../SQLEngine/SQLEngine';
import { useData } from '../contextApi/DataContext';
import QAEditor from './editors/QAEditor';
import { toast } from 'react-toastify';
import { useQuestionContext } from '../contextApi/QuestionContext'; // Import the context

const AddQuestion = () => {

  const { setAnswers, tables, defaultQueries } = useData();
  const {
    questions,
    setQuestions,
    sqlQueries,
    setSqlQueries,
    errors,
    setErrors,
    queryResults,
    setQueryResults,
  } = useQuestionContext(); // Use the context
  const [showInput, setShowInput] = useState(questions.length !== 0);
  useEffect(() => {
    setAnswers((prevAnswers) => prevAnswers.slice(1));
  }, [setAnswers]);

  const handleAddQuestion = () => {
    setShowInput(true);
    setQuestions(prevQuestions => [...prevQuestions, '']);
    setSqlQueries(prevQueries => [...prevQueries, '']);
    setErrors(prevErrors => [...prevErrors, null]);
    setQueryResults(prevResults => [...prevResults, []]);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSqlQueryChange = (index, newSqlQuery) => {
    const newSqlQueries = [...sqlQueries];
    newSqlQueries[index] = newSqlQuery;
    setSqlQueries(newSqlQueries);
  };

  const executeQuery = async (index) => {
    const question = questions[index];
    const sqlQuery = sqlQueries[index];
    const error = errors[index];

    if (!question.trim() || !sqlQuery.trim()) {
      const newErrors = [...errors];
      newErrors[index] = 'Please enter both the question and SQL query.';
      setErrors(newErrors);
      toast.error('Please enter both the question and SQL query.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const containsTable = tables.some(table => sqlQuery.includes(table));

    if (!containsTable) {
      const newErrors = [...errors];
      newErrors[index] = 'Table not found';
      setErrors(newErrors);
      toast.error('Table not found', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const engineResult = await SQLEngine(defaultQueries + sqlQuery);
      
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          question: question,
          answer: sqlQuery,
          output: [engineResult],
        },
      ]);

      const newQueryResults = [...queryResults];
      newQueryResults[index] = [engineResult];
      setQueryResults(newQueryResults);

      const newErrors = [...errors];
      newErrors[index] = null;
      setErrors(newErrors);

      toast.success('Question added successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error(error);
      const newErrors = [...errors];
      newErrors[index] = error.message;
      setErrors(newErrors);
      setQueryResults(prevResults => {
        const newResults = [...prevResults];
        newResults[index] = [];
        return newResults;
      });
      toast.error(`Error: ${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      {showInput && questions.map((question, index) => (
        <div key={index} className="my-3">
          <label htmlFor={`question-${index}`}>Question:</label>
          <input
            type="text"
            id={`question-${index}`}
            className="form-control"
            value={question}
            onChange={(event) => handleQuestionChange(index, event)} 
          />

          <label htmlFor={`sqlQuery-${index}`} className="mt-2">SQL Query:</label>
          <QAEditor
            executeQuery={() => executeQuery(index)}
            sqlQuery={sqlQueries[index]}
            setSqlQuery={(newSqlQuery) => handleSqlQueryChange(index, newSqlQuery)}
            error={errors[index]}
            setError={(newError) => {
              const newErrors = [...errors];
              newErrors[index] = newError;
              setErrors(newErrors);
            }}
            queryResult={queryResults[index]}
          />
        </div>
      ))}
      
      <button
        className="btn btn-secondary my-2"
        onClick={handleAddQuestion}
      >
        Add Question
      </button>
    </div>
  );
};

export default AddQuestion;
