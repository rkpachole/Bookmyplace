import React from 'react'
import Sidebar from '../directives/sidebar'
import { Container, Row, Col, Table, ProgressBar, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CustomerData from './customer_predictions.json'


const colors = ["red", "green", "blue"]
function Customerboard() {
    console.log("CustomerDataCustomerData", CustomerData);
    return (
        <>
            <Sidebar />
            <div className='page-wrapper'>
                <div className="restaurant-panel-content">
                    <Container>
                        <div className='main-heading'>
                            <h2>Customer Board</h2>
                        </div>
                        <Row>
                            <Col lg={8}></Col>
                            <Col lg={4}>
                                <Row>
                                    <Col lg={4}>
                                        <h5>Filters :</h5>
                                    </Col>
                                    <Col lg={8}>
                                        {/* <div className='filter'> */}
                                        <Form.Select aria-label="Default select example">


                                            <option>Filter:</option>
                                            <option value="1">None</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                        {/* </div> */}
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={12}>
                                <div className="customer-table">

                                    <Table responsive>

                                        <thead>
                                            <tr>
                                                <th className='text-center'>Name</th>
                                                <th className='text-center'>Business Value</th>

                                                <th className='text-center'>Churn Risk</th>
                                                <th>CSM Sentiment</th>
                                                <th>Demography</th>
                                                <th>Renewal Date</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {CustomerData.map((items, index) => (
                                                <tr key={index}>
                                                    <td className='text-center'>{items.name}</td>
                                                    <td className='text-center'> {parseInt(items.BusinessValue.slice(1))}</td>

                                                    <td>
                                                        <div className='contributor-card'>
                                                            {items.Churn <= 26 ? <button className='listbuttonChurn' style={{ backgroundColor: "#50CD89" }}>{parseInt(items.Churn)}%</button>
                                                                : items.Churn < 41 ? <button className='listbuttonChurn' style={{ backgroundColor: "#F1EA41" }}>{parseInt(items.Churn)}%</button> :
                                                                    <button className='listbuttonChurn' style={{ backgroundColor: "#F1416C" }}>{parseInt(items.Churn)}%</button>}
                                                            {/* <button className='listbuttonChurn'>{parseInt( items.Churn)}%</button> */}
                                                            {/* <ProgressBar now={items.Churn} className='green_progrss' /> */}
                                                        </div>
                                                    </td>

                                                    <td >

                                                        {(items.cms == 'veryhappy' || items.cms == 'happy') ?
                                                            <button className='listbuttoncms' style={{ backgroundColor: "#50CD89" }}>{items.cms}</button>
                                                            : items.cms == 'neutral' ? <button className='listbuttoncms' style={{ backgroundColor: "#F1EA41" }}>{items.cms}</button>
                                                                : <button className='listbuttoncms' style={{ backgroundColor: "#F1416C" }}>{items.cms}</button>}



                                                    </td>
                                                    {/* 
                                                    <td>

                                                        {items.cms == 'veryhappy' ? <span className='veryhappy-btn' >veryhappy</span> : ""}
                                                        {items.cms == 'happy' ? <span className='veryhappy-btn'>happy</span> : ""}
                                                        {items.cms == 'unhappy' ? <span className='unhappy-btn'>unhappy</span> : ""}
                                                        {items.cms == 'veryunhappy' ? <span className='unhappy-btn'>veryunhappy</span> : ""}
                                                        {items.cms == 'neutral' ? <span className='neutral-btn'>neutral</span> : ""}
                                                    </td> */}
                                                    <td className='text-center'>{items.Demography}</td>

                                                    <td>{items.RenewalDate}</td>
                                                    <td><Link to={'/view-more/' + items.id}>View More</Link></td>
                                                </tr>
                                            ))}


                                            {/* <tr>
                                                <td>Customer 1</td>
                                                <td>$ 8,000,000</td>
                                                <td>High Business Value</td>
                                                <td>
                                                    <div className='contributor-card'>
                                                        <h6>65%</h6>
                                                        <ProgressBar now={80} className='green_progrss' />
                                                    </div>
                                                </td>
                                                <td>United States</td>
                                                <td>10/12/2024</td>
                                                <td><Link to='/view-more'>View</Link></td>
                                            </tr>
                                            <tr>
                                                <td>Customer 1</td>
                                                <td>$ 8,000,000</td>
                                                <td>High Business Value</td>
                                                <td>
                                                    <div className='contributor-card'>
                                                        <h6>65%</h6>
                                                        <ProgressBar now={80} className='green_progrss' />
                                                    </div>
                                                </td>
                                                <td>United States</td>
                                                <td>10/12/2024</td>
                                                <td><Link to='/view-more'>View</Link></td>
                                            </tr>
                                            <tr>
                                                <td>Customer 1</td>
                                                <td>$ 8,000,000</td>
                                                <td>High Business Value</td>
                                                <td>
                                                    <div className='contributor-card'>
                                                        <h6>65%</h6>
                                                        <ProgressBar now={80} className='green_progrss' />
                                                    </div>
                                                </td>
                                                <td>United States</td>
                                                <td>10/12/2024</td>
                                                <td><Link to='/view-more'>View</Link></td>
                                            </tr>
                                            <tr>
                                                <td>Customer 1</td>
                                                <td>$ 8,000,000</td>
                                                <td>High Business Value</td>
                                                <td>
                                                    <div className='contributor-card'>
                                                        <h6>65%</h6>
                                                        <ProgressBar now={80} className='green_progrss' />
                                                    </div>
                                                </td>
                                                <td>United States</td>
                                                <td>10/12/2024</td>
                                                <td><Link to='/view-more'>View</Link></td>
                                            </tr>
                                            <tr>
                                                <td>Customer 1</td>
                                                <td>$ 8,000,000</td>
                                                <td>High Business Value</td>
                                                <td>
                                                    <div className='contributor-card'>
                                                        <h6>65%</h6>
                                                        <ProgressBar now={80} className='green_progrss' />
                                                    </div>
                                                </td>
                                                <td>United States</td>
                                                <td>10/12/2024</td>
                                                <td><Link to='/view-more'>View</Link></td>
                                            </tr>
                                            <tr>
                                                <td>Customer 1</td>
                                                <td>$ 8,000,000</td>
                                                <td>High Business Value</td>
                                                <td>
                                                    <div className='contributor-card'>
                                                        <h6>65%</h6>
                                                        <ProgressBar now={80} className='green_progrss' />
                                                    </div>
                                                </td>
                                                <td>United States</td>
                                                <td>10/12/2024</td>
                                                <td><Link to='/view-more'>View</Link></td>
                                            </tr>
                                            <tr>
                                                <td>Customer 1</td>
                                                <td>$ 8,000,000</td>
                                                <td>High Business Value</td>
                                                <td>
                                                    <div className='contributor-card'>
                                                        <h6>65%</h6>
                                                        <ProgressBar now={80} className='green_progrss' />
                                                    </div>
                                                </td>
                                                <td>United States</td>
                                                <td>10/12/2024</td>
                                                <td><Link to='/view-more'>View</Link></td>
                                            </tr>
                                            <tr>
                                                <td>Customer 1</td>
                                                <td>$ 8,000,000</td>
                                                <td>High Business Value</td>
                                                <td>
                                                    <div className='contributor-card'>
                                                        <h6>65%</h6>
                                                        <ProgressBar now={80} className='green_progrss' />
                                                    </div>
                                                </td>
                                                <td>United States</td>
                                                <td>10/12/2024</td>
                                                <td><Link to='/view-more'>View</Link></td>
                                            </tr> */}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Customerboard