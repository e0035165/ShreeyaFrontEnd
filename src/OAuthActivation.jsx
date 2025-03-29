

import axios from "axios";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";




function OAuthActivation() {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const handleUser = () => {
        setUser(document.getElementById('username').value);
    }

    const handlePass = () => {
        setPass(document.getElementById('password').value);
    }

    const handleToken= () => {
        setToken(document.getElementById('token').value);
        //console.log(token);
    }

    const tokenCall=async(e) => {
        e.preventDefault();
        try {
            axios.defaults.headers.common["Authorization"]=localStorage.getItem('Authorization');
            const url = "http://localhost:8280/v1/activation/"; // Replace with your API endpoint
            //console.log(token);
            // const params = {
            //   userId: 123,
            //   action: "create",
            // };
        
            const api_headers = {
              "Content-Type": "application/json",
              Authorization: token, // Replace with actual token
            };
            console.log(api_headers);
            const body = {
              username: user,
              password: pass
            };
        
            const response = await axios.post(url, body, {
                headers: api_headers,
                params: {
                    'role': localStorage.getItem('role')
                }
            });
        
            console.log("Response:", response.data);
            if(response.status===200) {
                localStorage.setItem("Authorization", token);
                localStorage.setItem("user",user);
                console.log("Completed");
                console.log(response.data.authority);
                if(response.data.authority==='ROLE_ADMIN') {
                    navigate("/Dashboard/admin/"+user);
                } else {
                    navigate("/Dashboard/user/"+user);
                }
            }
          } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
          }
    }
    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="username" placeholder="username" id="username" onChange={handleUser}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" id="password" onChange={handlePass}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Token: </Form.Label>
                    <Form.Control type="token" id="token" placeholder="token" onChange={handleToken}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={tokenCall}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
};


export default OAuthActivation;