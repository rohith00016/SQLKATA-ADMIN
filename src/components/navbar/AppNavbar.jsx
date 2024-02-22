import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

const AppNavbar = ({ executeQuery, showDownloadButton, setShowDownloadButton }) => {

  const navigate = useNavigate();

  const handlePreview = () =>{
    setShowDownloadButton(!showDownloadButton);
    navigate('/preview')
  }

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
            onClick={handlePreview}
            style={{ backgroundColor: 'orange', borderColor: 'darkorange' }}
          >
            Preview
          </button>
          )} 
        </div>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
