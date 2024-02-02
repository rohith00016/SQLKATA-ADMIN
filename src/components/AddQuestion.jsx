import React, { useEffect, useState } from 'react';
import SQLEngine from '../SQLEngine/SQLEngine';
import { useData } from '../contextApi/DataContext';
import QAEditor from './QAEditor';

const AddQuestion = () => {
  const [showInput, setShowInput] = useState(false);
  const [question, setQuestion] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [error, setError] = useState(null);
  const [queryResult, setQueryResult] = useState([]);

  const { defaultQueries, answers, setAnswers } = useData();

  useEffect(() => {
    setAnswers(answers.slice(1));
  }, []);

  const handleAddQuestion = () => {
    setShowInput(true);
  };

  const executeQuery = async () => {
    if (!question.trim() || !sqlQuery.trim()) {
      setError('Please enter both the question and SQL query.');
      return;
    }

    let engineResults = [];
    setQueryResult([]);
    try {
      const engineResult = await SQLEngine(defaultQueries + sqlQuery);
      engineResults.push({ engineResult });

      setAnswers([
        ...answers,
        {
          question: question,
          answer: sqlQuery,
          output: engineResults.map((entry) => entry.engineResult),
        },
      ]);

      setQueryResult(engineResults.map((entry) => entry.engineResult));
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message || 'An unexpected error occurred.');
      setQueryResult([]);
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
          <label htmlFor="question" className="form-label">
            Question:
          </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question"
            className="form-control"
          />
        </div>
      )}

      {showInput && (
        <QAEditor
          executeQuery={executeQuery}
          sqlQuery={sqlQuery}
          setSqlQuery={setSqlQuery}
          error={error}
          queryResult={queryResult}
        />
      )}
    </>
  );
};

export default AddQuestion;
