import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link,Redirect } from 'react-router-dom'

export default function Login({ updateCurrentUser, currentUser, users, notesAssoc, loginRedirect, updateLoginRedirect }) {

    const handleSubmit = (e) => {
        e.preventDefault()

        const enteredUser = document.getElementById('loginForm').elements["user"].value
        const enteredPass = document.getElementById('loginForm').elements["pass"].value
        // console.log(enteredUser)
        // console.log(enteredPass)

        // Check if user exists, if not, return a message to try again, if yes, redirect, and set as user
        const bool = users.map(elem => enteredUser === elem)
        console.log(bool, bool.includes(true))
        let who = []
        bool.includes(true)? bool.map((e,i)=> e? who.push(i) : console.log()) : console.log('User does not exist')
        console.log(who)

        updateCurrentUser(users[who[0]])
        console.log(users[who[0]])

        // If user valid, then redirect to Home
        if(bool.includes(true)) {
            updateLoginRedirect(true)
        }
    }

    return (
        <div className='d-flex row align-items-center justify-content-center' style={{height: '100%'}}>
            <Form onSubmit={(e) => handleSubmit(e)} id='loginForm'>
                <h1 style={{marginBottom: '40%', fontSize: '3em', fontFamily: 'Quicksand'}}>Login</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="user" placeholder="Enter user" name="user" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="pass" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Have a good day?" />
                </Form.Group>
                {/* <Link to='/home'><Button variant="secondary" type="submit">Submit</Button></Link> */}
                <Button variant="secondary" type="submit">Submit</Button>
            </Form>
            {/* {Redirect} */}
            {loginRedirect? <Redirect to='/home'/> : console.log()}
        </div>
    )
}
