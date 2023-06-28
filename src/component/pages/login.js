import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function Login() {
    const navigate = useNavigate()
   
    const [password, setpassword] = useState()
    const [username, setUsername] = useState()
    const DashboardPage = async () => {
       
         try {
      const response = await fetch('https://sahadev.techpanda.art/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, username })
      })
      
    if (response.ok) {
        const { id } = await response.json();

        localStorage.setItem('userId', id);
      
        navigate('/dashboard');
      }
      else {
        const responseData = await response.json();
        toast.error(responseData.errors.non_field_errors);
       
      }
    } catch (error) {
      // Handle error or show error message to the user
    }
    }
    
    return (
        <>
            <Toaster />
            <div>
                <Container fluid>
                    <Row>
                        <Col lg={8} className='mainForm-bg'>
                            <div className="mainForm-text">
                                <h2>Churn<span>Board</span></h2>
                                <p>Simplifying Customer Understanding</p>
                            </div>

                        </Col>
                        <Col lg={4} className='align-self-center'>
                            <div className='mainForm-content'>
                                <h3>Hello there!</h3>
                                {/* <Form> */}
                                <Form.Group className="left-inner-addon input-container">
                                    <i className="fa fa-user-o" />
                                    <Form.Control type="text" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="left-inner-addon input-container" >
                                    <i className="fa fa-lock" />
                                    <Form.Control type="password" placeholder="PASSWORD" value={password} onChange={(e) => setpassword(e.target.value)} />
                                </Form.Group>

                                <div className='mainForm-btn'>
                                    <Button type="submit" onClick={DashboardPage}>
                                        Login
                                    </Button>
                                </div>
                                <div className='mainForm-right'>
                                    <Link>Forgot your password?</Link>
                                </div>
                                {/* </Form> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login