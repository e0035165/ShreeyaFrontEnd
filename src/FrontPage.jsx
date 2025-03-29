

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import React, { useRef } from "react";
import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import { Navbar, Nav, NavDropdown, Container, Form , Button} from "react-bootstrap";

function FrontPage() {
    const [details, setDetails] = useState([]);
    const [startAt, setStartAt] = useState(0);
    const [pagination, setPagination] = useState(5);

    const getDetails = async(e) => {
        e.preventDefault();
        axios(
            {
                method:'get',
                baseURL:'http://localhost:8280',
                url:'/resume/details',
                params: {
                    start: startAt,
                    pagination: pagination
                }
            }
        );
    }


    return(
    <div>
        <div>
        <Navbar expand="lg" className="bg-primary text-light p-4">
            <Container fluid>
                <Navbar.Brand href="#">Resume Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/signin">Sign-In</Nav.Link>
                    <Nav.Link href="/signup">Sign-Up</Nav.Link>
                    <NavDropdown title="About-Us" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/Contacts">Contacts</NavDropdown.Item>
                    <NavDropdown.Item href="/assistance">
                        Assistance
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/portfolio">
                        portfolio
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/others">
                        others
                    </NavDropdown.Item>
                    </NavDropdown>
                    
                </Nav>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button className="fs-3 fw-bold text-dark" variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </div>
    </div>

        

    );
}


export default FrontPage;