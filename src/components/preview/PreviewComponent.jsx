import React, {useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import MarkdownPreview from '../markdown/MarkDownPreview'
import { AccordionTable } from '../tabels/AccordionTable'
import AnswersPreview from '../AnswersPreview'
import { useCmdType } from '../../contextApi/CmdTypeContext'
import { useDescription } from '../../contextApi/DescriptionContext'
import { useHardLevel } from '../../contextApi/HardLevelContext'
import { useData } from '../../contextApi/DataContext'
import { Navbar } from 'react-bootstrap';
import { useMarkDown } from '../../contextApi/MarkDownContext';
import { useNavigate } from 'react-router-dom';


export const PreviewComponent = () => {

  const { defaultQueries, answers, tables, mainQuestion, dataTableCMD } = useData();
  const { commandType } = useCmdType();
  const { MarkDown } = useMarkDown();
  const { description } = useDescription();
  const { HardLevel } = useHardLevel();
  const { backButton, setBackButton } = useData();
  const navigate = useNavigate();

  const handleMainPage = () =>{
    navigate('/');
    setBackButton(true);
    console.log(backButton);
  }

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
       readme: MarkDown,       
       answers,
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
         throw new Error('Please provide Q&A before downloading.');
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
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand mb-0 h1">SQL Editor</span>
        <div>
          <button
            className="btn btn-warning mx-2"
            onClick={handleMainPage}
            style={{ backgroundColor: 'orange', borderColor: 'darkorange' }}
          >
            Main Page
          </button>
          <button
            className="btn btn-warning"
            onClick={downloadJSON}
            style={{ backgroundColor: 'orange', borderColor: 'darkorange' }}
          >
            Download JSON
          </button>
        </div>
      </div>
    </Navbar>
      <h6 className='mx-2 my-4'>Markdown Preview:</h6>
      <MarkdownPreview />
      <h6 className='mx-2 my-4'>Table preview:</h6>
      <AccordionTable />
      <AnswersPreview />
</div>)};


