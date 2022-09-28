import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import LOGO from '../../assets/images/FFT.png'
function PageHeader() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand as={Link} to={"/recipes"} className="col-lg-2 col-sm-4 col-7">
          <Image src={LOGO} fluid></Image>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/recipes" >Show All Recipes</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default PageHeader;
