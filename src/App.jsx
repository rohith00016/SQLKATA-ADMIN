import React from 'react';
import SQLEditor from './components/editors/SQLEditor';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/toasts.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PreviewComponent } from './components/preview/PreviewComponent';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<SQLEditor />}/>
        <Route path="/preview" element={<PreviewComponent />}/>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
