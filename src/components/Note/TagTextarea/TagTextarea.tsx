import { RichTextarea, createRegexRenderer } from 'rich-textarea';
import { useState } from 'react';

type TagTextareaType = {
  text?: string;
  handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur?: () => void;
  handleSubmit?: (value: string) => void;
};

export const TagTextarea = ({
  text,
  handleChange,
  handleBlur,
  handleSubmit,
}: TagTextareaType) => {
  const [innerText, setInnerText] = useState<string>('');

  const innerHandleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInnerText(e.target.value);
  };

  const renderer = createRegexRenderer([
    [
      /(#[a-zA-Z\d]+\b)(?!;)+/g,
      { borderRadius: '5px', backgroundColor: 'aquamarine', color: 'blue' },
    ],
  ]);
  return (
    <RichTextarea
      autoHeight
      style={{ width: '100%', resize: 'none' }}
      value={text || innerText}
      autoFocus
      onKeyDown={(e) => {
        if (handleSubmit && e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit(innerText);
					setInnerText('')
        }
      }}
      onChange={handleChange || innerHandleChange}
      onBlur={handleBlur}
    >
      {renderer}
    </RichTextarea>
  );
};
