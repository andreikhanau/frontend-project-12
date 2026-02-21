import React from 'react';
import { Navbar, Container} from 'react-bootstrap';


const AppNavbar = () => (
  <Navbar bg="light" expand="lg" className="shadow-sm">
    <Container className="d-flex justify-content-between">
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
    </Container>
  </Navbar>
);

export default AppNavbar;