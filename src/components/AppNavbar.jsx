import React from 'react';
import axios from 'axios';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useData } from '../contextApi/DataContext';
import { useCmdType } from '../contextApi/CmdTypeContext';

const AppNavbar = ({ executeQuery, tables, showDownloadButton }) => {
  const { defaultQueries, answers } = useData();
  const {commandTypes} = useCmdType();
  
  const generateJSONData = () => {
    const jsonData = {
      tables,
      tags:commandTypes,
      dataCMD: defaultQueries,
      answers,
    };
    console.log(tables);
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
      const response = await axios.post('http://localhost:3000/questions/addQuestions', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('POST request successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error making POST request:', error.message);
      throw error;
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">SQL Editor</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="mr-auto">
        </Nav>
        <Button variant="success" onClick={executeQuery}>
          Run Code
        </Button>

        {showDownloadButton && 
        <Button className='mx-2' variant="warning" onClick={downloadJSON}>
          Download JSON
        </Button>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
