
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Display() {
    const [resp, setResp] = useState([]);
  const [display, setDisplay] = useState(false);
  const navigate  = useNavigate();

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


    return(
        <div className="flex items-center justify-center">
          <ul>
            {resp.map((entry) => (
              <li key={entry.title}> Title of the resume is {entry.title} with filepath {entry.relative_file_name}</li>
            ))}
          </ul>
          <div>
              <button className="bg-black text-red-500 text-lg px-6 py-3 rounded-lg hover:bg-gray-800" type="submit" onClick={()=>{setDisplay(false)}} value="Clear"/>
            </div>
        </div>
    );
}


export default Display;