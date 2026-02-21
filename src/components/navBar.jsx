import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const AppNavbar = ({ onLogout }) => (
  <Navbar bg="light" expand="lg" className="shadow-sm">
    <Container className="d-flex justify-content-between">
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      <Button variant="primary" onClick={onLogout}>
        Выйти
      </Button>
    </Container>
  </Navbar>
);

export default AppNavbar;