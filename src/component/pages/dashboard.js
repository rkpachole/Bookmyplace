import React, { useState } from "react";
import Sidebar from "../directives/sidebar";
import { Container, Row, Col, ProgressBar, Form } from "react-bootstrap";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import "../../assets/css/style.css";
function Dashboard() {
  const [selectedValue, setSelectedValue] = useState("business");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  console.log("====================================", selectedValue);

  return (
    <>
      <Sidebar />
      <div className="page-wrapper">
        <div className="restaurant-panel-content">
          <Container>
            <div className="main-heading">
              <h2>VP Board</h2>
            </div>
            <Row>
              <Col lg={8}></Col>
              <Col lg={4}>
                <Row>
                  <Col lg={4}>
                    <h6>Filter</h6>
                  </Col>
                  <Col lg={8}>
                    <div className="filter">
                      <select
                        aria-label="Default select example"
                        value={selectedValue}
                        onChange={handleSelectChange}
                      >
                        {/* <option value="">Select...</option> */}
                        <option value="demography">Demography</option>
                        <option value="business">Business Value</option>
                      </select>

                      {/* <label>Filter</label>
                      <Form.Select aria-label="Default select example">
                        <option>Filter:</option>
                        <option value="1">None</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select> */}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            {selectedValue == "business" ? (
              <Row>
                <Col lg={4} sm={6} className="mb-3">
                  <div className="dash-card">
                    <h6>High Business Value</h6>
                    <SemiCircleProgressBar
                      percentage={25}
                      strokeWidth="25"
                      background="#eee"
                      stroke="#800000"
                      style={{ borderRadius: "10px" }}
                    />
                    {/* <ProgressBar now={65} className='half-arc' /> */}
                    <span className="label">25%</span>
                    <h6 className="risk-bg">Risk</h6>
                    <p>Amount at risk</p>

                    <h1>$ 500,000</h1>
                  </div>
                </Col>
                <Col lg={4} sm={6} className="mb-3">
                  <div className="dash-card">
                    <h6>Mid Business Value</h6>
                    <SemiCircleProgressBar
                      percentage={15}
                      background="#eee"
                      stroke="#00FF00"
                      strokeWidth="25"
                    />
                    <span className="label">15%</span>
                    <h6 className="risk-bg">Risk</h6>
                    <p>Amount at risk</p>
                    <h1>$ 100,000</h1>
                  </div>
                </Col>
                <Col lg={4} sm={6} className="mb-3">
                  <div className="dash-card">
                    <h6>Low Business Value</h6>
                    <SemiCircleProgressBar
                      percentage={55}
                      background="#eee"
                      stroke="#0000FF"
                      strokeWidth="25"
                    />
                    <span className="label">55%</span>
                    <h6 className="risk-bg">Risk</h6>
                    <p>Amount at risk</p>
                    <h1>$ 10,000</h1>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col lg={4} sm={6} className="mb-3">
                  <div className="dash-card">
                    <h6>LATAM</h6>
                    <SemiCircleProgressBar
                      percentage={25}
                      strokeWidth="25"
                      background="#eee"
                      stroke="#800000"
                      style={{ borderRadius: "10px" }}
                    />
                    {/* <ProgressBar now={65} className='half-arc' /> */}
                    <span className="label">25%</span>
                    <h6 className="risk-bg">Risk</h6>
                    <p>Amount at risk</p>

                    <h1>$ 500,000</h1>
                  </div>
                </Col>
                <Col lg={4} sm={6} className="mb-3">
                  <div className="dash-card">
                    <h6>APAC</h6>
                    <SemiCircleProgressBar
                      percentage={15}
                      background="#eee"
                      stroke="#00FF00"
                      strokeWidth="25"
                    />
                    <span className="label">15%</span>
                    <h6 className="risk-bg">Risk</h6>
                    <p>Amount at risk</p>
                    <h1>$ 100,000</h1>
                  </div>
                </Col>
                <Col lg={4} sm={6} className="mb-3">
                  <div className="dash-card">
                    <h6>EMEA</h6>
                    <SemiCircleProgressBar
                      percentage={55}
                      background="#eee"
                      stroke="#0000FF"
                      strokeWidth="25"
                    />
                    <span className="label">55%</span>
                    <h6 className="risk-bg">Risk</h6>
                    <p>Amount at risk</p>
                    <h1>$ 10,000</h1>
                  </div>
                </Col>
                <Col lg={4} sm={6} className="mb-3">
                  <div className="dash-card">
                    <h6>North American</h6>
                    <SemiCircleProgressBar
                      percentage={55}
                      background="#eee"
                      stroke="#0000FF"
                      strokeWidth="25"
                    />
                    <span className="label">55%</span>
                    <h6 className="risk-bg">Risk</h6>
                    <p>Amount at risk</p>
                    <h1>$ 10,000</h1>
                  </div>
                </Col>
              </Row>
            )}
          </Container>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
