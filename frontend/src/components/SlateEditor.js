import React, { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export default function SlateEditor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "We have some base content." }]
    }
  ]);
  return (
    <div className="App">
      <div style={{padding: '2% 5% 2% 5%'}}>
        <h1>Slate testing</h1>
        <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
        <Editable style={{ border: "1px solid black" , height: '600px'}}/>
      </Slate>
      </div>
    </div>
  );
}