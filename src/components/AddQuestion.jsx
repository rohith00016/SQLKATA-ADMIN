import React, { useState, useEffect } from 'react';
import SQLEngine from '../SQLEngine/SQLEngine';
import { useData } from '../contextApi/DataContext';
import QAEditor from './editors/QAEditor';
import { toast } from 'react-toastify';


const AddQuestion = () => {
  const [showInput, setShowInput] = useState(false);
  const [question, setQuestion] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [error, setError] = useState(null);
  const [queryResult, setQueryResult] = useState([]);

  const { defaultQueries, setAnswers, tables } = useData();

  useEffect(() => {
    setAnswers((prevAnswers) => prevAnswers.slice(1));
  }, [setAnswers]);

  const handleAddQuestion = () => {
    setShowInput(true);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSqlQueryChange = (newSqlQuery) => {
    setSqlQuery(newSqlQuery);
  };

  const executeQuery = async () => {
    setError(null);
    if (!question.trim() || !sqlQuery.trim()) {
      setError('Please enter both the question and SQL query.');
  
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
      setError('Table not found');
  
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

      setQueryResult([engineResult]);
      setError(null);

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
      setError(error.message);
      setQueryResult([]);

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
    <>
      {!showInput && (
        <button
          className="btn btn-secondary my-2"
          onClick={handleAddQuestion}
        >
          Add Question
        </button>
      )}

      {showInput && (
        <div className="my-3">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            className="form-control"
            value={question}
            onChange={handleQuestionChange} 
          />

          <label htmlFor="sqlQuery" className="mt-2">SQL Query:</label>
          <QAEditor
            executeQuery={executeQuery}
            sqlQuery={sqlQuery}
            setSqlQuery={handleSqlQueryChange}
            error={error}
            setError={setError}
            queryResult={queryResult}
          />
        </div>
      )}
    </>
  );
};

export default AddQuestion;
