//NabvarQuiz component will shown on everyPage.
import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import  {Link,useLocation}  from 'react-router-dom';
function NavbarQuiz(props) {

  //useLocation is used to show the player name only when the location is "play".
  let location=useLocation();

  return (
   <div>
    <Navbar className='navbar'>
        <Container>
          <Navbar.Brand className="p-0 m-0" href="#home"><img style={{height:"30px", padding:"0px", margin:"0px"}}src="/logo.png"/></Navbar.Brand>
          <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/myquiz">My Quiz</Nav.Link>
            <Nav.Link as={Link} to="/play">Play Quiz</Nav.Link>
           {location.pathname=="/play" && <Nav.Link as={Link}><h5 className='border px-1 rounded bg-light'>{props.playerName}</h5></Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
   </div>
  )
}

export default NavbarQuiz