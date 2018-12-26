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
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';

import {
  editUser,
  getAccessObj,
  getUserById,
  editUserInit,
  getUserObjectByUserId,
  GET_ACCESS_OBJ_SUCCESS,
  GET_ACCESS_OBJ_FAIL,
  GET_USER_OBJECT_BY_USER_ID_SUCCESS,
  EDIT_USER_SUCCESS,
  GET_USER_BY_ID_FAIL,
  EDIT_USER_FAIL,
  GET_USER_OBJECT_BY_USER_ID_FAIL,
  GET_USER_BY_ID_SUCCESS
} from './Action';
import { userReducer } from './Reducer';
import { userSaga } from './Saga';
import { Checkbox } from 'material-ui';
import { messages } from '../controls/MessageBox';
import * as message from '../../utils/Messages';
import { debug } from 'util';
import { handleApiError } from '../../utils/ErrorHandling';

const initialState = {
  disabledControl: true,
  id: '',
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
  listDataUserAccessObject: [],
  selectedAccessObject: new Set()
};

class Edit extends Component {
  constructor() {
    super();
    this.state = initialState;

    this.onInputNameChange = this.onInputNameChange.bind(this);
    this.onInputEmailChange = this.onInputEmailChange.bind(this);
    this.onInputContactChange = this.onInputContactChange.bind(this);
    this.onSwitchStatusChange = this.onSwitchStatusChange.bind(this);
    this.onButtonSaveClick = this.onButtonSaveClick.bind(this);
    this.onButtonBackClick = this.onButtonBackClick.bind(this);
    this.onAccessObjectToggle = this.onAccessObjectToggle.bind(this);
  }

  componentDidMount() {
    this.setState({ id: this.props.match.params.id });

    this.props.getUserById(this.props.match.params.id);
    this.props.getAccessObj();
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  componentWillReceiveProps(props) {
    const currentAction = props.currentAction;

    if (currentAction === GET_USER_BY_ID_SUCCESS) {
      if (props.model) {
        this.setState({
          username: props.model.username,
          fullname: props.model.fullName,
          email: props.model.email || '',
          contact: props.model.contactNumber || '',
          activeStatus: props.model.activeStatus
        });
      }
    } else if (currentAction === GET_ACCESS_OBJ_SUCCESS) {
      this.setState({ listAccessObject: props.dataAccessObject });

      this.props.getUserObjectByUserId(this.props.match.params.id);
    } else if (currentAction === GET_ACCESS_OBJ_FAIL) {
      const error = props.error;

      handleApiError(props, error, 'Edit User Management', 'Failed to get access object.');
    } else if (currentAction === GET_USER_OBJECT_BY_USER_ID_SUCCESS) {
      this.setState({ listDataUserAccessObject: props.dataUserObject }, () => {
        this.state.listAccessObject.forEach(e => {
          try {
            const input = document.getElementsByName('userObject' + e.code)[0];
            input.checked = false;
          } catch (error) {
            //skip if failed to bind
          }
        });

        this.state.listDataUserAccessObject.forEach(e => {
          try {
            const input = document.getElementsByName(
              'userObject' + e.userObject
            )[0];
            input.checked = true;
            this.state.selectedAccessObject.add(e.userObject);
          } catch (error) {
            //skip if failed to bind
          }
        });
      });
    } else if (currentAction === EDIT_USER_SUCCESS) {
      messages('Edit User Management', message.DATA_EDIT_SUCCESS, 'success', false);
      this.props.history.push('/usermanagement');
    } else if (currentAction === EDIT_USER_FAIL) {
      const error = props.error;

      handleApiError(props, error, 'Edit User Management', message.DATA_EDIT_FAIL);
    } else if (currentAction === GET_USER_BY_ID_FAIL) {
      const error = props.error;
      
      handleApiError(props, error, 'Edit User Management', 'Failed to get user by id.');
    } else if (currentAction === GET_USER_OBJECT_BY_USER_ID_FAIL) {
      const error = props.error;
      
      handleApiError(props, error, 'Edit User Management', 'Failed to get user objects.');
    }
  }

  onInputNameChange(e) {
    this.setState({ fullname: e.target.value });
  }

  onInputEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  onInputContactChange(e) {
    this.setState({ contact: e.target.value });
  }

  onSwitchStatusChange(e) {
    this.setState({ activeStatus: e });
  }

  onAccessObjectToggle(e) {
    const accessObject = e.target.value;
    if (this.state.selectedAccessObject.has(accessObject)) {
      this.state.selectedAccessObject.delete(accessObject);
    } else {
      this.state.selectedAccessObject.add(accessObject);
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
        status: this.state.checked,
        fullName: this.state.fullname,
        email: this.state.email,
        contactNumber: this.state.contact,
        activeStatus: this.state.activeStatus,
        userObjects: Array.from(this.state.selectedAccessObject)
      };

      this.props.editUser(this.state.id, model);
    }
  }

  isValid() {
    let isValid = true;
    this.state.listError = [];
    this.setState({ isValid: isValid });
    let re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let reNum = /^[0-9\b]+$/;

    if (this.state.username == '' || this.state.username.trim() == '') {
      this.state.listError.push('Username is required');
    }

    if (this.state.fullname == '') {
      this.state.listError.push('Enter your fullname');
    }

    if (this.state.fullname.length > 20) {
      this.state.listError.push('Fullname length max 20 character');
    }

    if (this.state.email.length > 0) {
      if (!re.test(this.state.email)) {
        this.state.listError.push('Use mail format ex: example@mail.com');
      }
    }

    if (
      (this.state.contact.length > 0 && this.state.contact.length < 9) ||
      this.state.contact.length > 15
    ) {
      this.state.listError.push('Contact length min 9 and max 15 character');
    }

    if (
      this.state.contact.length > 8 &&
      this.state.contact.length < 16 &&
      !reNum.test(this.state.contact)
    ) {
      this.state.listError.push('Use number format for contact number');
    }

    if (this.state.listError.length > 0) {
      isValid = false;
    }

    this.setState({ isValid: isValid, currentAction: null });

    return isValid;
  }

  render() {
    const { model, loading } = this.props;

    return (
      <div>
        <BlockUi tag='div' blocking={loading}>
          <Fade>
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <strong>Edit User</strong>
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
                            disabled={this.state.disabledControl}
                          // disabled
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
                          {this.state.listAccessObject.map(item => {
                            return (
                              <div
                                className='form-check'
                                key={'div' + item.code}
                              >
                                <label
                                  className='form-check-label'
                                  key={'label' + item.code}
                                >
                                  <Input
                                    className='form-check-input'
                                    type='checkbox'
                                    id={item.code}
                                    key={item.code}
                                    onChange={this.onAccessObjectToggle}
                                    name={'userObject' + item.code}
                                    value={item.code}
                                  />{' '}
                                  {item.code}
                                </label>
                              </div>
                            );
                          })}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md='3' />
                        <Col xs='12' md='9'>
                          <div className='form-actions'>
                            <Button
                              onClick={this.onButtonSaveClick}
                              color='primary'
                              className='btn-sm mr-1'
                            >
                              <i className='fa fa-dot-circle-o' /> Update
                            </Button>
                            <Button
                              color='danger'
                              className='btn-sm'
                              onClick={this.onButtonBackClick}
                            >
                              <i className='fa fa-ban' /> Cancel
                            </Button>
                            <NotificationContainer />
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
  model: state.get('userManagementReducer').model,
  currentAction: state.get('userManagementReducer').currentAction,
  error: state.get('userManagementReducer').error,
  dataUserObject: state.get('userManagementReducer').dataUserObject,
  dataAccessObject: state.get('userManagementReducer').dataAccessObject,
  loading: state.get('userManagementReducer').loading
});

const mapDispatchToProps = dispatch => {
  return {
    getUserById: id => {
      dispatch(getUserById(id));
    },
    editUser: (id, model) => {
      dispatch(editUser(id, model));
    },
    getAccessObj: () => {
      dispatch(getAccessObj());
    },
    getUserObjectByUserId: userId => {
      dispatch(getUserObjectByUserId(userId));
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
)(Edit);
