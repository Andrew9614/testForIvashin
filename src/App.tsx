import './App.scss';
import { useState } from 'react';
import { Note } from './components/Note/Note';
import { noteDataType } from './types/noteDataType';
import { TagTextarea } from './components/Note/TagTextarea/TagTextarea';

//test template
const dataInit = JSON.stringify([
  { id: 1, text: 'Hello #test' },
  {
    id: 2,
    text: 'Hi #test1 and #test too',
  },
  {
    id: 3,
    text: 'its #test3 and not anymore',
  },
  {
    id: 4,
    text: 'And that #test4 with #test3 and #test and #test2',
  },
]);

function App() {
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [tagsMap, setTagsMap] = useState(new Map<number, string[]>());
  const [activeTag, setActiveTag] = useState<string>();
  const [data, setData] = useState<noteDataType[]>(
    JSON.parse(localStorage.getItem('data') || dataInit)
  );

  const saveData = () => {
    localStorage.setItem('data', JSON.stringify(data));
  };

  const clearData = () => {
    localStorage.setItem('data', '');
    setData([]);
  };

  const handleDelete = (id: number) => {
    setData([...data.filter((el) => el.id !== id)]);
  };

  const handleTags = (tags: string[], id: number) => {
    setTagsMap(tagsMap.set(id, tags));
    const set = new Set(Array.from(tagsMap.values()).flat());
    setTagsList(Array.from(set).sort());
  };

  const handleTagClick = (tag: string) => {
    saveData();
    if (activeTag !== tag) {
      setActiveTag(tag);
    } else {
      setActiveTag(undefined);
    }
  };

  const handleSubmit = (value: string) => {
    setData([
      ...data,
      { id: data.length ? data[data.length - 1].id + 1 : 1, text: value },
    ]);
  };
  return (
    <div className="App">
      <div className="inputNote">
        New note:
        <TagTextarea handleSubmit={handleSubmit} />
      </div>
      <div className="notesWrapper">
        {data.map((el) => (
          <Note
            key={el.id}
            note={el}
            handleTags={handleTags}
            activeTag={activeTag}
            deleteNote={handleDelete}
          />
        ))}
      </div>
      <div className="tagsWrapper">
        {tagsList.map((el) => (
          <div
            key={el}
            className={'tag' + (activeTag === el ? ' active' : '')}
            onClick={() => handleTagClick(el)}
          >
            {el}
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => saveData()}>Save</button>
        <button onClick={() => clearData()}>Clear</button>
      </div>
    </div>
  );
}

export default App;
