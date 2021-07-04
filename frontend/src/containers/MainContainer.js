import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import Home from '../components/Home'
import HomeOG from '../components/HomeOG'
import Login from '../components/Login'
import SlateEditor from '../components/SlateEditor'

export default class MainContainer extends Component {

    state = {
        currentEditor: '',
        redirect: 0,
        testNotes: [['Flatiron links', 'Homeroom'], ['Asdf', 'view'], ['Draw Boundaries', 'visuals are important to employers'], ['Task list','Urgent/ASAP'],['Places I want to work','Anima'], ['Wonton noodle soup', 'stir fry veggies, cut garlic, add crumbled seA salt and magic'], ['Packing list','Toothbrush'], ['Notes', "4.6 mi, 14 min"], ['Didi college tips', "messing up is learning, even if it’s embarrassing, you’ll learn from it"]],
        index: 0
    }

    testClick = (note,index) => {
        this.setState({currentEditor: note})
        this.setState({redirect: 1})
        this.setState({ index })
    }

    updateRedirect = (redirect) => {
        this.setState({redirect})
    }

    updateNotes = (val,idx,who) => {
        let testNotes = this.state.testNotes
        if(who=='title')
            testNotes[idx][0] = val
        if(who=='content')
            testNotes[idx][1] = val
        this.setState({testNotes})
    }

    render() {
        return (
            <div style={{height: '800px'}}>
                <Switch>
                    <Route exact path='/'><Home testClick={this.testClick} redirect={this.state.redirect} testNotes={this.state.testNotes}/></Route>
                    <Route path='/home'><Home testClick={this.testClick} redirect={this.state.redirect} testNotes={this.state.testNotes}/></Route>
                    <Route path='/homeOG'><HomeOG testNotes={this.state.testNotes}/></Route>
                    <Route path='/editor'><SlateEditor note={this.state.currentEditor} index={this.state.index} updateRedirect={this.updateRedirect} updateNotes={this.updateNotes}/></Route>
                </Switch>
            </div>
        )
    }
}
