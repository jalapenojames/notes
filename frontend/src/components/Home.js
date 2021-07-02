import React from 'react'

const testNotes = [['Flatiron links', 'Homeroom'], ['Asdf', 'view'], ['Draw Boundaries', 'visuals are important to employers'], ['Task list','Urgent/ASAP']]

export default function Home() {
    return (
        <div className='d-flex align-items-center justify-content-center' style={{height: '100%'}}>
            <div className='row'>
                <div className='col d-flex align-items-center'><div style={{fontFamily: 'Quicksand', fontSize: '4em'}}>Notes</div></div>
                <div className='col' style={{height: '300px', overflowY: 'auto'}}>
                    {testNotes.map(elem => (
                        <React.Fragment>
                            <h1>{elem[0]}</h1>
                            <p>{elem[1]}</p>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
