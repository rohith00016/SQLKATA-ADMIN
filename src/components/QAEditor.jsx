import React from 'react'
import AceEditor from 'react-ace';
import AppNavbar from './AppNavbar';
import QueryResultTable from './QueryResultTable';
import AddItem from './AddItem';

const QAEditor = ({
   sqlQuery,
   executeQuery,
   setSqlQuery,
   error,
   queryResult
}) => {


  return (
   <div className="container-fluid">
   <AppNavbar executeQuery={executeQuery} />
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
   <AddItem />
   </div>
   {error && <div className="text-danger">{error}</div>}
 </div>
  )
}

export default QAEditor
