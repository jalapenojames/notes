import React, { useState, useMemo, useEffect } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { NavLink } from 'react-router-dom'
 
export default function SlateEditor({ note, index, updateRedirect, updateNotes, who, notesTitle, notesContent }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const editor2 = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState(notesContent[index]);
  const [value2, setValue2] = useState([notesTitle[index]]);

  useEffect(() => {updateRedirect(0)}, [])

  return (
    <div className="App">
      <div className='border border-secondary' style={{padding: '2% 5% 6% 5%'}}>
        { who==='home'? <NavLink to='/home' className="noteTitle"><h1>back</h1></NavLink> : who==='homeOG'? <NavLink to='/homeOG' className="noteTitle"><h1>back</h1></NavLink> : <h1>back</h1>}
        <br/><br/>
        <br/><br/>
        <Slate editor={editor2} value={value2} onChange={(newValue) => {
              setValue2(newValue)

              updateNotes(newValue[0], index, 'title')
          }}>
          <Editable style={{ /*border: "1px solid black",*/ borderBottom: 'none', height: '30px', width: '300px', fontFamily: '', fontSize: '2em', fontWeight: 'bold'}}/>
        </Slate>
          <br/>
        <Slate editor={editor} value={value} onChange={(newValue) => {
              setValue(newValue)

              // Here is where we update testNotes in MC, but we also want it to give paragraph breaks to state
              updateNotes(newValue, index, 'content')
          }}>
          <Editable style={{ border: "1px solid black", height: '400px', overFlowY: 'auto'}}/>
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

// Save the value to Local Storage.
// const content = JSON.stringify(newValue)
// localStorage.setItem('content', content)


// Error: Objects are not valid as a React child (found: object with keys {type, children}). If you meant to render a collection of children, use an array instead.

// [{ type: 'paragraph', children: [{text: 'Homeroom'}]}]


// [{type: 'paragraph'}, { children: '' }]

// [{text: 'Homeroom'}]

// [['Flatiron links', [{type: 'paragraph'}, { children: [{text: 'Homeroom'}] }]], ['Asdf', [{type: 'paragraph'}, { children: [{text: 'view'}] }]], ['Draw Boundaries', [{type: 'paragraph'}, { children: [{text: 'visuals are important to employers'}] }]], ['Task list',[{type: 'paragraph'}, { children: [{text: 'Urgent/ASAP'}] }]],['Places I want to work',[{type: 'paragraph'}, { children: [{text: 'Anima'}] }]], ['Wonton noodle soup', [{type: 'paragraph'}, { children: [{text: 'stir fry veggies, cut garlic, add crumbled seA salt and magic'}] }]], ['Packing list',[{type: 'paragraph'}, { children: [{text: 'Toothbrush'}] }]], ['Notes', [{type: 'paragraph'}, { children: [{text: "4.6 mi, 14 min"}] }]], ['Didi college tips', [{type: 'paragraph'}, { children: [{text: "messing up is learning, even if it’s embarrassing, you’ll learn from it"}] }]]],

// [['Flatiron links', [{type: 'paragraph'}, { children: [{text: 'Homeroom'}] }]]]

// [
//   {['Flatiron links', [{type: 'paragraph'}, { children: [{text: 'Homeroom'}] }]]}
// ]


// const [value, setValue] = useState([
//   {
//     type: "paragraph",
//     children: [{ text: `${note[1]}`}]
//   }
// ]);
// const [value2, setValue2] = useState([
//   {
//     type: "paragraph",
//     children: [{ text: `${note[0]}`}]
//   }
// ]);
