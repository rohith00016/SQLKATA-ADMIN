import React from 'react'
import AceEditor from 'react-ace';
import AppNavbar from './AppNavbar';
import QueryResultTable from './QueryResultTable';
import AddQuestion from './AddQuestion';

const QAEditor = ({
   sqlQuery,
   executeQuery,
   setSqlQuery,
   error,
   queryResult,
   commandTypes
}) => {
  
  const qaHeight = '100px';
  

  return (
    <>
   <div className="container-fluid">
   <AppNavbar executeQuery={executeQuery} commandTypes={commandTypes}/>
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
         height={qaHeight}
         width="100%"
       />
     </div>
     <div className="col-12 col-md-6">
       <QueryResultTable queryResult={queryResult} maxHeight={qaHeight} />
     </div>
   </div>
   
   {error && <div className="text-danger">{error}</div>}
 </div>
 <AddQuestion />
 </>
  )
}

export default QAEditor
