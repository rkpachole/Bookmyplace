import React, { useEffect, useState } from "react";
import Sidebar from "../directives/sidebar";
import { Col, Container, Row, Form, Table } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import CustomerData from "./customer_predictions.json";

function Viewmore() {
  // const[Integration1,setIntegration1]=useState(null)
  // const { id } = useParams();
  // console.log('ID:', id);
  // const customerData = CustomerData.find((customer) => customer.id == id);
  // console.log(" iddata",customerData);
  // // setIntegration1(customerData.Integration1)

  const { id } = useParams();
  const [integration1, setIntegration1] = useState(null);
  const [integration2, setIntegration2] = useState(null);
  const [AverageResolutionTime, setAverageResolutionTime] = useState(null);
  const [AverageResolution, setAverageResolution] = useState(null);
  const [Feature1, setFeature1] = useState(null);
  const [Feature2, setFeature2] = useState(null);
  const [DailyUsage, setDailyUsage] = useState(null);
  const [DailyUsage1, setDailyUsage1] = useState(null);
  const [LoginFrequency, setLoginFrequency] = useState(null);
  const [LoginFrequency1, setLoginFrequency1] = useState(null);
  const [Demography, setDemography] = useState(null);
  const [Industry, setIndustry] = useState(null);
  const [RenewalDate, setRenewalDate] = useState(null);
  const [cms, setcms] = useState(null);
  const [sentiment, setSentiment] = useState(false);

  useEffect(() => {
    console.log("ID:", id);
    const customerData = CustomerData.find((customer) => customer.id == id);
    console.log("iddata", customerData);
    if (customerData) {
      setIntegration1(customerData.Integration1);
      setIntegration2(customerData.Integration2);
      setAverageResolutionTime(customerData.AverageResolutionTime);
      setAverageResolution(customerData.AverageResolution);
      setFeature2(customerData.Feature2);
      setFeature1(customerData.Feature1);
      setDailyUsage(customerData.DailyUsage);
      setDailyUsage1(customerData.DailyUsage1);
      setLoginFrequency(customerData.LoginFrequency);
      setLoginFrequency1(customerData.LoginFrequency1);
      setDemography(customerData.Demography);
      setIndustry(customerData.Industry);
      setRenewalDate(customerData.RenewalDate);
      setcms(customerData.cms);
    }
  }, [id]);
  const handleSelectChange = (event) => {
    setcms(event.target.value);
  };

  const handleSentiment = () => {
    setSentiment(!sentiment);
  };
  const capitalize = (str) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <Sidebar />
      <div className="page-wrapper">
        <div className="restaurant-panel-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="company-view">
                  <h3>Company XYZ</h3>
                  <Row>
                    <Col sm={4}>
                      <h5>
                        Demographic : <span>{Demography}</span>
                      </h5>
                    </Col>
                    <Col sm={4}>
                      <h5>
                        Renewal Data : <span>{RenewalDate}</span>
                      </h5>
                    </Col>
                    <Col sm={4}>
                      <h5 className="text-center">
                        Product Used :{" "}
                        <span>Subscription Management, Tax Compliance</span>
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4}>
                      <h5>
                        Industry : <span>{Industry}</span>
                      </h5>
                    </Col>
                    <Col sm={4}>
                      <h5>
                        No of account : <span>32</span>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <div className="Churn-Risk">
              <div className="view-table">
                <tr>
                  <td>
                    <h6>Churn Risk : 65%</h6>
                  </td>
                  <td>
                    <span>Churn Contributors:</span>
                  </td>
                  <td>
                    <button className="btn btn-danger">
                      {capitalize(cms)}
                    </button>
                  </td>
                  {sentiment ? (
                    <td>
                      <label>Select an option:</label>
                      <select value={cms} onChange={handleSelectChange}>
                        <option value="neutral">Neutral </option>
                        <option value="happy">Happy</option>
                        <option value="very happy">Very Happy</option>
                        <option value="sad">Sad </option>
                        <option value="very sad">Very Sad</option>
                      </select>
                    </td>
                  ) : (
                    ""
                  )}

                  {sentiment ? (
                    ""
                  ) : (
                    <td>
                      <span onClick={handleSentiment}>Change It</span>
                    </td>
                  )}
                </tr>
              </div>
              <Row>
                <Col lg={7}>
                  <div className="view-table">
                    <Table responsive>
                      <tbody>
                        <tr>
                          <td>Integration</td>
                          <td>{integration1}</td>
                          <td>{integration2}%</td>
                        </tr>

                        <tr>
                          <td>Average Resolution Time</td>
                          <td>{AverageResolutionTime}</td>
                          <td>{AverageResolution}%</td>
                        </tr>
                        <tr>
                          <td>Feature</td>
                          <td>{Feature1}</td>
                          <td>{Feature2}%</td>
                        </tr>
                        <tr>
                          <td>Daily Usage</td>
                          <td>{DailyUsage}</td>
                          <td>{DailyUsage1}%</td>
                        </tr>
                        <tr>
                          <td>Login Frequency</td>
                          <td>{LoginFrequency}</td>
                          <td>{LoginFrequency1}%</td>
                        </tr>
                        {/* // ))} */}
                      </tbody>
                    </Table>
                  </div>
                </Col>
                <Col lg={5}>
                  <div className="view-text">
                    <h6>
                      Most Recent Made Comments
                      <br /> by CSM
                    </h6>
                    <ul>
                      <li>
                        {" "}
                        The client has been very responsive and enthusiastic
                        about trying out new features in our product.
                      </li>
                      <li>
                        The client has been experiencing some challenges with
                        using our software, but they've been very proactive
                        about reaching out to our support team for help. We're
                        working closely with them to find solutions and improve
                        their experience.
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Viewmore;
