import React from 'react';
import SQLEditor from './components/sqlEditor';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
// Add this at the top of your entry file
if (typeof window === 'undefined') {
  global.window = global;
}


  return (
    <div>
      <SQLEditor />
    </div>
  );
};

export default App;
