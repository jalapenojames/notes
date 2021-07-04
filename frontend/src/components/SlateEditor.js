import React, { useState, useMemo, useEffect } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { NavLink, Link } from 'react-router-dom'
 
export default function SlateEditor({ note, index, updateRedirect, updateNotes, who }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const editor2 = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: `${note[1]}`}]
    }
  ]);
  const [value2, setValue2] = useState([
    {
      type: "paragraph",
      children: [{ text: `${note[0]}`}]
    }
  ]);

  useEffect(() => {updateRedirect(0)}, [])

  return (
    <div className="App">
      <div style={{padding: '2% 5% 2% 5%'}}>
        { who=='home'? <NavLink to='/home' className="noteTitle"><h1>back</h1></NavLink> : who=='homeOG'? <NavLink to='/homeOG' className="noteTitle"><h1>back</h1></NavLink> : <h1>back</h1>}
        <Slate editor={editor2} value={value2} onChange={(newValue) => {
            setValue2(newValue)

            // console.log(newValue[0].children[0].text,index)
            updateNotes(newValue[0].children[0].text, index, 'title')
        }}>
        <Editable style={{ border: "1px solid black", borderBottom: 'none', height: '30px', width: '300px'}}/>
      </Slate>

        <Slate editor={editor} value={value} onChange={(newValue) => {
            setValue(newValue)

            // console.log(newValue[0].children[0].text)
            updateNotes(newValue[0].children[0].text, index, 'content')
            // console.log(value.map(elem => elem.children[0].text))
            // Save the value to Local Storage.
            // const content = JSON.stringify(newValue)
            // localStorage.setItem('content', content)
        }}>
        <Editable style={{ border: "1px solid black" , height: '600px'}}/>
      </Slate>
      </div>
    </div>
  );
}


// <Slate
// editor={editor}
// value={value}
// onChange={(newValue) => setValue(newValue)}>
// </Slate>