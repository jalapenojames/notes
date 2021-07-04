import React, { useEffect } from 'react'
import _arrow from '../arrow.png'
import _create from '../create.png'
import { Link, Redirect } from 'react-router-dom'

export default function Home({ testClick, handleClickNew, redirect, testNotes, updateWho }) {
    
    useEffect(() => {updateWho('')}, [])

    return (
        <div className='d-flex align-items-center justify-content-center' style={{height: '100%'}}>
            <div className='row' style={{position: 'relative'}}>
                <div className='col d-flex justify-content-end'><div className='d-flex align-items-center'><div style={{fontFamily: 'Quicksand', fontSize: '4em'}}>Notes</div></div></div>
                <div className='col' style={{height: '300px', overflowY: 'auto', whiteSpace: 'nowrap', maxWidth: '500px'}}>
                    {testNotes.map((elem,index) => (
                        <React.Fragment>
                            <div key={index} className='' style={{borderBottom: '1px solid black', padding: '2%'}} onClick={() => testClick(elem, index, 'home')}>
                                <div className='row' style={{overflowX: 'hidden'}}><h2>{elem[0]}</h2></div>
                                <div className='row' style={{overflowX: 'hidden'}}><p>{elem[1]}</p></div>
                                {redirect==1? <Redirect to='/editor'/> : console.log() }
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className='col' style={{position: 'absolute', left: '400px'}}>
                    <Link to='/homeOG'><img src={_arrow} alt='arrow' style={{height: '15px'}}/></Link>
                    <button onClick={handleClickNew} style={{backgroundColor: 'transparent', border: 'none'}}><img src={_create} alt='create' style={{height: '20px'}}/></button>
                </div>
            </div>
        </div>
    )
}

// col d-flex align-items-center (line 9)