import React, {Component} from "react";
import {Alert, Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";

import { Link } from 'react-router-dom';

class Login extends Component {
  handleLogin(e) {
    this.props.login(this.state);
  }

  render() {
    const { auth } = this.props;
    const { fetching, error } = auth;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-0">
                <Card className="p-4">
                  <CardBlock className="card-body">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input type="text" placeholder="Username"
                             onChange={(e) => this.setState({
                                     username: e.target.value.trim()
                             })
                             }
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input type="password" placeholder="Password"
                             onChange={(e) => this.setState({
                                     password: e.target.value.trim()
                             })
                             }
                      />
                    </InputGroup>
                      {error ?
                       (<Alert color="danger">
                             {error}
                           </Alert>) : (<div/>)
                      }
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4"
                                onClick={ this.handleLogin.bind(this) }
                                disabled={fetching}
                        >Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBlock>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBlock className="card-body text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                      </Link>
                     </div>
                  </CardBlock>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
