import React, { Component } from 'react'
import _arrow from '../arrow.png'
import _plus from '../plus_sign.png'
import _test from '../testRescale.png'
import { Link, Redirect } from 'react-router-dom'

export default class HomeOG extends Component {

    layer0 = () => { 
        return (
            <div className='col d-flex justify-content-end'>
                <div className='d-flex align-items-center'>
                    <div onClick={() => this.props.updateLayer(1)} style={{fontFamily: 'Quicksand', fontSize: '4em'}}>
                        Notes</div></div></div>
        )
    }

    componentDidMount() {
        this.props.updateWho('')
    }

    layer1 = () => { 
        return (
            <div className="border-secondary" style={{height: '300px', width: '200px', position: 'relative'}}>
                <div className="border-dark" style={{position: 'absolute', height: '600px', width: '800px', top: '-150px', left: '-300px', whiteSpace: 'nowrap'}}>
                    {Array(5).fill().map((elem,indexR) => (<div className='row' style={{height: '20%'}}>{Array(5).fill().map((elem,indexC) => {

                        // Provides index value of note title that should be displayed
                        const boxNum = (indexC+indexR)%2 == 1? indexR%2==0? 5*indexR/2+1 + (indexC+1+indexR%2)/2 - 1 : 5*(indexR+1)/2-2 + (indexC+1+indexR%2)/2 - 1 : console.log() 
                        const testNotes = this.props.testNotes
                        // const testNotes = testNotesRaw.map(elem => [elem[0]])
                        console.log(testNotes)

                        // Prints note titles over 5 by 5 grid (created in Array(5).fill()... )
                        return (<div className='col d-flex align-items-center justify-content-center' style={{overflowX: 'hidden', fontWeight: 'bold', position: 'relative'}}>
                            { testNotes[boxNum-1]? testNotes[boxNum-1][0] : console.log() }
                            { boxNum? boxNum-1 : console.log() }
                            { boxNum? <div onClick={() => this.props.testClick(testNotes[boxNum-1], boxNum-1, 'homeOG')} style={{position: 'absolute', height: '30%', width: '80%'}}></div> : console.log()}
                        </div>)
                        })}</div>))
                    }
                    <div onClick={() => this.props.updateLayer(0)} style={{position: 'absolute', height: '30px', width: '30px', top: '0', left: '0'}}>
                        <img src={_arrow} alt='arrow' style={{height: '15px', color: 'black', transform: 'rotate(180deg)'}}/>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='d-flex align-items-center justify-content-center' style={{height: '100%'}}>
                <div className='row' style={{position: 'relative'}}>
                    {this.props.layer==0? this.layer0() : console.log()}
                    {this.props.layer==1? this.layer1(): console.log()}
                    <div className='col' style={{position: 'absolute', left: '500px'}}>
                        <Link to='/home'><img src={_arrow} alt='arrow' style={{height: '15px'}}/></Link>
                        <img src={_plus} alt='plus sign' style={{height: '15px'}}/>
                        <img src={_test} alt='plus sign' style={{height: '100px'}}/>
                    </div>
                </div>
                {this.props.redirect==1? <Redirect to='/editor'/> : console.log() }
            </div>
        )
    }
}


// unused code
// , backgroundColor: 'black', opacity: '0.3'

// [{
//     0: {
//         type: 'paragraph',
//         children: {
//             0: {
//                 text: 'Homeroom'
//             }
//         }
//     }
// }]

// [{0:{type:'paragraph',children:{0:{ text: 'Homeroom' }}}}]

// testNotes: [['Flatiron links', [{0:{type:'paragraph',children:{0:{ text: 'Homeroom' }}}}]], ['Asdf', [{0:{type:'paragraph',children:{0:{ text: 'view' }}}}]], ['Draw Boundaries', [{0:{type:'paragraph',children:{0:{ text: 'visuals are important to employers' }}}}]], ['Task list',[{0:{type:'paragraph',children:{0:{ text: 'Urgent/ASAP' }}}}]],['Places I want to work',[{0:{type:'paragraph',children:{0:{ text: 'Anima' }}}}]], ['Wonton noodle soup', [{0:{type:'paragraph',children:{0:{ text: 'stir fry veggies, cut garlic, add crumbled seA salt and magic' }}}}]], ['Packing list',[{0:{type:'paragraph',children:{0:{ text: 'Toothbrush' }}}}]], ['Notes', [{0:{type:'paragraph',children:{0:{ text: "4.6 mi, 14 min" }}}}]], ['Didi college tips', [{0:{type:'paragraph',children:{0:{ text: "messing up is learning, even if it’s embarrassing, you’ll learn from it"}}}}]]]
