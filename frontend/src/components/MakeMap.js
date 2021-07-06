import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import _next from '../next_arrow.png'
import _back from '../note_back.png'

export default function MakeMap({ notesTitle, layerMap, updateLayerMap, root, updateRoot, testNotes }) {

    const clickedNote = (id) => {
        console.log('you clicked me', id)
        // If layer map is 0, make note that's clicked on into the root note
        layerMap===0? handleClick0(id) : console.log()
    }

    const handleClick0 = (id) => {    // Make note that's clicked on into the root note
        console.log(notesTitle[id])
        updateRoot([{who: id, children: null}])
    }

    const handleClick0Arrow = () => root.length>0? updateLayerMap(1) : console.log()

    const handleClick1Arrow = (who) => {
        who==='left'? updateLayerMap(0) : console.log()
        // who==='right'
    }

    const layerMap0 = () => (
        <React.Fragment>
            <div className="d-flex flex-column align-items-center">
                <h1>Pick your root</h1>
                <p>MapField</p>
                <br/><br/>
                <br/><br/>
                <p>your root goes here when selected</p>
                {root.length>0? <p className='border border-secondary rounded' style={{width: '200px'}}>{testNotes[root[0].who][0]}</p> : <p className='' style={{width: '200px'}}>_</p>}
                <br/><br/>
                Next<img onClick={handleClick0Arrow} src={_next} alt='next arrow' style={{height: '60px'}}/>
            </div>
        </React.Fragment>
    )

    const layerMap1 = () => (
        <React.Fragment>
            <div className="d-flex flex-column align-items-center">
                <h1>Add a child</h1>
                <br/><br/>
                <br/><br/>
                {root.length>0? <p className='border border-secondary rounded' style={{width: '200px'}}>{testNotes[root[0].who][0]}</p> : <p className='' style={{width: '200px'}}>_</p>}
                <br/><br/>
                <div className='row'>
                    <div className='col'>Back</div>
                    <div className='col'>Next</div>
                </div>
                <div className='row'>
                <img className='col' onClick={() => handleClick1Arrow('left')} src={_next} alt='next arrow' style={{height: '50px', width: 'auto', transform: 'rotate(180deg)', padding: '0 10px 0 10px'}}/>
                <img className='col' onClick={() => handleClick1Arrow('right')} src={_next} alt='next arrow' style={{height: '50px', width: 'auto', padding: '0 10px 0 10px'}}/>
                </div>
            </div>
        </React.Fragment>        
    )

    useEffect(()=>{
        console.log([{who: 1, children: [ {who:2, children: { value:4, children: null}}, {who:3, children: {value:0,children: null}} ]}])
        console.log([{who: 1, children: null}])

        // Reset Root upon render
        updateRoot([])
        updateLayerMap(0)
    },[])

    return (
        <div className='d-flex align-items-center justify-content-center' style={{height: '100%'}}>

            {/*   */}

            {/* { PANEL } */}
            <div className='d-flex align-items-center' style={{height: '100%', borderRight: 'solid 1px black', position: 'relative'}}>
                <div className='' style={{position: 'absolute', height: '80px', width: '80px', top: '120px', left: '100px'}}><Link to='/home' className='noteTitle'>back</Link> </div>
                <div className='d-flex align-items-center' style={{width: '300px', height: '500px'}}>
                    <ul className='notesTitle'style={{margin: 'auto', width: '300px', height: '400px', overflowY: 'auto'}}>
                        {notesTitle.map((elem,index) => (
                            <li onClick={() => clickedNote(index)} className='col' style={{width: '200px', listStyleType: 'none'}}>
                                <p className='border border-secondary rounded'>{elem.children[0].text}</p>
                            </li>                                                
                        ))}
                    </ul>  
                </div>
            </div>

            {/* { MAP MAKER } */}
            <div className="col" style={{position: 'relative'}}>
                {layerMap===0? layerMap0() : console.log()}
                {layerMap===1? layerMap1() : console.log()}
            </div>

            <div id='nodeList' style={{display: 'none'}}>
                <div id='1'>
                    <div id='2,4'></div>
                    <div id='3,0'></div>
                </div>
            </div>
        </div>
    )
}
