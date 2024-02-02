import React from 'react';
import { useDescription } from '../contextApi/DescriptionContext';

const Description = () => {
 
  const { description, handleDescriptionChange} = useDescription();

  return (
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description:</label>
      <textarea
        className="form-control"
        id="description"
        name="description"
        rows="4"
        value={description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Description;
