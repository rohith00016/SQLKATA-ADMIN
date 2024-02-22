 import React from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import '@uiw/react-markdown-editor/markdown-editor.css';
import { useMarkDown } from '../../contextApi/MarkDownContext';

const MarkDownEditor = () => {
  const { MarkDown, handleMarkDownChange } = useMarkDown();

  return (
    <div className="markdown-editor">
      <div className="editor">
        <MarkdownEditor
          value={MarkDown}
          onChange={handleMarkDownChange} 
          height={500}
          theme="light" 
          preview="live"
          placeholder="Write your Markdown here..."
        />
      </div>
    </div>
  );
};

export default MarkDownEditor;
