import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import BlockUi from "react-block-ui";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  configureStore,
  injectReducer,
  injectSaga
} from "redux-inject-reducer-and-saga";
import { withRouter } from "react-router";
import { login, loginInit, LOGIN_SUCCESS } from "./Action";
import { loginReducer } from "./Reducer";
import { loginSaga } from "./Saga";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isAuthenticated: false,
      token: null
    };

    this.onInputUsernameChanged = this.onInputUsernameChanged.bind(this);
    this.onInputPasswordChanged = this.onInputPasswordChanged.bind(this);
    this.onButtonLoginClick = this.onButtonLoginClick.bind(this);
  }

  componentDidMount() {
    this.props.loginInit();
  }

  componentDidUpdate(prevProps, prevState) {
    const currentAction = this.props.currentAction;
    if (currentAction === LOGIN_SUCCESS) {
      const token = this.props.data.access_token;
      this.setState({
        isAuthenticated: true,
        token: token
      });
      localStorage.setItem("token", token);
      this.props.history.push("/dashboard");
    }
  }

  onInputUsernameChanged(e) {
    this.setState({ username: e.target.value });
  }

  onInputPasswordChanged(e) {
    this.setState({ password: e.target.value });
  }

  onButtonLoginClick() {
    this.props.login({
      username: this.state.username,
      password: this.state.password
    });
  }

  render() {
    const { data, loading } = this.props;

    return (
      <BlockUi tag="div" blocking={loading}>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form>
                        <h1>SMS Gateway</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Username"
                            autoComplete="username"
                            onChange={this.onInputUsernameChanged}
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={this.onInputPasswordChanged}
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button
                              color="primary"
                              className="px-4"
                              onClick={this.onButtonLoginClick}
                            >
                              Login
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </BlockUi>
    );
  }
}

const mapStateToProps = state => ({
  data: state.get("loginReducer").data,
  loading: state.get("loginReducer").loading,
  currentAction: state.get("loginReducer").currentAction
});

const mapDispatchToProps = dispatch => {
  return {
    loginInit: () => {
      dispatch(loginInit());
    },
    login: params => {
      dispatch(login(params));
    }
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({
  key: "loginReducer",
  reducer: loginReducer
});

const withSaga = injectSaga({
  key: "loginSaga",
  saga: loginSaga
});

export default compose(
  withReducer,
  withSaga,
  withConnect
)(withRouter(Login));
