import axios from "axios";
import { Modal, Button, Form , TabContainer, Tab, Tabs, Container, Navbar } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function SignIn() {
    const [key, setKey] = useState("user");
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [role,setRole] = useState('');

    const navigate = useNavigate();

    const handleUser = async(e) => {
        e.preventDefault();
        let username = document.getElementById("user-username").value;
        setUser(username);
    }

    const handlePass = async(e) => {
        e.preventDefault();
        let password = document.getElementById("user-password").value;
        setPass(password);
    }

    const handleEmail = async(e) => {
        e.preventDefault();
        let email = document.getElementById("user-email").value;
        setEmail(email);
        setRole('ROLE_USER');
    }

    const handleAUser = async(e) => {
        e.preventDefault();
        let username = document.getElementById("admin-username").value;
        setUser(username);
    }

    const handleAPass = async(e) => {
        e.preventDefault();
        let password = document.getElementById("admin-password").value;
        setPass(password);
    }

    const handleAEmail = async(e) => {
        e.preventDefault();
        let email = document.getElementById("admin-email").value;
        setEmail(email);
        setRole('ROLE_ADMIN');

    }


    const userSubmission = async(e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8280/v1/frontPage/login"; // Replace with your API endpoint
        
            // const params = {
            //   userId: 123,
            //   action: "create",
            // };
        
            // const headers = {
            //   "Content-Type": "application/json",
            //   Authorization: "Bearer your-token-here", // Replace with actual token
            // };
        
            const body = {
              username: user,
              email: email,
              password: pass,
            };
            console.log(body);
            const response = await axios.post(url, body);
        
            console.log("Response:", response.data);
            if(response.status===200) {

                localStorage.setItem('Authorization', response.data['jwt']);
                localStorage.setItem('role', role);
                console.log(localStorage.getItem('Authorization'))
                navigate("/two_fa_authorization");
            }
          } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
          }
    }

    const adminSubmission = async(e) => {
        
    }

    const githubLogin = async(e) => {
        window.location.href="https://github.com/login/device";
        
    }

    const handleKey = (selectedKey) => {
        setKey(selectedKey);
        console.log("Key selected is "+selectedKey);
    }

    

    return (
        <div>
        <Container>
            <Navbar>
            <Tabs
                ActiveKey={key}
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={handleKey}
            >
                <Tab eventKey="user" title="User">
                    
                </Tab>
                <Tab eventKey="admin" title="Admin">
                    
                </Tab>
                <Tab eventKey="github" title="github">
                    
                </Tab>
            </Tabs>
            </Navbar>
            
        </Container>
        <br></br>

        {
            key==="user" &&
            <Container>
                <Form id="User">
                    <Form.Group className="mb-3">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control type="text" id="user-username" onChange={handleUser}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" id="user-password" onChange={handlePass}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="text" id="user-email" onChange={handleEmail}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={userSubmission}>
                        Submit
                    </Button>
                </Form>
            </Container>
        }

        {
            key==="admin" &&
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Admin-Username: </Form.Label>
                        <Form.Control type="text" id="admin-username" placeholder="username" onChange={handleAUser}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Admin-Password: </Form.Label>
                        <Form.Control type="password"  id="admin-password" onChange={handleAPass}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="text" id="admin-email" onChange={handleAEmail}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={userSubmission}>
                        Submit
                    </Button>
                </Form>
            </Container>
        }

        {
            key==="github" &&
            
            <Button value="Github Login" onClick={githubLogin}/>
        }
        
        </div>
    );
}

export default SignIn;