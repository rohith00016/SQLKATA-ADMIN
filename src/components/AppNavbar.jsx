
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const AppNavbar = ({ executeQuery, loading }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">SQL Editor</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="mr-auto"></Nav>
        <Button variant="primary" onClick={executeQuery} disabled={loading}>
          {loading ? 'Executing...' : 'Execute Query'}
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
