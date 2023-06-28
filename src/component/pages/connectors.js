import React from 'react'
import Sidebar from '../directives/sidebar'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import image1 from '../../assets/images/image 3.png'
import image2 from '../../assets/images/mixpanel-seeklogo.com 1 (1).png'
import image3 from '../../assets/images/hubspot-seeklogo.com 1.png'
import image4 from '../../assets/images/salesforca-seeklogo.com 1.png'
import image5 from '../../assets/images/image-removebg-preview 1.png'


const Connectors = () => {
    return (
        <>
            <Sidebar />
            <div className='page-wrapper'>
                <div className="restaurant-panel-content">
                    <Container>
                        <div className='main-heading'>
                            <h2>Connectors</h2>
                        </div>
                        <Row>

                            <Col lg={6} sm={6} className='mt-4 mb-3 '>
                                <div className='imagecard'>
                                    <img src={image1} alt="..." />
                                    <h3>Not Connected</h3>

                                </div>
                            </Col>

                            <Col lg={6} sm={6} className='mt-4 mb-3 '>
                                <div className='imagecard'>
                                    <img src={image2} alt="..." />
                                    <h3>Not Connected</h3>


                                </div>
                            </Col>
                            <Col lg={6} sm={6} className='mt-4 mb-3 '>
                                <div className='imagecard'>
                                    <img src={image3} alt="..." />
                                    <h3>Not Connected</h3>


                                </div>
                            </Col>
                            <Col lg={6} sm={6} className='mt-4 mb-3 '>
                                <div className='imagecard'>
                                    <img src={image4} alt="..." />
                                    <h3>Not Connected</h3>


                                </div>
                            </Col>
                            <Col lg={6} sm={6} className='mt-4 mb-3 '>
                                <div className='imagecard'>
                                    <img src={image5} alt="..." />
                                    <h3>Not Connected</h3>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>)
}

export default Connectors