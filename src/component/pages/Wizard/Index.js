import React, { useState } from "react";
import Sidebar from "../../directives/sidebar";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { BsClipboard } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

function Wizard() {
  const [formData, setFormData] = useState({
    to: "",
    compant: "",
    purpose: "",
    tone: "",
  });

  const [isCopied, setIsCopied] = useState(false);
  const [editText, setEditText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditText(editText);
  };
  const handleEditClick = () => {
    setIsEditing(true);
    setEditText(editText);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditTextChange = (event) => {
    setEditText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
    setEditText(editText);
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(editText)
      .then(() => setIsCopied(true))
      .catch((error) => console.error("Failed to copy text: ", error));
  };
  return (
    <>
      <Sidebar />
      <div className="page-wrapper">
        <div className="restaurant-panel-content">
          <Container>
            <div className="main-heading">
              <h2>The Wizard</h2>
            </div>
            <Row>
              <Col xs={6}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="firstName">
                    <Form.Label>TO</Form.Label>
                    <Form.Control
                      type="text"
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="lastName">
                    <Form.Label>Comapny Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.comapny}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Purpose</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.purpose}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Tone</Form.Label>
                    <Form.Control
                      type="text"
                      name="password"
                      value={formData.tone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button type="submit" className="buttonStyle">
                    Generate
                  </Button>
                </Form>
              </Col>
              <Col xs={6}>
                <Form>
                  <Form.Group controlId="editText">
                    <button className="shift-right">
                      {" "}
                      <AiOutlineHeart />
                      Saved
                    </button>
                    <Form.Label>Edit Text</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={13}
                      value={editText}
                      onChange={handleEditTextChange}
                    />
                  </Form.Group>
                  <div className="button-text">
                    <button className="copytext-btn" onClick={handleCopyClick}>
                      <BsClipboard /> Copy Text
                    </button>
                    {isCopied && <p>Text copied to clipboard!</p>}

                    <button className="edit-btn" onClick={handleEditClick}>
                      <BsPencilSquare /> Edit
                    </button>

                    <button className="btn-saved" onClick={handleSaveClick}>
                      <AiOutlineHeart />
                      Saved
                    </button>
                  </div>
                </Form>
                <p>Edited Text: {editText}</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Wizard;
