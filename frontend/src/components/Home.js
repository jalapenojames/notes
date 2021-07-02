import React from 'react'

const testNotes = [['Flatiron links', 'Homeroom'], ['Asdf', 'view'], ['Draw Boundaries', 'visuals are important to employers'], ['Task list','Urgent/ASAP'],['Places I want to work','Anima'], ['Wonton noodle soup', 'stir fry veggies, cut garlic, add crumbled seA salt and magic'], ['Packing list','Toothbrush'], ['Notes', "4.6 mi, 14 min"], ['Didi college tips', "messing up is learning, even if it’s embarrassing, you’ll learn from it"]]

export default function Home() {
    return (
        <div className='d-flex align-items-center justify-content-center' style={{height: '100%'}}>
            <div className='row'>
                <div className='col d-flex justify-content-end'><div className='d-flex align-items-center'><div style={{fontFamily: 'Quicksand', fontSize: '4em'}}>Notes</div></div></div>
                <div className='col' style={{height: '300px', overflowY: 'auto', whiteSpace: 'nowrap'}}>
                    {testNotes.map((elem,index) => (
                        <React.Fragment>
                            <div key={index} className='' style={{borderBottom: '1px solid black', padding: '2%'}}>
                                <div className='row' style={{overflowX: 'hidden'}}><h2>{elem[0]}</h2></div>
                                <div className='row' style={{overflowX: 'hidden'}}><p>{elem[1]}</p></div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

// col d-flex align-items-center (line 9)