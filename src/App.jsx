import React from 'react';
import SQLEditor from './components/sqlEditor';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/toasts.css'
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <div>
      <SQLEditor />
      <ToastContainer />
    </div>
  );
};

export default App;
