import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useData } from '../contextApi/DataContext';

const AppNavbar = ({ executeQuery, commandTypes }) => {
  const { defaultQueries, answers, Tables } = useData(); 

  const generateJSONData = () => {
    const jsonData = {
      Tables,
      dataCMD: defaultQueries,
      answers,
    };

    return JSON.stringify(jsonData, null, 2);
  };

  const downloadJSON = () => {
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
        <Button className='mx-2' variant="secondary" onClick={downloadJSON}>
          Download JSON
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
