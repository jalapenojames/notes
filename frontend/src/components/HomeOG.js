import React, { Component } from 'react'
import _arrow from '../arrow.png'
import _plus from '../plus_sign.png'
import _test from '../testRescale.png'
import { Link } from 'react-router-dom'

export default class HomeOG extends Component {

    state = {
        layer: 0,
    }

    handleClick = (id) => {
        this.setState({layer: id})
    }

    layer0 = () => { 
        return (
            <div className='col d-flex justify-content-end'>
                <div className='d-flex align-items-center'>
                    <div onClick={() => this.handleClick(1)} style={{fontFamily: 'Quicksand', fontSize: '4em'}}>
                        Notes</div></div></div>
        )
    }

    layer1 = () => { 
        return (
            <div className="border-secondary" onClick={() => this.handleClick(0)} style={{height: '300px', width: '200px', position: 'relative'}}>
                {/* {testNotes.map((elem,index) => { return (<div>{elem[0]}</div>)})} */}
                <div className="border-dark" style={{position: 'absolute', height: '600px', width: '800px', top: '-150px', left: '-300px', whiteSpace: 'nowrap'}}>
                    {Array(5).fill().map((elem,indexR) => (<div className='row' style={{height: '20%'}}>{Array(5).fill().map((elem,indexC) => {

                        const boxNum = (indexC+indexR)%2 == 1? indexR%2==0? 5*indexR/2+1 + (indexC+1+indexR%2)/2 - 1 : 5*(indexR+1)/2-2 + (indexC+1+indexR%2)/2 - 1 : console.log() 
                        const testNotes = this.props.testNotes

                        return (<div className='col d-flex align-items-center justify-content-center' style={{overflowX: 'hidden', fontWeight: 'bold'}}>
                            {testNotes[boxNum-1]? testNotes[boxNum-1][0] : console.log()}
                        </div>)
                        })}</div>))
                    }
                    {/* {Math.floor((Math.floor(5*5/2)-testNotes.length)/2)} */}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='d-flex align-items-center justify-content-center' style={{height: '100%'}}>
                <div className='row' style={{position: 'relative'}}>
                    {this.state.layer == 0? this.layer0() : console.log()}
                    {this.state.layer ==1? this.layer1(): console.log()}
                    <div className='col' style={{position: 'absolute', left: '450px'}}>
                        <Link to='/home'><img src={_arrow} alt='arrow' style={{height: '15px'}}/></Link>
                        <img src={_plus} alt='plus sign' style={{height: '15px'}}/>
                        <img src={_test} alt='plus sign' style={{height: '100px'}}/>
                    </div>
                </div>
            </div>
        )
    }
}


