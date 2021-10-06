import React from "react";
import {Component} from "react"

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Col,
} from "react-bootstrap";

class SignIn extends Component  {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {username,password}=this.state
    const {history} = this.props
    if(username!=='' && password!==''){
      history.replace('/')
    }
    else{
      this.setState({showSubmitError:true,errorMsg:'Invalid input or password'})
    }
    
}

render(){
  const {showSubmitError, errorMsg, username,password} = this.state
  return (
    <>
      <div
        className="full-page section-image"
        data-color="black"
       
      >
        <div className="content d-flex align-items-center p-0">
          <Container>
            <Col className="mx-auto" lg="4" md="8">
              <Form action="" className="form" method="" onSubmit={this.submitForm}> 
                <Card className={"card-login " }>
                  <Card.Header>
                    <h3 className="header text-center">Login</h3>
                  </Card.Header>
                  <Card.Body>
                    <Card.Body>
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          placeholder="Enter Username"
                          onChange={this.onChangeUsername}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          placeholder="Password"
                          onChange={this.onChangePassword}
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                      {showSubmitError && <p className="text-danger">*{errorMsg}</p>}
                    </Card.Body>
                  </Card.Body>
                  <Card.Footer className="ml-auto mr-auto d-flex justify-content-between">
                  <Button className="btn-wd " type="button" variant="link">
                      Forgot Password
                    </Button>
                    <Button className="btn-wd" type="submit" variant="warning">
                      Login
                    </Button>
                  </Card.Footer>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
        <div
          className="full-page-background"
          
        ></div>
      </div>
    </>
  );
}
  
}

export default SignIn;
