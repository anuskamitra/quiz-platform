import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import  {Link}  from 'react-router-dom';
function NavbarQuiz() {
  return (
   <div>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">QP</Navbar.Brand>
          <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/myquiz">My Quiz</Nav.Link>
            <Nav.Link as={Link} to="/play">Play Quiz</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
   </div>
  )
}

export default NavbarQuiz