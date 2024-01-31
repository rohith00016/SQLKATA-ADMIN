import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-monokai';
import SQLEngine from '../SQLEngine/SQLEngine';
import QueryResultTable from './QueryResultTable';
import AppNavbar from './AppNavbar';
import { useData } from '../contextApi/DataContext';
import AddQuestion from './AddQuestion';
import CmdTypes from './CmdTypes';
import WysiwygEditor from './WysiwygEditor';

const SQLEditor = () => {
  const [sqlQuery, setSqlQuery] = useState('');
  const [error, setError] = useState(null);
  const [queryResult, setQueryResult] = useState([]);
  const [executedQueries, setExecutedQueries] = useState([]);
  const [showDownloadButton] = useState(true);

  const { tables, setTables, setDefaultQueries } = useData();

  const sqlHeight = '500px';
  const removeComments = (sqlQuery) => {
    sqlQuery = sqlQuery.replace(/\/\*[\s\S]*?\*\//g, '');
    sqlQuery = sqlQuery.replace(/--.*$/gm, '');
    return sqlQuery;
  }

  const executeQuery = async () => {
    let engineResults = [];
    setQueryResult([]);
    let tableNames = [];
    setTables([]);

    try {
      const cleanedSqlQuery = removeComments(sqlQuery);
      const matches = cleanedSqlQuery.matchAll(/\bCREATE\s+TABLE\s+(\S+)/gi);
      tableNames = Array.from(matches, match => match[1]);

      for (const tableName of tableNames) {
        const engineResult = await SQLEngine(sqlQuery + `SELECT * FROM ${tableName};`);
        console.log(tableName, engineResult);
        setTables(prevTables => [...prevTables, tableName]);
        engineResults.push({ tableName, engineResult });
      }

      if (engineResults.length > 0) {
        setQueryResult(engineResults.map(entry => entry.engineResult));
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
      <AppNavbar onExecute={executeQuery} showDownloadButton={showDownloadButton} executeQuery={executeQuery} />
      <WysiwygEditor />
      <CmdTypes />
      <div className="row">
        <div className="col-md-6 mb-4">
          <AceEditor
            mode="sql"
            theme="monokai"
            value={sqlQuery}
            onChange={setSqlQuery}
            name="sql-editor"
            editorProps={{ $blockScrolling: true }}
            placeholder="Enter only the create and insert query..."
            fontSize={18}
            height={sqlHeight}
            width="100%"
          />
        </div>
        <div className="col-md-6 mb-4">
          <QueryResultTable key={queryResult} queryResult={queryResult} maxHeight={sqlHeight} />
        </div>
      </div>
      {error && <div className="text-danger">{error}</div>}
      {tables && tables.length > 0 && !error && (
        <div className="container w-100 my-4 p-3 bg-light border rounded">
          <div className="text-center text-success">
            {tables.join(', ')}
          </div>
        </div>
      )}          
      <AddQuestion />
      </div>
  );
};

export default SQLEditor;
