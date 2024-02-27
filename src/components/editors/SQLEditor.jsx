import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-monokai';
import { toast } from 'react-toastify';
import SQLEngine from '../../SQLEngine/SQLEngine';
import QueryResultTable from '../tabels/QueryResultTable';
import AppNavbar from '../navbar/AppNavbar';
import { useData } from '../../contextApi/DataContext';
import AddQuestion from '../AddQuestion';
import CmdTypes from '../inputs/CmdTypes';
import MarkdownEditor from '../markdown/MardownEditor';
import '../../styles/SQLEditor.css';
import Description from '../inputs/Description';
import HardnessScore from '../inputs/HardnessScore';


const SQLEditor = () => {

  const [executedQueries, setExecutedQueries] = useState([]);
  const [showDownloadButton, setShowDownloadButton] = useState(true);
  const [error, setError] = useState('');
  const { mainQuestion, setMainQuestion } = useData();
  const { mainSqlQuery, setMainSqlQuery, tables, setTables, setDefaultQueries, queryResult, setQueryResult, setDataTableCMD } = useData();
  const sqlHeight = '500px';

 /* useEffect(() => {
    const storedSqlQuery = localStorage.getItem('sqlQuery');
    if (storedSqlQuery) {
      setSqlQuery(storedSqlQuery);
    }
  },[]);
*/
 /* 
    
    useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('sqlQuery');
      setSqlQuery('');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  */

  const handleMainQuestionChange = (event) => {
    setMainQuestion(event.target.value);
  };

  const removeComments = (mainSqlQuery) => {
    mainSqlQuery = mainSqlQuery.replace(/\/\*[\s\S]*?\*\//g, '');
    mainSqlQuery = mainSqlQuery.replace(/--.*$/gm, '');
    return mainSqlQuery.toLowerCase();
  };

  const executeQuery = async () => {
    let engineResults = [];
    setQueryResult([]);
    let tableNames = [];
    setTables([]);
    setDataTableCMD([]);

    const cleanedSqlQuery = removeComments(mainSqlQuery);

    const containsCreate = /CREATE\s+TABLE/i.test(cleanedSqlQuery);
    const containsInsert = /INSERT\s+INTO/i.test(cleanedSqlQuery);

    if (!containsCreate || !containsInsert) {
      setError('Create & insert .');
      toast.error('Create & insert .', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const matches = cleanedSqlQuery.matchAll(/\bCREATE\s+TABLE\s+(\S+)/gi);
      tableNames = Array.from(matches, (match) => match[1]);

      for (const tableName of tableNames) {
        const engineResult = await SQLEngine(mainSqlQuery + `SELECT * FROM ${tableName};`);
        setTables((prevTables) => [...prevTables, tableName]);
        setDataTableCMD((prevData) => [...prevData, `SELECT * FROM ${tableName}`]);
        engineResults.push({ tableName, engineResult });
      }

      if (engineResults.length > 0) {
        setQueryResult(engineResults.map((entry) => entry.engineResult));
        setDefaultQueries(mainSqlQuery);
        setExecutedQueries([...executedQueries, mainSqlQuery]);

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
      <AppNavbar showDownloadButton={showDownloadButton} setShowDownloadButton={setShowDownloadButton} executeQuery={executeQuery} />
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
      <div className="row">
        <div className="col">
          <HardnessScore />
        </div>
        <div className="col">
          <CmdTypes />
        </div>
      </div>
      <MarkdownEditor />
      <Description />
      <div className="row mt-2">
        <div className="col-md-6 mb-4">
          <AceEditor
            mode="sql"
            theme="monokai"
            value={mainSqlQuery}
            onChange={setMainSqlQuery}
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
          <QueryResultTable error={error} queryResult={queryResult} maxHeight={sqlHeight} />
        </div>
      </div>
      {tables && tables.length > 0 && !error && (
        <div className="container w-100 my-4 p-3 bg-light border rounded">
          <div className="text-center text-success">{tables.join(', ')}</div>
        </div>
      )}
      <AddQuestion />
    </div>
  );
};

export default SQLEditor;
