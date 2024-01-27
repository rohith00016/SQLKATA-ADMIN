import React, { useState } from 'react';
import SQLEngine from './SQLEngine';
import { useData } from '../contextApi/DataContext';
import QAEditor from './QAEditor';

const AddItem = () => {
  const [showInput, setShowInput] = useState(false);
  const [question, setQuestion] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [error, setError] = useState(null);
  const [queryResult, setQueryResult] = useState([]);

  const {defaultQueries, answers, setAnswers} = useData();

  const handleAddItem = () => {
    setShowInput(true);
  };
  
  const executeQuery = async () => {
    let engineResults = [];
    try {
      const engineResult = await SQLEngine(defaultQueries + sqlQuery);
      engineResults.push({ engineResult });
  
      if (question && answers && answers.length > 0) {
        setAnswers([
          ...answers,
          { question: question, answer: sqlQuery, output: engineResults.map(entry => entry.engineResult) }
        ]);
      }
  
      if (engineResults && engineResults.length > 0) {
        setQueryResult(engineResults.map(entry => entry.engineResult));
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
    <div className='my-2'>
      <button
        className="btn btn-primary mb-2"
        onClick={handleAddItem}
        style={{ display: showInput ? 'none' : 'block' }}
      >
        Add Item
      </button>

      {showInput && (
        <div className="mb-2">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question"
            className="mr-2"
          />
          {question && <QAEditor 
          executeQuery={executeQuery}
          sqlQuery={sqlQuery} 
          setSqlQuery={setSqlQuery} 
          error={error}
          queryResult={queryResult} />}
        </div>
      )}
    </div>
  );
};

export default AddItem;