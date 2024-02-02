import React from 'react';
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
import { useData } from '../contextApi/DataContext';
import { useCmdType } from '../contextApi/CmdTypeContext';
import { useReadMe } from '../contextApi/ReadmeContext';
import { useDescription } from '../contextApi/DescriptionContext';

const AppNavbar = ({ executeQuery, showDownloadButton }) => {
  const { defaultQueries, answers, tables, dataTableCMD } = useData();
  const { commandType } = useCmdType();
  const { readMe } = useReadMe();
  const { description } = useDescription();

  const [error, setError] = useState(null);

  const generateJSONData = () => {
    const jsonData = {
      tableNames: tables,
      tags: ['sql', commandType],
      status: ["unsolved"],
      dataCMD: defaultQueries,
      dataTableCMD,
      description,
      answers,
      readme: readMe,
    };
    return JSON.stringify(jsonData, null, 2);
  };

  const downloadJSON = async () => {
    try {
      setError(null);

      if (!tables || tables.length === 0) {
        setError('Please create atleast one table & insert values');
        return;
      }

      if (!commandType) {
        setError('Please select a command type before downloading.');
        return;
      }

      if (!answers || answers.length === 0) {
        setError('Please provide answers before downloading.');
        return;
      }
      
      if (!description || description.length === 0) {
        setError('Please provide description before downloading.');
        return;
      }

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
    } catch (error) {
      console.error('Error making POST request:', error.message);
      setError(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="mx-0 my-3 rounded">
      {/* ... (other components) */}
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

          {error && (
            <div className="alert alert-danger m-2" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default AppNavbar;