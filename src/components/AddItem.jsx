// AddItem.js
import React, { useState } from 'react';
import { useData } from '../contextApi/DataContext';
import SQLEditor from './sqlEditor';

const AddItem = () => {
  const [showInput, setShowInput] = useState(false);
  const [question, setQuestion] = useState('');

  const { Table } = useData(); // Use the context

  const handleAddItem = () => {
    // Handle adding item logic

    // Show the input field after adding item
    setShowInput(true);
  };

  return (
    <div>
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

          {/* Render SQLEditor component when typing in the input fields */}
          {question && <SQLEditor queryResult={Table} />}
        </div>
      )}
    </div>
  );
};

export default AddItem;
