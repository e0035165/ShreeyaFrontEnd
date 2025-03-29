import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Display from "./Display"

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [resp, setResp] = useState([]);
  const [display, setDisplay] = useState(false);
  const navigate  = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const showAllResults = async(e) => {
    e.preventDefault();
        try {
            axios.defaults.headers.common["Authorization"]=localStorage.getItem('Authorization');
            const url = "http://localhost:8280/v1/activation/admin/getAllResumes"; // Replace with your API endpoint
            //console.log(token);
            // const params = {
            //   userId: 123,
            //   action: "create",
            // };
        
            const api_headers = {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem('Authorization'), // Replace with actual token
            };
            console.log(api_headers);
        
            const response = await axios.get(url, {
                headers: api_headers,
            });
        
            console.log("Response:", response.data);
            if(response.status===200) {
                setResp(response.data);
                setDisplay(true);
            }
          } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
          }
  }

  const handleClear = async(e) => {
        e.preventDefault();
        try {
            axios.defaults.headers.common["Authorization"]=localStorage.getItem('Authorization');
            const url = "http://localhost:8280/v1/activation/admin/clearAllResumes"; // Replace with your API endpoint
            //console.log(token);
            // const params = {
            //   userId: 123,
            //   action: "create",
            // };
        
            const api_headers = {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem('Authorization'), // Replace with actual token
            };
            console.log(api_headers);
        
            const response = await axios.delete(url, {
                headers: api_headers,
            });
        
            console.log("Response:", response.data);
            if(response.status===200) {
                setResp(response.data);
                setDisplay(true);
            }
          } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
          }
  }
  const Logout = () => {
    console.log("Logout");
    localStorage.removeItem('Authorization');
    localStorage.removeItem('user');
    navigate('/Welcome');
  }

  const handleUpload = async () => {
    if (!file || !title) {
      alert("Please select a file and enter a title!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    try {
      const response = await fetch("http://localhost:8280/v1/activation/admin/resume/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": localStorage.getItem('Authorization')
        }
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="container">
      <input type="text" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={Logout}>Logout</button>
      <button onClick={showAllResults}>Show results</button>
      <button onClick={()=>{
        setDisplay(false);
        }}>Clear results</button>
      <button onClick={handleClear}>Clear Database</button>


      {
        display &&
        
        <div className="flex items-center justify-center">
        <ul>
          {resp.map((entry) => (
            <li key={entry.title}> Title of the resume is {entry.title} with filepath {entry.relative_file_name}</li>
          ))}
        </ul>
      </div>
      }
    </div>
  );
};

export default FileUpload;
