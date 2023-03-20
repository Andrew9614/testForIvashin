import { useEffect, useMemo, useState } from 'react';
import { noteDataType } from '../../types/noteDataType';
import styles from './Note.module.scss';
import { TagTextarea } from './TagTextarea/TagTextarea';

type NoteType = {
  note: noteDataType;
  handleTags: (tags: string[], id: number) => void;
  deleteNote: (id: number) => void;
  activeTag?: string;
};

export const Note = ({ note, handleTags, activeTag, deleteNote }: NoteType) => {
  const [text, setText] = useState(note.text);
  const [isEdit, setIsEdit] = useState(false);

  let arr = useMemo(() => text.split(/(#[a-zA-Z\d]+\b)(?!;)/), [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleBlur = () => {
    setIsEdit(false);
  };

  useEffect(() => {
    handleTags(
      arr.filter((el) => el[0] === '#'),
      note.id
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arr]);
  return (
    <div
      className={
        styles.noteContainer +
        (activeTag && !arr.includes(activeTag) ? ' ' + styles.hidden : '')
      }
      onClick={() => setIsEdit(true)}
    >
      {isEdit ? (
        <TagTextarea
          text={text}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      ) : (
        <div>
          {arr.map((el, i) => {
            if (el[0] === '#') {
              return (
                <span key={i} className="tag edit">
                  {el}
                </span>
              );
            } else {
              return ' ' + el + ' ';
            }
          })}
        </div>
      )}
      <button onClick={() => deleteNote(note.id)}>x</button>
    </div>
  );
};
