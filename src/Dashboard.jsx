import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, useParams } from 'react-router-dom';
import FileUpload from './FileUpload';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';


function Dashboard() {
    const {user} = useParams();
    const navigate = useNavigate();

    return (
        <>
        <FileUpload/>
        {/* <div>
            <Button id="logout" type="submit" onClick={Handlelogout}/>
        </div> */}
        </>

    );



}

export default Dashboard;