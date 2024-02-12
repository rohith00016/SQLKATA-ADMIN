import React, { useState } from 'react';
import { useHardLevel } from '../contextApi/HardLevelContext';

const HardnessScore = () => {
  const [hardnessScore, setHardnessScore] = useState();
  const { setHardLevel } = useHardLevel()

  const handleHardnessScoreChange = (event) => {
    setHardnessScore(event.target.value);
    setHardLevel(event.target.value);
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
              checked={hardnessScore === score}
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
