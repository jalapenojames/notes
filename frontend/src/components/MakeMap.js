import React from 'react'

export default function MakeMap({ notesTitle }) {
    return (
        <div className='d-flex align-items-center justify-content-center' style={{height: '100%'}}>
            <div style={{height: '100%', borderRight: 'solid 1px black'}}>
                <div className='d-flex row align-items-center' style={{width: '300px', height: '500px'}}>
                    {notesTitle.map((elem,index) => (
                        <div className='col' key={index+'noteTitle'} style={{width: ''}}>
                            {elem.children[0].text}
                        </div>
                    ))}
                </div>
            </div>
            <div className="col">MapField</div>
        </div>
    )
}
