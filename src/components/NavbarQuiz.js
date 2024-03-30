import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import  {Link}  from 'react-router-dom';
function NavbarQuiz(props) {
  return (
   <div>
    <Navbar className='navbar'>
        <Container>
          <Navbar.Brand href="#home">QH</Navbar.Brand>
          <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/myquiz">My Quiz</Nav.Link>
            <Nav.Link as={Link} to="/play">Play Quiz</Nav.Link>
            <Nav.Link as={Link}><h5 className='border px-1 rounded bg-light'>{props.playerName}</h5></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
   </div>
  )
}

export default NavbarQuiz