import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-monokai';
import { toast} from 'react-toastify';
import SQLEngine from '../SQLEngine/SQLEngine';
import QueryResultTable from './QueryResultTable';
import AppNavbar from './AppNavbar';
import { useData } from '../contextApi/DataContext';
import AddQuestion from './AddQuestion';
import CmdTypes from './CmdTypes';
import WysiwygEditor from './WysiwygEditor';
import '../styles/SQLEditor.css';
import Description from './Description';
import HardnessScore from './HardnessScore';

const SQLEditor = () => {
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [executedQueries, setExecutedQueries] = useState([]);
  const [showDownloadButton] = useState(true);
  const [error, setError] = useState();
  const [mainQuestion, setMainQuestion] = useState();


  const { tables, setTables, setDefaultQueries, setTableData, setDataTableCMD } = useData();

  const sqlHeight = '500px';

  const handleMainQuestionChange = (event) => {
    setMainQuestion(event.target.value);
  };



  
  const removeComments = (sqlQuery) => {
    sqlQuery = sqlQuery.replace(/\/\*[\s\S]*?\*\//g, '');
    sqlQuery = sqlQuery.replace(/--.*$/gm, '');
    return sqlQuery.toLowerCase();
  };

  const executeQuery = async () => {
    let engineResults = [];
    setQueryResult([]);
    let tableNames = [];
    setTables([]);
    setDataTableCMD([]);
  
    const cleanedSqlQuery = removeComments(sqlQuery);
  
    if (!cleanedSqlQuery.trim()) {
      setError('Enter create & insert queries to run');
      toast.error('Enter create & insert queries to run', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return; // Stop execution here
    }
    
   
  
    try {
      const matches = cleanedSqlQuery.matchAll(/\bCREATE\s+TABLE\s+(\S+)/gi);
      tableNames = Array.from(matches, (match) => match[1]);
  
      for (const tableName of tableNames) {
        const engineResult = await SQLEngine(sqlQuery + `SELECT * FROM ${tableName};`);
        console.log(tableName, engineResult);
        setTables((prevTables) => [...prevTables, tableName]);
        setDataTableCMD((prevData) => [...prevData, `SELECT * FROM ${tableName}`]);
        engineResults.push({ tableName, engineResult });
      }
  
      if (engineResults.length > 0) {
        setQueryResult(engineResults.map((entry) => entry.engineResult));
        setTableData(engineResults.map((entry) => entry.engineResult));
        setDefaultQueries(sqlQuery);
        setExecutedQueries([...executedQueries, sqlQuery]);
  
        toast.success('Query executed successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setError(error);
      console.error(error);
    }
  };
  

  return (
  <div className="container-fluid">
    <AppNavbar onExecute={executeQuery} mainQuestion={mainQuestion} showDownloadButton={showDownloadButton} executeQuery={executeQuery} />
    <div className="my-3">
    <label htmlFor={`mainQuestion`}>Question:</label>
      <input
        type="text"
        id={'mainQuestion'}
        className="form-control"
        value={mainQuestion}
        onChange={handleMainQuestionChange}
      />
    </div>
    <div className='row'>
      <div className='col'>
        <HardnessScore />
      </div>
      <div className='col'>
        <CmdTypes />
      </div>
    </div>
      <WysiwygEditor />
      <Description />
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <AceEditor
            mode="sql"
            theme="monokai"
            value={sqlQuery}
            onChange={setSqlQuery}
            name="sql-editor"
            editorProps={{ $blockScrolling: true }}
            placeholder="Enter your select query here"
            fontSize={18}
            height={sqlHeight}
            width="100%"
            className="myEditor"
          />
        </div>
        <div className="col-md-6 mb-4">
          <QueryResultTable key={queryResult} error={error} queryResult={queryResult} maxHeight={sqlHeight} />
        </div>
      </div>
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
