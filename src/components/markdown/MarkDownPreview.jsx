import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useMarkDown } from '../../contextApi/MarkDownContext';

const MarkdownPreview = () => {
   const { MarkDown } = useMarkDown();

  return (
    <div className="preview border p-3">
      <div className="card">
        <div className="card-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={atomDark}
              language={match[1] === 'markdown' ? 'plaintext' : match[1]}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              {...props}
              className="code-block"
            />
          ) : (
            <code className={`inline-code ${className}`} {...props}>
              {children}
            </code>
          );
        }
      }}>
        {MarkDown}
      </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreview;
