import axios from "axios";
import { useState } from 'react';
import { saveAs } from "file-saver";
import { Modal, Button, Form , TabContainer, Tab, Tabs, Container, Navbar } from "react-bootstrap";
import { useParams } from "react-router-dom";


function UserDashboard() {
    const [texts, setTexts] = useState([]);
    const [email, SetEmail] = useState('');

    const {user} = useParams();

    const addEmail=(e)=> {
        e.preventDefault();
        let email = document.getElementById("email");
        SetEmail(email);
    }

    const addTexts=(e)=> {
        let arrays = document.getElementById('texts').value;
        setTexts(arrays);
        //console.log(texts);
    }

    const handleInput = async(e) => {
        e.preventDefault();
        console.log(texts);
        try {
            axios.defaults.headers.common["Authorization"]=localStorage.getItem('Authorization');
            const response = await axios.get("http://localhost:8280/v1/activation/user/getResumes", 
                
                {
                    params:{
                        "items":texts
                    },
                    headers:{
                        "Content-Type": "application/json"
                    },
                    responseType: "blob", // Important: Ensures binary data
                }
            );
        
            // Extract filename from headers (if provided)
            const disposition = response.headers["content-disposition"];
            let filename = "download.zip"; // Default name
            if (disposition) {
              const match = disposition.match(/filename="(.+?)"/);
              if (match?.[1]) filename = match[1];
            }
        
            // Create a blob and trigger a download
            const blob = new Blob([response.data], { type: "application/zip" });
            saveAs(blob, filename);
          } catch (error) {
            console.error("Error downloading file:", error);
          }
    }
    return(
        <>
            <h2>Hello {user}</h2>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter email: </Form.Label>
                    <Form.Control type="email" id="email" placeholder="name@example.com" onChange={addEmail}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control type="values" id="texts" onChange={addTexts}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleInput}>
                        Submit
                    </Button>
            </Form> 
        </>
    );
    
}

export default UserDashboard;