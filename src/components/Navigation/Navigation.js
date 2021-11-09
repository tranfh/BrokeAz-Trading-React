import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Navigation() {
  return (
    <div className="navbar">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">BrokeAz Trading</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="news">
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link href="news">
                <Link to="/news">News</Link>
              </Nav.Link>
              <Nav.Link href="insider">
                <Link to="/insiders">Insiders</Link>
              </Nav.Link>
              <Nav.Link href="#link">
                <Link to="/#futures">Futures</Link>
              </Nav.Link>
              <Nav.Link href="#link">
                <Link to="/#forex">Forex</Link>
              </Nav.Link>
              <Nav.Link href="#link">
                <Link to="/#crypto">Crypto</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
