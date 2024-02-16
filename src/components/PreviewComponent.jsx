import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import MarkdownPreview from './MarkDownPreview'
import { AccordionTable } from './AccordionTable'
import AnswersPreview from './AnswersPreview'
import { useCmdType } from '../contextApi/CmdTypeContext'
import { useReadMe } from '../contextApi/ReadmeContext'
import { useDescription } from '../contextApi/DescriptionContext'
import { useHardLevel } from '../contextApi/HardLevelContext'
import { useData } from '../contextApi/DataContext'
import { Navbar } from 'react-bootstrap';


export const PreviewComponent = () => {

  const { defaultQueries, answers, tables, mainQuestion, dataTableCMD } = useData();
  const { commandType } = useCmdType
  const { readMe } = useReadMe();
  const { description } = useDescription();
  const { HardLevel } = useHardLevel();

  const generateJSONData = () => {
     const jsonData = {
       questionName: mainQuestion,
       hardnessScore: HardLevel,
       tableNames: tables,
       tags: ['sql', commandType],
       status: "unsolved",
       dataCMD: defaultQueries,
       dataTableCMD,
       description,
       answers,
       readme: readMe,
     };
     return JSON.stringify(jsonData, null, 2);
   };
 
   const downloadJSON = async () => {
     try {
 
       if (!tables || tables.length === 0) {
         throw new Error('Please create at least one table & insert values.');
       }
 
       if (!commandType) {
         throw new Error('Please select a command type before downloading.');
       }
 
       if (!answers || answers.length === 0) {
         throw new Error('Please provide answers before downloading.');
       }
 
       if (!description || description.length === 0) {
         throw new Error('Please provide description before downloading.');
       }
 
       const jsonData = generateJSONData();
       const blob = new Blob([jsonData], { type: 'application/json' });
       const url = URL.createObjectURL(blob);
 
       const a = document.createElement('a');
       a.href = url;
       a.download = 'data.json';
       a.click();
 
       const response = await axios.post(
         //'http://localhost:3000/questions/addQuestions',
         "https://sqleditor-server.onrender.com/questions/addQuestions",
         jsonData,
         {
           headers: {
             'Content-Type': 'application/json',
           },
         }
       );
       console.log('POST request successful:', response.data);
 
       toast.success('JSON data downloaded and sent to server successfully!');
 
     } catch (error) {
       console.error('Error:', error);
       toast.error(`Error: ${error || 'An unexpected error occurred.'}`);
     }
   };

  return (
    <div className='mx-2'>
    <Navbar bg="dark" variant="dark" className="mx-0 my-3 rounded">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">SQL Editor</span>    
      <button
          className="btn btn-warning"
          onClick={downloadJSON}
          style={{ backgroundColor: 'orange', borderColor: 'darkorange' }}
        >
          Download JSON
        </button>
        </div>
        </Navbar>
      <h6 className='mx-2 my-4'>Markdown Preview:</h6>
      <MarkdownPreview />
      <h6 className='mx-2 my-4'>Table preview:</h6>
      <AccordionTable />
      <AnswersPreview />
</div>)};

