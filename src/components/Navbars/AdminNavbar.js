import React from "react";
import { Link } from "react-router-dom";

// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col,
  Collapse,
} from "react-bootstrap";

function AdminNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  return (
    <>
      <Navbar expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-minimize">
              <Button
                className="btn-fill btn-round btn-icon d-none d-lg-block bg-dark border-dark"
                variant="dark"
                onClick={() => document.body.classList.toggle("sidebar-mini")}
              >
                <i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
                <i className="fas fa-bars visible-on-sidebar-mini"></i>
              </Button>
              <Button
                className="btn-fill btn-round btn-icon d-block d-lg-none bg-dark border-dark"
                variant="dark"
                onClick={() =>
                  document.documentElement.classList.toggle("nav-open")
                }
              >
                <i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
                <i className="fas fa-bars visible-on-sidebar-mini"></i>
              </Button>
            </div>
            
          </div>
          <button
            className="navbar-toggler navbar-toggler-right border-0"
            type="button"
            onClick={() => setCollapseOpen(!collapseOpen)}
          >
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
          </button>
          <Navbar.Collapse className="justify-content-end" in={collapseOpen}>
            <Nav className="nav mr-auto" navbar>
              <Form
                className="navbar-form navbar-left navbar-search-form ml-3 ml-lg-0"
                role="search"
              >
                <InputGroup>
                  <i className="nc-icon nc-zoom-split"></i>
                  <Form.Control
                    defaultValue=""
                    placeholder="Search..."
                    type="text"
                  ></Form.Control>
                </InputGroup>
              </Form>
            </Nav>
            <Nav navbar>
              <Nav.Link to='/login' as={Link}>Logout</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
