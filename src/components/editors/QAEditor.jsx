import React from 'react';
import AceEditor from 'react-ace';
import AppNavbar from '../navbar/AppNavbar';
import QueryResultTable from '../tabels/QueryResultTable';
import AddQuestion from '../AddQuestion';
import '../../styles/QAEditor.css';

const QAEditor = ({
  sqlQuery,
  executeQuery,
  setSqlQuery,
  queryResult,
  commandTypes,
}) => {
  const qaHeight = '120px';


  const handleRunQuery = async () => {
    await executeQuery();
  }
  

  return (
    <>
      <div className="container-fluid">
        <AppNavbar executeQuery={handleRunQuery} commandTypes={commandTypes} />
        <div className="row">
          <div className="col-12 col-md-6">
            <AceEditor
              mode="sql"
              theme="monokai"
              value={sqlQuery}
              onChange={setSqlQuery}
              name="sql-editor"
              editorProps={{ $blockScrolling: true }}
              placeholder="Enter your select query here"
              fontSize={18}
              height={qaHeight}
              width="100%"
              className="myEditor"
            />
          </div>
          <div className="col-12 col-md-6">
            <QueryResultTable queryResult={queryResult} maxHeight={qaHeight} />
          </div>
        </div>
      </div>
      <AddQuestion />
    </>
  );
};

export default QAEditor;
