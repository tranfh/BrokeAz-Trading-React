import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function Navigation() {
  return (
    <div className="navbar">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">BrokeAz Trading</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">News</Nav.Link>
              <Nav.Link href="#link">Insiders</Nav.Link>
              <Nav.Link href="#link">Futures</Nav.Link>
              <Nav.Link href="#link">Forex</Nav.Link>
              <Nav.Link href="#link">Crypto</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
