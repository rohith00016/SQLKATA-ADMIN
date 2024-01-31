import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useReadMe } from '../contextApi/ReadmeContext';

const WysiwygEditor = () => {
  const { readMe, setReadMe } = useReadMe();

  const handleReadmeChange = (content) => {

    setReadMe(content);
  };

  return (
    <ReactQuill
      theme="snow"
      value={readMe}
      onChange={handleReadmeChange}
      modules={{
        toolbar: [
          [{ 'header': [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image'],
          ['clean'],
          ['code'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['formula'],
          ['video'], 
        ],
      }}
      formats={[
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'link', 'image', 'code', 'color', 'background', 'align', 'formula', 'video'
      ]}

    />
  );
};

export default WysiwygEditor;
