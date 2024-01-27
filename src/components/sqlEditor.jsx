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
  const [executedQueries, setExecutedQueries] = useState([]);
  const [tables, setTables ] = useState([]);

  const { setTable, setDefaultQueries } = useData();

  const sqlHeight = '500px';

  const executeQuery = async () => {
    let engineResults = []; 
  
    try {
      const matches = sqlQuery.matchAll(/\bCREATE\s+TABLE\s+(\S+)/g);
      const tableNames = Array.from(matches, match => match[1]);
  
      for (const tableName of tableNames) {
        const engineResult = await SQLEngine(sqlQuery + `SELECT * FROM ${tableName};`);
        console.log(tableName, engineResult);
        setTables(prevTables => [...prevTables, tableName]);
        engineResults.push({ tableName, engineResult });
      }

  
      if (engineResults.length > 0) {
        setQueryResult(engineResults.map(entry => entry.engineResult));
        setTable(engineResults.result); 
        setDefaultQueries(sqlQuery);
        setExecutedQueries([...executedQueries, sqlQuery]);
        setError(null);
      } else {
        setError('No results found');
        setQueryResult([]);
      }
    } catch (error) {
      console.error(error);
      setError(error.message || 'An unexpected error occurred.');
      setQueryResult([]);
    }
  };
  
  
  

  return (
    <div className="container-fluid">
      <AppNavbar onExecute={executeQuery} executeQuery={executeQuery} />
      <div className="row">
        <div className="col-12 col-md-6">
          <AceEditor
            mode="sql"
            theme="monokai"
            value={sqlQuery}
            onChange={setSqlQuery}
            name="sql-editor"
            editorProps={{ $blockScrolling: true }}
            placeholder="Enter only the create and insert query..."
            fontSize={16}
            height={sqlHeight}
            width="100%"
          />
        </div>
        <div className="col-12 col-md-6">
          <QueryResultTable queryResult={queryResult} tables= {tables}  maxHeight={sqlHeight}/>
        </div>
      </div>
      {error && <div className="text-danger">{error}</div>}
      <AddItem />
    </div>
  );
};

export default SQLEditor;
