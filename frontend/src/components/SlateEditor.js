import React, { useState, useMemo, useEffect } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { NavLink, Link } from 'react-router-dom'
 
export default function SlateEditor({ note, index, updateRedirect, updateNotes, who, notesTitle, notesContent, testNotes, updateIndex }) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const editor2 = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState(notesContent[index]);
  const [value2, setValue2] = useState([notesTitle[index]]);

  useEffect(() => {updateRedirect(0)}, [])

  const patchTitle = (newTitle) => {
    const titleObj = {
      title: newTitle,
      content: value
    }

    // Title patch request
    fetch(`http://localhost:3000/notes/${index+1}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(titleObj)
    })
        .then(r => r.json())
        .then(console.log("Patched notes"))
  }

  const patchContent = () => {

  }

  const switchCurrentNote = (index) => {
    setValue(notesContent[index])
    setValue2([notesTitle[index]])
    updateIndex(index)
  }

  return (
    <div className="App d-flex flex-row" style={{posiition: 'relative'}}>

      {/* {Editor} */}
      <div className='' style={{padding: '2% 5% 6% 5%', position: 'absolute', height: '100vh', width: '700px', borderWidth: '0 1px 0 0 0', border: 'solid black'}}>
        { who==='home'? <NavLink to='/home' className="noteTitle"><h1>back</h1></NavLink> : who==='homeOG'? <NavLink to='/homeOG' className="noteTitle"><h1>back</h1></NavLink> : <h1>back</h1>}
        <br/><br/>
        <br/><br/>

        {/* {title} */}
        <Slate editor={editor2} value={value2} onChange={(newValue) => {
              // patchTitle(newValue)

              setValue2(newValue)

              updateNotes(newValue[0], index, 'title')
          }}>
          <Editable style={{ /*border: "1px solid black",*/ borderBottom: 'none', height: '30px', width: '400px', fontFamily: '', fontSize: '2em', fontWeight: 'bold'}}/>
        </Slate>
          <br/>

        {/* {content} */}
        <Slate editor={editor} value={value} onChange={(newValue) => {
              setValue(newValue)

              // Here is where we update testNotes in MC, but we also want it to give paragraph breaks to state
              updateNotes(newValue, index, 'content')
              // patchContent()
          }}>
          <Editable style={{ borderTop: "1px solid black", paddingTop: '3%', height: '400px', overFlowY: 'auto'}}/>
        </Slate>
      </div>

      {/* {View notes list} */}
      <div className='col d-flex justify-content-end' style={{paddingRight: '5%', position: 'absolute', width: '300px', left: '50%', top: '50%'}}><div className='d-flex align-items-center'><div style={{fontFamily: 'Times New Roman', fontSize: '4em'}}>Notes</div></div></div>
      <div className='col' style={{height: '300px', overflowY: 'auto', whiteSpace: 'nowrap', maxWidth: '350px', position: 'absolute', left: '70%', top: '30%'}}>
          {/* {Note Panel} */}
          {testNotes.map((elem,index) => (
              <React.Fragment>
                  <div key={index} className='' style={{borderBottom: '1px solid black', padding: '2%'}}>
                      <div className='row' style={{overflowX: 'hidden'}} onClick={()=>switchCurrentNote(index)}><h2>{elem[0]}</h2></div>
                      <div className='row' style={{overflowX: 'hidden'}}><p>{elem[1].split('<br/>')[0]}</p></div>
                      {/* elem[1] is now a nested array, lets write code to convert to text */}
                      {/* {redirect===1? <Redirect to='/editor'/> : console.log() } */}
                  </div>
              </React.Fragment>
          ))}
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
