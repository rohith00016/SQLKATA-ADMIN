import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-monokai';
import SQLEngine from './SQLEngine';
import QueryResultTable from './QueryResultTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './AppNavbar';
import AddItem from './AddItem';
import { useData } from '../contextApi/DataContext';

const SQLEditor = () => {
  const [sqlQuery, setSqlQuery] = useState('');
  const [error, setError] = useState(null);
  const [queryResult, setQueryResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setData } = useData(); // Use the context

  const executeQuery = async () => {
    try {
      setLoading(true);
      const engineResult = await SQLEngine(sqlQuery);
      if (engineResult.result) {
        setQueryResult(engineResult.result);
        setData(engineResult.result)
        setError(null);
      } else {
        setError(engineResult.error || 'Unknown error');
        setQueryResult([]);
      }
    } catch (error) {
      console.error(error);
      setError(error.message || 'An unexpected error occurred.');
      setQueryResult([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <AppNavbar onExecute={executeQuery} loading={loading} executeQuery={executeQuery} />
      <div className="row">
        <div className="col-12 col-md-6">
          <AceEditor
            mode="sql"
            theme="monokai"
            value={sqlQuery}
            onChange={setSqlQuery}
            name="sql-editor"
            editorProps={{ $blockScrolling: true }}
            placeholder="Enter your SQL query here"
            fontSize={16}
            height="500px"
            width="100%"
          />
        </div>
        <div className="col-12 col-md-6">
          <QueryResultTable queryResult={queryResult} />
        </div>
      </div>
      {error && <div className="text-danger">{error}</div>}
      <AddItem />
    </div>
  );
};

export default SQLEditor;
