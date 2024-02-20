import React from 'react';
import { useData } from '../contextApi/DataContext';
import TableCreate from './tabels/TableCreate';

const AnswersPreview = () => {
  const { answers } = useData();

  return (
    <div>
      <h6 className="mx-2 my-4">Questions Preview:</h6>
      {answers.length > 0 ? answers.map((answer, index) => (
        <div key={index}>
          <h6 className="mx-2 my-4">{answer.question && `Question ${index + 1} : ${answer.question}`}</h6>
          {answer.answer && (
            <div>
              <h6 className="mx-2 my-4">Answer:</h6>
              <p className="mx-2 my-4">{answer.answer}</p>
            </div>
          )}
          {answer.output && (
            <div>
              <h6 className="mx-2 my-4">Output:</h6>
              <div>
                <TableCreate
                  key={index}
                  columns={answer.output[0].result[0].columns}
                  values={answer.output[0].result[0].values}
                />
              </div>
            </div>
          )}
        </div>
      )) : <p className="mx-2 my-4">No questions added</p>}
    </div>
  );
};

export default AnswersPreview;
