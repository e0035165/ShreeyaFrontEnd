import axios from "axios";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setUsername] = useState('');
  const [pass, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const nav = useNavigate();

  const handleUser=()=> {
    setUsername(document.getElementById('username').value);
  }

  const handlePass=()=> {
    setPassword(document.getElementById('password').value);
  }

  const handleEmail=()=> {
    setEmail(document.getElementById('email').value);
  }

  const sendUserActivation = async(e) => {
    e.preventDefault();
    try {
        const url = "http://localhost:8280/v1/frontPage/signup"; // Replace with your API endpoint
    
        // const params = {
        //   userId: 123,
        //   action: "create",
        // };
    
        // const headers = {
        //   "Content-Type": "application/json",
        //   Authorization: "Bearer your-token-here", // Replace with actual token
        // };
    
        const body = {
          username: name,
          email: Email,
          password: pass,
        };
    
        const response = await axios.post(url, body);
    
        console.log("Response:", response.data);
        if(response.status===201) {
            localStorage.setItem('role','ROLE_USER');
            nav("/two_fa_authorization");
        }
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
      }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Set Username: </Form.Label>
              <Form.Control
                id="username"
                type="username"
                placeholder="username"
                autoFocus
                onChange={handleUser}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Label>Set Password: </Form.Label>
              <Form.Control 
                type="password"
                id="password"
                autoFocus
                onChange={handlePass}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput3"
            >
              <Form.Label>Email: </Form.Label>
              <Form.Control 
                type="email"
                id="email"
                placeholder="name@example.com"
                autoFocus
                onChange={handleEmail}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendUserActivation}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignUp;