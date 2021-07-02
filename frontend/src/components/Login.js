import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

export default function Login() {
    return (
        <div className='d-flex row align-items-center justify-content-center' style={{height: '100%'}}>
            <Form>
                <h1 style={{marginBottom: '40%', fontSize: '3em', fontFamily: 'Quicksand'}}>Login</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Link to='/home'><Button variant="secondary" type="submit">Submit</Button></Link>
            </Form>
        </div>
    )
}
