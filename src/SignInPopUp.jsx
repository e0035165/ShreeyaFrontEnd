import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SignInPopUp() {
  const [show, setShow] = useState(false);
  const [user, setUsername] = useState('');
  const [pass, setPassword] = useState('');
  const [em, setEmail] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlingOfSignIn = async(e) => {
    e.preventDefault();
    try {
        const url = "http://localhost:8280/v1/frontPage/signin"; // Replace with your API endpoint
    
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
    
        const response = await axios.post(url, body);
    
        console.log("Response:", response.data);
        if(response.status===200) {
            navigate("/two_fa_authorization");
        } else {
            
        }
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label for="username">Username: </label>
            <input type="text" id="username" name="username" onInput={setUsername}></input>
            <label for="password">Password: </label>
            <input type="password" id="password" name="password" onInput={setPassword}></input>
            <label for="email">Email: </label>
            <input type="text" id="email" name="email" onInput={setEmail}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handlingOfSignIn}>Login</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignInPopUp;