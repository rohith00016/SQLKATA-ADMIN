import React from 'react';
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
import { useData } from '../contextApi/DataContext';
import { useCmdType } from '../contextApi/CmdTypeContext';
import { useReadMe } from '../contextApi/ReadmeContext';

const AppNavbar = ({ executeQuery, showDownloadButton }) => {
  const { defaultQueries, answers, tables } = useData();
  const { commandTypes } = useCmdType();
  const { readMe } = useReadMe();

  const generateJSONData = () => {
    const jsonData = {
      tables,
      tags: commandTypes,
      dataCMD: defaultQueries,
      answers,
      readme: readMe,
    };
    return JSON.stringify(jsonData, null, 2);
  };

  const downloadJSON = async () => {
    const jsonData = generateJSONData();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    try {
      const response = await axios.post(
        'http://localhost:3000/questions/addQuestions',
        jsonData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('POST request successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error making POST request:', error.message);
      throw error;
    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="mx-0 my-3 rounded">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">SQL Editor</span>
        <div className="d-flex">
        <button
           className="btn btn-success me-2"
           onClick={executeQuery}
           style={{ backgroundColor: 'green', borderColor: 'darkgreen' }}
        >
        Run Code
        </button>

          {showDownloadButton && (
            <button
              className="btn btn-warning"
              onClick={downloadJSON}
              style={{ backgroundColor: 'orange', borderColor: 'darkorange' }}
            >
              Download JSON
            </button>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
