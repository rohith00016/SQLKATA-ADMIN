import React from 'react';
import axios from 'axios';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useData } from '../contextApi/DataContext';

const AppNavbar = ({ executeQuery, tables, showDownload }) => {
  const { defaultQueries, answers } = useData(); 
  
  const generateJSONData = () => {
    const jsonData = {
      tables,
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
        <Button variant="primary" onClick={executeQuery}>
          Run 
        </Button>
        {showDownload && 
        <Button className='mx-2' variant="secondary" onClick={downloadJSON}>
          Download JSON
        </Button>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
