import React, { useEffect } from 'react'
import _arrow from '../arrow.png'
import _create from '../create.png'
import _map from '../map.png'
import { Link, Redirect } from 'react-router-dom'

export default function Home({ testClick, handleClickNew, redirect, testNotes, updateWho, note, deleteCurrentNote }) {
    
    useEffect(() => {
        updateWho('')
    }, [])

    useEffect(() => {checkDeleteNewNote()}, [])

    const checkDeleteNewNote = () => {
        console.log(note[0]==="New note" && note[1]==='' || note[0]==="New note" && note[1]==='<br/>')
        console.log(note[0], note[1])

        // If meets condition, delete Note current index
        if(note[0]==="New note" && note[1]==='' || note[0]==="New note" && note[1]==='<br/>')
            deleteCurrentNote()
    }

    return (
        <div className='d-flex align-items-center justify-content-center' style={{height: '100%'}}>
            <div className='row' style={{position: 'relative'}}>
                <div className='col d-flex justify-content-end' style={{paddingRight: '5%'}}><div className='d-flex align-items-center'><div style={{fontFamily: 'Times New Roman', fontSize: '4em'}}>Notes</div></div></div>
                <div className='col' style={{height: '300px', overflowY: 'auto', whiteSpace: 'nowrap', maxWidth: '500px'}}>
                    {testNotes.map((elem,index) => (
                        <React.Fragment>
                            <div key={index} className='' style={{borderBottom: '1px solid black', padding: '2%'}} onClick={() => testClick(elem, index, 'home')}>
                                <div className='row' style={{overflowX: 'hidden'}}><h2>{elem[0]}</h2></div>
                                <div className='row' style={{overflowX: 'hidden'}}><p>{elem[1].split('<br/>')[0]}</p></div>
                                {/* elem[1] is now a nested array, lets write code to convert to text */}
                                {redirect===1? <Redirect to='/editor'/> : console.log() }
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                <div className='row' style={{position: 'absolute', top: '400px', left: '350px'}}><Link to='/makemap'><img src={_map} alt='map or a book' style={{height: '50px'}}/></Link></div>
                <div className='col' style={{position: 'absolute', left: '400px'}}>
                    <Link to='/homeOG'><img src={_arrow} alt='arrow' style={{height: '15px'}}/></Link>
                    <button onClick={handleClickNew} style={{backgroundColor: 'transparent', border: 'none'}}><img src={_create} alt='create' style={{height: '20px'}}/></button>
                </div>
            </div>
        </div>
    )
}

// col d-flex align-items-center (line 9)

// We have a compelx array from elem[1] but we just want the first line
// const convArrToJSX = (nest) => {
//     return (
        // nest.map(elem=> {
        //     elem.children[0].text+'<br/>'
        // }).join('')
//         nest[0].children[0].text
//     )
// }