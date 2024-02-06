import React from 'react';
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
import { useData } from '../contextApi/DataContext';
import { useCmdType } from '../contextApi/CmdTypeContext';
import { useReadMe } from '../contextApi/ReadmeContext';
import { useDescription } from '../contextApi/DescriptionContext';
import { toast } from 'react-toastify';

const AppNavbar = ({ executeQuery, showDownloadButton }) => {
  const { defaultQueries, answers, tables, dataTableCMD } = useData();
  const { commandType } = useCmdType();
  const { readMe } = useReadMe();
  const { description } = useDescription();

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

      if (!tables || tables.length === 0) {
        throw new Error('Please create at least one table & insert values.');
      }

      if (!commandType) {
        throw new Error('Please select a command type before downloading.');
      }

      if (!answers || answers.length === 0) {
        throw new Error('Please provide answers before downloading.');
      }

      if (!description || description.length === 0) {
        throw new Error('Please provide description before downloading.');
      }

      const jsonData = generateJSONData();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      a.click();

      const response = await axios.post(
        'https://sqleditor-server.onrender.com/questions/addQuestions',
        jsonData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('POST request successful:', response.data);

      toast.success('JSON data downloaded and sent to server successfully!');

    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error: ${error || 'An unexpected error occurred.'}`);
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
