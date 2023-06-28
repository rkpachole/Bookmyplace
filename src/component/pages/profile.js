import React, { useEffect, useState } from 'react'
import Sidebar from '../directives/sidebar'
import { Container, Row, Col, Form, Modal, Button } from 'react-bootstrap'
import profile from '../../assets/images/Vector.png'
import { Link } from 'react-router-dom'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'

function Profile() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   const[username,setUsername]=useState("")
   const[password,setPassword]=useState("")
   const[designation ,setDesignation]=useState([])
   const[firstname,setFirstname]=useState([])
   const[company,setCompany]=useState([])
   
   const[userimg,setImageuser]=useState([])
   const[retypePassword, setRetypePassword]=useState("")


useEffect(()=>{
    profiledata()
},[])

const profiledata = () =>{
    const id = localStorage.getItem('userId')
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
     fetch(`https://sahadev.techpanda.art/profile/${id}`, {
        method: 'GET',
        // credentials: 'include',
        headers: headers,
    })
        .then((Response) => Response.json())
        .then((Response) => {
            // myBooking()
            // toast.success("Delete Successfully")
            console.log(Response);
            setUsername(Response.username)
            setDesignation(Response.designation)
            // setPassword(Response.password)
            setFirstname(Response.first_name)
            setImageuser(Response.userimg)
            setCompany(Response.company_name)

        })
        .catch((error) => {
            console.error("ERROR FOUND---->>>>" + error);
        })

}





const UpdateProfile =(e) =>{

   
    const id = localStorage.getItem('userId')

    e.preventDefault();


       if(password === retypePassword){
       
    var formData = new FormData();
    // formData.append('username', username);
    formData.append('designation', designation);
    formData.append('password', password);
    formData.append('first_name', firstname);
    // formData.append('userimg', userimg);

    axios({
        method: "patch",
        url: `https://sahadev.techpanda.art/profile/${id}/`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then(response => {
            toast.success(" New password updatesuccessfully");
           
            console.log("respo",response);
        })
        .catch(error => {
            console.log(error);
        });
    }
    else{
        toast.error("New password and retype-password not match")
    }
}
const handlePassword =(e)=>{
    setPassword(e.target.value);
    // console.log(password);
}
console.log("passwordpassword", password);


const handleRetypePassword =(e)=>{
    if(password){
        setRetypePassword(e.target.value);
    }
}
console.log( "retypePasswordretypePassword",retypePassword);
    return (
        <>
        <Toaster/>
            <Sidebar />
            <div className='page-wrapper'>
                <div className="restaurant-panel-content">

                    <Container>
                        <div className='main-heading'>
                            <h2>Profile</h2>
                        </div>
                        <Row>
                            <Col lg={2}>
                                <div className="profile-pic">
                                    <img src={"http://sahadev.techpanda.art"+userimg} />
                                    <input className="hidden" type="file" />
                                    <div style={{ color: '#999' }}></div>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <h5>{username}</h5>
                                <h6>{designation}</h6>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col lg={8}>
                                <Form >
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter name" value={firstname}/>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>User Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter username" value={username} />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Designation</Form.Label>
                                            <Form.Control type="text" placeholder="Enter designation" value={designation} />
                                        </Form.Group>

                                      

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" value={password}/>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Compaany</Form.Label>
                                            <Form.Control type="text" placeholder="company" value={company}/>
                                        </Form.Group>
                                    </Row>
                                   
                                </Form>
                                <div className='profile-edit'>
                                    <Link onClick={handleShow}><i className="fa fa-pencil" /> Edit Details</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} className='edit-model'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group controlId="formGridEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={firstname} placeholder="Enter name" readOnly/>
                        </Form.Group>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" value={username} placeholder="Enter username"  readOnly/>
                        </Form.Group>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={password}  onChange={(e)=>handlePassword(e)}/>
                        </Form.Group>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label>Re-Type New Password</Form.Label>
                            <Form.Control type="text" value={retypePassword} placeholder="Enter re-type new password"  
                            onChange={(e)=>handleRetypePassword(e)} />
                        </Form.Group><br/>
                        <span id = "message2"> </span>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={UpdateProfile}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        cancel
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Profile