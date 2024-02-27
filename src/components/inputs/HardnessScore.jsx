import React, { useState, useEffect } from 'react';
import { useHardLevel } from '../../contextApi/HardLevelContext';

const HardnessScore = () => {
  const { HardLevel, setHardLevel } = useHardLevel();

  const handleHardnessScoreChange = (event) => {
    const selectedScore = event.target.value;
    setHardLevel(selectedScore);
  };

  return (
    <div className="my-3 d-flex justify-content-center">
      <div className="d-flex align-items-center w-100">
        <label className="me-2">Hardness Score:</label>
        {["easy", "medium", "hard"].map((score) => (
          <div key={score} className="form-check me-3">
            <input
              type="radio"
              id={score}
              name="hardnessScore"
              value={score}
              checked={HardLevel === score}
              onChange={handleHardnessScoreChange}
              className="form-check-input"
            />
            <label htmlFor={score} className="form-check-label">
              {score}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HardnessScore;
