import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  configureStore,
  injectReducer,
  injectSaga
} from 'redux-inject-reducer-and-saga';

import BlockUi from 'react-block-ui';

import {
  Card,
  CardBody,
  CardHeader,
  Fade,
  Col,
  Row,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  CardFooter,
  Button,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import Switch from 'react-switch';
import { messages } from '../controls/MessageBox';

import { addUser, getAccessObj, ADD_USER_SUCCESS, ADD_USER_FAIL, GET_ACCESS_OBJ_FAIL, GET_ACCESS_OBJ_SUCCESS } from './Action';
import { userReducer } from './Reducer';
import { userSaga } from './Saga';
import * as message from '../../utils/Messages';
import { set } from 'immutable';
import { handleApiError } from '../../utils/ErrorHandling';

const initialState = {
  listError: [],
  isValid: true,
  username: '',
  password: '',
  passwordValidate: '',
  fullname: '',
  email: '',
  contact: '',
  activeStatus: true,
  currentAction: '',
  listAccessObject: [],
  selectedAccessObject: new Set()
};

class Add extends Component {
  constructor() {
    super();
    this.state = initialState;

    this.onInputUserNameChange = this.onInputUserNameChange.bind(this);
    this.onInputPasswordChange = this.onInputPasswordChange.bind(this);
    this.onInputConfirmPassChange = this.onInputConfirmPassChange.bind(this);
    this.onInputNameChange = this.onInputNameChange.bind(this);
    this.onInputEmailChange = this.onInputEmailChange.bind(this);
    this.onInputContactChange = this.onInputContactChange.bind(this);
    this.onSwitchStatusChange = this.onSwitchStatusChange.bind(this);
    this.onButtonSaveClick = this.onButtonSaveClick.bind(this);
    this.onButtonBackClick = this.onButtonBackClick.bind(this);
    this.onAccessObjectToggle = this.onAccessObjectToggle.bind(this);
  }

  componentDidMount() {
    this.props.getAccessObj();
  }

  componentWillReceiveProps(props) {
    const currentAction = props.currentAction;

    if (currentAction === ADD_USER_SUCCESS) {
      messages('Add User Management', message.DATA_ADD_SUCCESS, 'success', false);
      this.props.history.push('/usermanagement');
    } else if (currentAction === ADD_USER_FAIL) {
      const error = props.error;

      handleApiError(props, error, 'Add User Management', message.DATA_ADD_FAIL);
    }
    else if (currentAction === GET_ACCESS_OBJ_FAIL) {
      const error = props.error;

      handleApiError(props, error, 'Add User Management', 'Failed to get access object.');
    }
    else if (currentAction === GET_ACCESS_OBJ_SUCCESS) {
      this.setState({ listAccessObject: props.dataAccessObject });
    }
  }

  componentDidUpdate(prevProps, prevState) {

  }

  onInputUserNameChange(event) {
    this.setState({ username: event.target.value });
  }

  onInputPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onInputConfirmPassChange(event) {
    this.setState({ passwordValidate: event.target.value });
  }

  onInputNameChange(event) {
    this.setState({ fullname: event.target.value });
  }

  onInputEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onInputContactChange(event) {
    this.setState({ contact: event.target.value });
  }

  onAccessObjectToggle(e) {
    const accessObject = e.target.value;
    if (this.state.selectedAccessObject.has(accessObject)) {
      this.state.selectedAccessObject.delete(accessObject);
    } else {
      this.state.selectedAccessObject.add(accessObject);
    }
  }

  onSwitchStatusChange(activeStatus) {
    if (this.state.activeStatus === true) {
      this.setState({ activeStatus: false });
    } else {
      this.setState({ activeStatus: true });
    }
  }

  onButtonBackClick() {
    this.props.history.push('/usermanagement');
  }

  onButtonSaveClick() {
    if (this.isValid()) {
      const model = {
        username: this.state.username,
        password: this.state.password,
        activeStatus: this.state.activeStatus,
        fullName: this.state.fullname,
        email: this.state.email,
        contactNumber: this.state.contact,
        userObjects: Array.from(this.state.selectedAccessObject)
      }

      this.props.addUser(model);
    }
  }

  isValid() {
    let isValid = true;
    this.state.listError = [];
    this.setState({ isValid: isValid, currentAction: '' });
    let re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let reNum = /^[0-9\b]+$/;

    if (this.state.username === '' || this.state.username.trim() === '') {
      this.state.listError.push('Username is required');
    }

    if (this.state.password === '') {
      this.state.listError.push('Password is required');
    }

    if (this.state.username.includes(' ')) {
      this.state.listError.push('Remove space in username');
    }

    if (this.state.password.length < 6) {
      this.state.listError.push('Password length min 6 character');
    }

    if (this.state.passwordValidate === '') {
      this.state.listError.push('Enter password validation');
    }

    if (this.state.password.length > 0 && this.state.password != this.state.passwordValidate) {
      this.state.listError.push('Password missmatch');
    }

    if (this.state.fullname === '') {
      this.state.listError.push('Fullname is required');
    }

    if (this.state.fullname.length > 20) {
      this.state.listError.push('Fullname length max 20 character');
    }

    if (this.state.email.length > 0) {
      if (!re.test(this.state.email)) {
        this.state.listError.push('Use mail format ex: example@mail.com');
      }
    }

    if (this.state.contact.length > 0 && this.state.contact.length < 9 || this.state.contact.length > 15) {
      this.state.listError.push('Contact length min 9 and max 15 character');
    }

    if (this.state.contact.length > 8 && this.state.contact.length < 16 && !reNum.test(this.state.contact)) {
      this.state.listError.push('Use number format for contact number');
    }

    if (this.state.listError.length > 0) {
      isValid = false;
    }

    this.setState({ isValid: isValid });

    return isValid;
  }

  render() {
    const { data, loading, currentAction } = this.props;

    return (
      <div>
        <BlockUi tag='div' blocking={loading}>
          <Fade>
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <strong>Add User</strong>
                  </CardHeader>
                  <CardBody>
                    <ListGroup className='mb-4'>
                      {!this.state.isValid &&
                        this.state.listError.map(error => (
                          <ListGroupItem key={error} action color='danger'>
                            {error}
                          </ListGroupItem>
                        ))}
                    </ListGroup>

                    <Form className='form-horizontal'>
                      <FormGroup row>
                        <Col md='3'>
                          <Label htmlFor='txtUserName'>Username</Label>
                        </Col>
                        <Col xs='12' md='9'>
                          <Input
                            type='text'
                            id='txtUserName'
                            name='txtUserName'
                            value={this.state.username}
                            onChange={this.onInputUserNameChange}
                          />
                        </Col>
                        <Col md='3' />
                        <Col xs='12' md='9' />
                      </FormGroup>
                      <FormGroup row>
                        <Col md='3'>
                          <Label htmlFor='txtUserPass'>Password</Label>
                        </Col>
                        <Col xs='12' md='9'>
                          <Input
                            type='password'
                            id='txtUserPass'
                            name='txtUserPass'
                            value={this.state.password}
                            onChange={this.onInputPasswordChange}
                          />
                        </Col>
                        <Col md='3' />
                        <Col xs='12' md='9' />
                      </FormGroup>
                      <FormGroup row>
                        <Col md='3'>
                          <Label htmlFor='txtPassValidate'>
                            Confirm Password
                          </Label>
                        </Col>
                        <Col xs='12' md='9'>
                          <Input
                            type='password'
                            id='txtPassValidate'
                            name='txtPassValidate'
                            value={this.state.passwordValidate}
                            onChange={this.onInputConfirmPassChange}
                          />
                        </Col>
                        <Col md='3' />
                        <Col xs='12' md='9' />
                      </FormGroup>
                      <FormGroup row>
                        <Col md='3'>
                          <Label htmlFor='txtName'>Full Name</Label>
                        </Col>
                        <Col xs='12' md='9'>
                          <Input
                            type='text'
                            id='txtName'
                            name='txtName'
                            value={this.state.fullname}
                            onChange={this.onInputNameChange}
                          />
                        </Col>
                        <Col md='3' />
                        <Col xs='12' md='9' />
                      </FormGroup>
                      <FormGroup row>
                        <Col md='3'>
                          <Label htmlFor='txtEmail'>Email</Label>
                        </Col>
                        <Col xs='12' md='9'>
                          <Input
                            type='email'
                            id='txtEmail'
                            name='txtEmail'
                            value={this.state.email}
                            onChange={this.onInputEmailChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md='3'>
                          <Label htmlFor='txtContact'>Contact Number</Label>
                        </Col>
                        <Col xs='12' md='9'>
                          <Input
                            type='text'
                            id='txtContact'
                            name='txtContact'
                            value={this.state.contact}
                            onChange={this.onInputContactChange}
                          />
                        </Col>
                        <Col md='3' />
                        <Col xs='12' md='9' />
                      </FormGroup>
                      <FormGroup row>
                        <Col md='3'>
                          <label htmlFor='switchStatus'>Active Status</label>
                        </Col>
                        <Col xs='12' md='9'>
                          <Switch
                            onChange={this.onSwitchStatusChange}
                            checked={this.state.activeStatus}
                            id='switchStatus'
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md='3'>
                          <label htmlFor='checkPreviledge'>Access Object</label>
                        </Col>
                        <Col xs='12' md='9'>
                          {
                            this.state.listAccessObject.map(item => (
                              <div className='form-check' key={'div' + item.code}>
                                <label className='form-check-label' key={'label' + item.code}>
                                  <Input className='form-check-input' type='checkbox'
                                    id={item.code} key={item.code} onChange={this.onAccessObjectToggle}
                                    name={'userObject' + item.code} value={item.code} /> {item.code}
                                </label>
                              </div>
                            ))
                          }
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md='3' />
                        <Col xs='12' md='9'>
                          <div className='form-actions'>
                            <Button
                              onClick={this.onButtonSaveClick}
                              color='primary'
                              className='btn-sm btn-save mr-1'
                            >
                              <i className='fa fa-dot-circle-o' /> Save
                            </Button>
                            <Button
                              color='danger'
                              className='btn-sm btn-cancel'
                              onClick={this.onButtonBackClick}
                            >
                              <i className='fa fa-ban' /> Cancel
                            </Button>
                          </div>
                        </Col>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Fade>
        </BlockUi>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.get('userManagementReducer').data,
  error: state.get('userManagementReducer').error,
  dataAccessObject: state.get('userManagementReducer').dataAccessObject,
  loading: state.get('userManagementReducer').loading,
  currentAction: state.get('usermanagementReducer').currentAction
});

const mapDispatchToProps = dispatch => {
  return {
    addUser: criteria => {
      dispatch(addUser(criteria));
    },
    getAccessObj: () => {
      dispatch(getAccessObj());
    }
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({
  key: 'userManagementReducer',
  reducer: userReducer
});

const withSaga = injectSaga({
  key: 'userManagementSaga',
  saga: userSaga
});

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Add);
