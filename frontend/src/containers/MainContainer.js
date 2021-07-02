import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import Home from '../components/Home'
import Login from '../components/Login'

export default class MainContainer extends Component {
    render() {
        return (
            <div style={{height: '800px'}}>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/home' component={Home}/>
                </Switch>
            </div>
        )
    }
}
