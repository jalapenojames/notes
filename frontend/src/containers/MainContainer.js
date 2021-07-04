import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import Home from '../components/Home'
import HomeOG from '../components/HomeOG'
import Login from '../components/Login'
import SlateEditor from '../components/SlateEditor'

export default class MainContainer extends Component {
    render() {
        return (
            <div style={{height: '800px'}}>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/home' component={Home}/>
                    <Route path='/homeOG' component={HomeOG}/>
                    <Route path='/editor' component={SlateEditor}/>
                </Switch>
            </div>
        )
    }
}
