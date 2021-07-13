import React from 'react'
import Paper from 'paper'

export default function PaperDrawing() {

    let myPath = new Paper.Path()

    Paper.view.onMouseDown = (event) => {
        myPath.strokeColor = "black";
        myPath.strokeWidth = 3;
      };
    
      Paper.view.onMouseDrag = (event) => {
        myPath.add(event.point);
      };
    
      Paper.view.draw();
}
