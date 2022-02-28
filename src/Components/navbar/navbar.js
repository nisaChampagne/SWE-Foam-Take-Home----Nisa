import React from 'react';
import { Navbar,Container,Nav } from 'react-bootstrap';


const NavBar = ( ) => (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Take Home Assignment -- Nisa</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="https://nisa-champagne.xyz/">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default NavBar;