import React from 'react'
import Sidebar from '../directives/sidebar'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import SemiCircleProgressBar from "react-progressbar-semicircle";

function Contributorsboard() {
   
    return (
        <>
            <Sidebar />
            <div className='page-wrapper'>
                <div className="restaurant-panel-content">
                    <Container>
                        <div className='main-heading'>
                            <h2>Contributors Board</h2>
                        </div>
                        <Row>
                            <Col lg={3} sm={6} className='mt-2 mb-3'>
                                <div className='dash-card'>
                                    <h6>Daily Usage</h6>
                                    <SemiCircleProgressBar percentage={40}
                                        background="#eee"
                                        strokeWidth="25" 
                                        stroke="#FF0000" // Change this to your desired color
                                    />
                                    <span className="label">40%</span>

                                </div>
                            </Col>
                            <Col lg={3} sm={6} className='mt-2 mb-3'>
                                <div className='dash-card'>
                                    <h6>Daily Usage</h6>
                                    <SemiCircleProgressBar percentage={20} background="#eee" strokeWidth="25" 
                                        stroke="#800000" />
                                    <span className="label">20%</span>

                                </div>
                            </Col>
                            <Col lg={3} sm={6} className='mt-2 mb-3'>
                                <div className='dash-card'>
                                    <h6>No of Integration</h6>
                                    <SemiCircleProgressBar percentage={20} background="#eee" strokeWidth="25" 
                                        stroke="#00FF00" />
                                    <span className="label">20%</span>

                                </div>
                            </Col>
                            <Col lg={3} sm={6} className='mt-2 mb-3'>
                                <div className='dash-card'>
                                    <h6>No of accounts</h6>
                                    <SemiCircleProgressBar percentage={15} background="#eee" stroke="#008080" strokeWidth="25"  />
                                    <span className="label">15%</span>

                                </div>
                            </Col>
                            <Col lg={3} sm={6} className='mt-2 mb-3'>
                                <div className='dash-card'>
                                    <h6>Average Resolution Time</h6>
                                    <SemiCircleProgressBar percentage={10} background="#eee" strokeWidth="25" 
                                        stroke="#0000FF" />
                                    <span className="label">15%</span>

                                </div>
                            </Col>
                            <Col lg={3} sm={6} className='mt-2 mb-3'>
                                <div className='dash-card'>
                                    <h6>Type Of Integration</h6>

                                    <SemiCircleProgressBar percentage={10} background="#eee" strokeWidth="25" 
                                        stroke="#808000" />

                                    <span className="label">20%</span>


                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col lg={6} sm={6} className='mb-3'>
                                <div className='contributor-card'>
                                    <h5>Integrations</h5>
                                    <Row className='mt-3 mb-3'>
                                        <Col sm={4}>
                                            <h4>
                                                Integration 1</h4>
                                        </Col>
                                        <Col sm={8}>
                                            <h6>65%</h6>
                                            <ProgressBar now={65} className='green_progrss' />
                                        </Col>
                                    </Row>
                                    <Row className='mt-3 mb-3'>
                                        <Col sm={4}>
                                            <h4>
                                                Integration 2</h4>
                                        </Col>
                                        <Col sm={8}>
                                            <h6>20%</h6>
                                            <ProgressBar now={65} className='purple_progrss' />
                                        </Col>
                                    </Row>
                                    <Row className='mt-3 mb-3'>
                                        <Col sm={4}>
                                            <h4>
                                                Integration 3</h4>
                                        </Col>
                                        <Col sm={8}>
                                            <h6>15%</h6>
                                            <ProgressBar now={40} className='red_progrss' />
                                        </Col>
                                    </Row>
                                    <Row className='mt-3 mb-3'>
                                        <Col sm={4}>
                                            <h4>
                                                Integration 4</h4>
                                        </Col>
                                        <Col sm={8}>
                                            <h6>9%</h6>
                                            <ProgressBar now={20} className='red_progrss' />
                                        </Col>
                                    </Row>

                                </div>
                            </Col>
                             
                            <Col lg={6} sm={6} className='mb-3'>
                                <div className='contributor-card'>
                                    <h5>Features</h5>
                                    <Row className='mt-3 mb-3'>
                                        <Col sm={4}>
                                            <h4>
                                                Feature 1</h4>
                                        </Col>
                                        <Col sm={8}>
                                            <h6>65%</h6>
                                            <ProgressBar now={80} className='green_progrss' />
                                        </Col>
                                    </Row>
                                    <Row className='mt-3 mb-3'>
                                        <Col sm={4}>
                                            <h4>
                                                Feature 2</h4>
                                        </Col>
                                        <Col sm={8}>
                                            <h6>20%</h6>
                                            <ProgressBar now={65} className='purple_progrss' />
                                        </Col>
                                    </Row>
                                    <Row className='mt-3 mb-3'>
                                        <Col sm={4}>
                                            <h4>
                                                Feature 3</h4>
                                        </Col>
                                        <Col sm={8}>
                                            <h6>15%</h6>
                                            <ProgressBar now={40} className='red_progrss' />
                                        </Col>
                                    </Row>
                                    <Row className='mt-3 mb-3'>
                                        <Col sm={4}>
                                            <h4>
                                                Feature 4</h4>
                                        </Col>
                                        <Col sm={8}>
                                            <h6>9%</h6>
                                            <ProgressBar now={20} className='red_progrss' />
                                        </Col>
                                    </Row>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Contributorsboard