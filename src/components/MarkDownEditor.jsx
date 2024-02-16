/* import React from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useMarkDown } from '../contextApi/MarkDownContext';

const MarkDownEditor = () => {
  const { MarkDown, handleMarkDownChange } = useMarkDown();
// simple md editor
  return (
    <div className="markdown-editor">
      <div className="editor">
        <MarkdownEditor
          value={MarkDown}
          onChange={handleMarkDownChange} 
          height={500} // Set the height to make it large
          dark={false} // Set dark mode to false for a light theme
          preview="live" // Show live preview
          placeholder="Write your Markdown here..." // Placeholder text
        />
      </div>
    </div>
  );
};

export default MarkDownEditor;

// working code ....
*/
import React from 'react';
import { MDXEditor, toolbarPlugin,  UndoRedo, BoldItalicUnderlineToggles, BlockTypeSelect, ListsToggle, quotePlugin, listsPlugin, headingsPlugin, tablePlugin, CodeToggle } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useMarkDown } from '../contextApi/MarkDownContext';

const editorStyle = {
  height: '300px',
  width: '100%', 
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
};

export default function MarkDownEditor() {
  const { MarkDown, handleMarkDownChange } = useMarkDown();

  return (
    <div style={editorStyle}>
      <MDXEditor
        markdown={MarkDown}
        onChange={handleMarkDownChange}
        language="markdown" // Set language to Markdown
        plugins={[
          quotePlugin(),
          listsPlugin(),
          headingsPlugin(),
          tablePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <ListsToggle />
                <CodeToggle /> 
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}
/*
//not working sql block

import React from 'react';
import { MDXEditor, codeBlockPlugin, sandpackPlugin, codeMirrorPlugin, toolbarPlugin, ConditionalContents } from '@mdxeditor/editor';

const defaultSnippetContent = `
SELECT * FROM table_name;
`.trim();

const simpleSandpackConfig = {
  defaultPreset: 'sql',
  presets: [
    {
      label: 'SQL',
      name: 'sql',
      meta: 'live sql',
      sandpackTemplate: 'sql',
      sandpackTheme: 'light',
      snippetFileName: '/query.sql',
      snippetLanguage: 'sql',
      initialSnippetContent: defaultSnippetContent
    },
  ]
};

function App() {
  return (
    <MDXEditor 
      markdown='hello world'
      plugins={[
        codeBlockPlugin({defaultCodeBlockLanguage: 'sql'}),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { sql: 'SQL', js: 'JavaScript', css: 'CSS' } }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                { fallback: () => ( <> 
                  <InsertCodeBlock />
                  <InsertSandpack />
                </>) }
              ]}
            />
          )
        })
      ]}
    />
  );
}

export default App;
*/