

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

function FrontPage() {


    return(
        <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
            <Container>
                <Navbar.Brand href="#home">Resume Builder Homepage</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}


export default FrontPage;