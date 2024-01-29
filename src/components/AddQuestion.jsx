import React, { useState } from 'react';
import SQLEngine from './SQLEngine';
import { useData } from '../contextApi/DataContext';
import QAEditor from './QAEditor';

const AddQuestion = () => {
  const [showInput, setShowInput] = useState(false);
  const [question, setQuestion] = useState('');
  const [commandTypes,setCommandTypes] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [error, setError] = useState(null);
  const [queryResult, setQueryResult] = useState([]);

  const handleCheckboxChange = (value) => {
    if (commandTypes.includes(value)) {
      setCommandTypes(commandTypes.filter(type => type !== value));
    } else {
      setCommandTypes([...commandTypes, value]);
    }
  };

  const { defaultQueries, answers, setAnswers } = useData();

  const handleAddQuestion = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const executeQuery = async () => {
    let engineResults = [];
    try {
      const engineResult = await SQLEngine(defaultQueries + sqlQuery);
      engineResults.push({ engineResult });

      if (question && answers && answers.length > 0) {
        setAnswers([
          ...answers.slice(1),
          {
            question: question,
            tags: commandTypes,
            answer: sqlQuery,
            output: engineResults.map((entry) => entry.engineResult),
          },
        ]);
      }
      

      if (engineResults && engineResults.length > 0) {
        setQueryResult(engineResults.map((entry) => entry.engineResult));
        setError(null);
      } else {
        setError(engineResult.error || 'Unknown error');
        setQueryResult([]);
      }
    } catch (error) {
      console.error(error);
      setError(error.message || 'An unexpected error occurred.');
      setQueryResult([]);
    }
  };

  return (
<>

  <button
    className="btn btn-primary my-2"
    onClick={handleAddQuestion}
  >
    Add Question
  </button>

  {showInput && (
    <div className="mb-2">
      <label htmlFor="question" className="form-label">Question:</label>
      <input
        type="text"
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter question"
        className="form-control"
      />
      <div className="mb-2">
  <label htmlFor="commandType" className="form-label mt-2">Command Types:</label>
  <div className="form-check">
    <input
      type="checkbox"
      id="dcl"
      value="dcl"
      checked={commandTypes.includes("dcl")}
      onChange={() => handleCheckboxChange("dcl")}
      className="form-check-input"
    />
    <label htmlFor="dcl" className="form-check-label">DCL (Data Control Language)</label>
  </div>
  <div className="form-check">
    <input
      type="checkbox"
      id="dql"
      value="dql"
      checked={commandTypes.includes("dql")}
      onChange={() => handleCheckboxChange("dql")}
      className="form-check-input"
    />
    <label htmlFor="dql" className="form-check-label">DQL (Data Query Language)</label>
  </div>
  <div className="form-check">
    <input
      type="checkbox"
      id="dml"
      value="dml"
      checked={commandTypes.includes("dml")}
      onChange={() => handleCheckboxChange("dml")}
      className="form-check-input"
    />
    <label htmlFor="dml" className="form-check-label">DML (Data Manipulation Language)</label>
  </div>
</div>

    </div>
  )}
  {question && (
    <QAEditor
      executeQuery={executeQuery}
      sqlQuery={sqlQuery}
      setSqlQuery={setSqlQuery}
      error={error}
      queryResult={queryResult}
      commandTypes={commandTypes}
    />
  )}
</>

  );
};

export default AddQuestion;
