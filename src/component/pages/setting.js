import React from 'react'
import Sidebar from '../directives/sidebar'
import { Container, Row, Col, Form, Button, ProgressBar } from 'react-bootstrap'
import SemiCircleProgressBar from "react-progressbar-semicircle";
// import '../../assets/css/style.scss'

function Setting() {
    return (
        <>
            <Sidebar />
            <div className='page-wrapper'>
                <div className="restaurant-panel-content">
                    <Container>
                        <div className='main-heading'>
                            <h2>Settings</h2>
                        </div>

                        <Row className='mt-5'>
                            <Col lg={8}>
                                <Form >
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>CRM</Form.Label>
                                            <Form.Select defaultValue="Choose...">
                                                <option>Choose...</option>
                                                <option>HubSpot</option>
                                                <option>Mixpanel</option>
                                                <option>Salesforce</option>
                                                <option>Snowflake</option>

                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridZip">
                                            <Form.Label>API Link</Form.Label>
                                            <Form.Control type="text" placeholder="Enter api link " />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>API Key</Form.Label>
                                            <Form.Control type="text" placeholder="Enter api key   " />
                                        </Form.Group>
                                        <Col />
                                    </Row>
                                    <div className='setting-btn'>
                                        <Button>Submit</Button>

                                    </div>
                                </Form>
                            </Col>
                        </Row>



                        <section className='section-padding'>
                            {/* <div className="progress">
                                <div className="barOverflow">
                                    <div className="bar" />
                                </div>
                                <span>10</span>%
                            </div> */}
                            {/* <div className="progress">
                                <div className="barOverflow">
                                    <div className="bar" />
                                </div>
                                <span>100</span>%
                            </div>
                            <div className="progress">
                                <div className="barOverflow">
                                    <div className="bar" />
                                </div>
                                <span>34</span>%
                            </div>
                            <div className="progress">
                                <div className="barOverflow">
                                    <div className="bar" />
                                </div>
                                <span>56.5</span>%
                            </div> */}


                        </section>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Setting