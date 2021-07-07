import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import _next from '../next_arrow.png'
import _back from '../note_back.png'

export default function MakeMap({ notesTitle, layerMap, updateLayerMap, root, updateRoot, updateRootModified, testNotes }) {
    const defaultArr = Array(testNotes.length).fill().map((elem,idx) => idx)

    const [value, setValue] = useState('');
    const [whatsLeft, setWhatsLeft] = useState(defaultArr);

    const clickedNote = (id) => {
        layerMap===0? handleClick0(id) : console.log()
        layerMap===1? handleClick1(id) : console.log()
    }

    const clickedMapNote = (id) => {
        // If you click the root note, then add value as root's child
        // id for this scenario is the rootID
        root[0].who === id? value || value===0? handleClickRoot1(value) /* Add function here to add value as a child of root */ : console.log() : console.log()
    }

    // Make note that's clicked on into the root note
    const handleClick0 = (id) => updateRoot([{who: id, children: null}])
    
    const handleClick1 = (id) => value===id? setValue('') : setValue(id)       // (setValue(''), setWhatsLeft())

    const handleClick0Arrow = () => root.length>0? updateLayerMap(1) : console.log()

    const handleClick1Arrow = (who) => {
        who==='left'? updateLayerMap(0) : console.log()
        // who==='right'
    }

    const handleClickRoot1 = (who) => {
        // Remove 'who' from available notes 
        // Then display it as a child of root
        //      - Add under root (state)
        let copyRoot = root
        copyRoot[0].children = [{ who: who, children: null}]
        // console.log(copyRoot)
        updateRoot(copyRoot)
        //      - Display it in JSX render
    }

    // Pick your root
    const layerMap0 = () => (
        <React.Fragment>
            <div className="d-flex flex-column align-items-center">
                <h1>Pick your root</h1>
                <p>MapField</p>
                <br/><br/>
                <br/><br/>
                <p>your root goes here when selected:</p>
                {root.length>0? <p className='border border-secondary rounded' style={{width: '200px'}}>{lessThanFifteen(testNotes[root[0].who][0])}</p> : <p className='' style={{width: '200px'}}>_</p>}
                {/* {console.log(root.length)} */}
                <br/><br/>
                Next<img onClick={handleClick0Arrow} src={_next} alt='next arrow' style={{height: '60px'}}/>
            </div>
        </React.Fragment>
    )

    // Add a child
    const layerMap1 = () => (
        <React.Fragment>
            <div className="d-flex flex-column align-items-center">
                <h1>Add a child</h1>
                {/* <br/><br/> */}
                <div className='bg-secondary d-flex flex-column align-items-center justify-content-center' style={{height: '600px', width: '600px'}}>
                    {root.length>0? <p onClick={()=>clickedMapNote(root[0].who)} className='border border-dark rounded' style={{width: '150px'}}>{lessThanFifteen(testNotes[root[0].who][0])}</p> : <p className='' style={{width: '200px'}}>_</p>}
                    {/* {root.length>0? <p className='border border-dark rounded' style={{width: '150px'}}>{lessThanFifteen(testNotes[root[0].who][0])}</p> : <p className='' style={{width: '200px'}}>_</p>} */}
                    {root.length>0? root[0].children? <p className='border border-dark rounded' style={{width: '150px'}}>{console.log(root[0].children[0].who)}{lessThanFifteen(testNotes[root[0].children[0].who][0])}</p> : <p className='' style={{width: '200px'}}>_</p> : <p className='' style={{width: '200px'}}>_</p> }
                </div>
                {/* <br/><br/> */}
                {/* <br/><br/> */}
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
        // console.log([{who: 1, children: [ {who:2, children: { value:4, children: null}}, {who:3, children: {value:0,children: null}} ]}])
        // console.log([{who: 1, children: null}])

        // Reset Root upon render
        updateRoot([])
        updateLayerMap(1)

        // Reset selected id
        setValue('')
        // console.log("i'm using effect")
    },[])

    // Return phrase up to 18 characters long
    const lessThanFifteen = (phrase) => {
        let charactersUsed = 0
        let desiredIndex = 0
        phrase.split(' ').map((elem,index) => {
            charactersUsed+= elem.length + 1
            charactersUsed<18? desiredIndex = index : console.log()
        })

        return (phrase.split(' ').map((elem,index) => index<=desiredIndex? elem : console.log()).join(' '))
    }

    const whichList = () => {
        const defaultArr = Array(notesTitle.length).fill().map((elem,idx)=>idx)
        if(layerMap===0)        // This returned array is complete and full notes list #=> [0,1,2...]
            return defaultArr
        if(layerMap===1) {      // need to revisit this and return only 'whats left' - root - any 'taken' notes
            let currentArr = Array(notesTitle.length).fill().map((elem,idx) => idx)

            // Get root index
            let rootIndex = ''
            if(root.length>0)
                rootIndex = root[0].who             // #=> [n] or [rootIndex]

            // Taken notes
            let takenNotes = []                  // Example, placeholder
            if(root.length>0)
                takenNotes.push(rootIndex)

            // Remove all root/taken notes
            if(root.length>0)
                currentArr.splice(rootIndex,1)      // *** Cannot splice any further, must use different method since index will no longer match
            
            // Find matching index from takenNotes in currentArr
            // If it matches, splice it from array 
            // console.log(currentArr)
            let toBeRemoved = []
            takenNotes.map(elem => currentArr.includes(elem)? toBeRemoved.push(elem) : console.log())   // Adds 'notes to be removed' to array
            // console.log(toBeRemoved)

            let toBeReturned = []
            currentArr.map(elem => toBeRemoved.includes(elem)? console.log() : toBeReturned.push(elem))
            // console.log(toBeReturned)
            
            return toBeReturned
        }        
        return defaultArr       // default 
    }

    return (
        <div className='d-flex align-items-center justify-content-center' style={{height: '100%'}}>

            {/* { PANEL } */}
            <div className='d-flex align-items-center' style={{height: '100%', borderRight: 'solid 1px black', position: 'relative'}}>
                <div className='' style={{position: 'absolute', height: '80px', width: '80px', top: '120px', left: '100px'}}><Link to='/home' className='noteTitle'>back</Link> </div>
                <div className='d-flex align-items-center' style={{width: '300px', height: '500px'}}>
                    <ul className='notesTitle'style={{margin: 'auto', width: '300px', height: '400px', overflowY: 'auto'}}>
                        {/* notes looks like [0,1,2,3,4,5,6,7,8] */}
                        {/* but it will look like [0,3,4,5] */}
                        {whichList().map((elem,index) => (
                            <li onClick={() => clickedNote(elem)} className='col' style={{width: '200px', listStyleType: 'none'}}>
                                <p className='border border-secondary rounded' style={{backgroundColor: `${layerMap===1? value===elem? 'green' : '' : ''}`, color: `${layerMap===1? value===elem? 'white' : '' : ''}`}}>{lessThanFifteen(notesTitle[elem].children[0].text)}</p>
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
        </div>
    )
}
