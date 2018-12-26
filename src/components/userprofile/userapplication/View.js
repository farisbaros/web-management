import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { configureStore, injectReducer, injectSaga } from 'redux-inject-reducer-and-saga';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import ReactTable from 'react-table';
import Paper from '@material-ui/core/Paper';

import * as config from '../../../utils/Config';
import { deleteData, messages } from '../../controls/MessageBox';
import * as message from '../../../utils/Messages';
import { handleApiError } from '../../../utils/ErrorHandling';

import * as ReactDOM from 'react-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Fade,
  FormGroup,
  Input,
  Label,
  Row,
  Collapse
} from 'reactstrap';

import axios from 'axios';

import PropTypes from 'prop-types';
import { history } from '../../../services';

import { fetchProducts } from '../../../actions';

import {
  getUserApplication,
  deleteUserApplication,
  getUser,
  getClient,
  getGroup,
  DELETE_USER_APPLICATION_SUCCESS,
  DELETE_USER_APPLICATION_FAIL,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAIL,
  GET_GROUP_SUCCESS,
  GET_USER_APPLICATION_SUCCESS,
  GET_USER_APPLICATION_FAIL
} from './Action';

import { userApplicationReducer } from './Reducer';
import { userApplicationSaga } from './Saga';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as MessageUtil from'../../../utils/Messages';

const initialState = {
  collapse: false,
  userName: '',
  clientName: '',
  groupName: '',
  activeStatus: '',
  pageIndex: 0,
  pageSize: config.PAGE_SIZE,
  sort: {
    field: 'lastModifiedDate',
    direction: 'desc'
  },
  client: [],
  group: []
}

class View extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.onInputUserNameChange = this.onInputUserNameChange.bind(this);
    this.onInputClientNameChange = this.onInputClientNameChange.bind(this);
    this.onInputGroupNameChange = this.onInputGroupNameChange.bind(this);
    this.onSelectActiveStatusChange = this.onSelectActiveStatusChange.bind(this);
    this.onButtonSearchClick = this.onButtonSearchClick.bind(this);
    this.onButtonAddClick = this.onButtonAddClick.bind(this);
    this.onButtonEditClick = this.onButtonEditClick.bind(this);
    this.onGridRowDeleteClick = this.onGridRowDeleteClick.bind(this);
    this.onGridFetchData = this.onGridFetchData.bind(this);
    this.onButtonResetClick = this.onButtonResetClick.bind(this);
  }

  componentDidMount() {
    const clientName = '';

    this.loadData();
    //this.loadClient();
    //this.loadGroup(clientName);
  }

  componentWillReceiveProps(props) {
    const currentAction = props.currentAction;

    if (currentAction === GET_CLIENT_SUCCESS) {
      this.setState({ client: props.client });
    } else if (currentAction === GET_GROUP_SUCCESS) {
      this.setState({ group: props.group });
    } else if (currentAction === DELETE_USER_APPLICATION_SUCCESS) {
      messages('Success', MessageUtil.DATA_DELETE_SUCCESS, 'success', false);

      this.loadData();
    } else if (currentAction === DELETE_USER_APPLICATION_FAIL) {
      const error = props.error;
      handleApiError(props, error, 'User Application', message.DATA_DELETE_FAIL);
    } else if (currentAction === GET_USER_APPLICATION_SUCCESS) {
      this.loadClient();
    } else if (currentAction === GET_USER_APPLICATION_FAIL) {
      const error = props.error;
      handleApiError(props, error, 'User Application', 'Data is not load successfully');
    }
  }

  componentDidUpdate(prevProps, prevState) {
  
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  onInputUserNameChange(e) {
    this.setState({ userName: e.target.value });
  }

  onInputClientNameChange(e) {
    this.setState({ clientName: e.target.value });
    this.loadGroup(e.target.value);
  }

  onInputGroupNameChange(e) {
    this.setState({ groupName: e.target.value });
  }

  onSelectActiveStatusChange(e) {
    this.setState({ activeStatus: e.target.value });
  }

  onButtonSearchClick(e) {
    this.loadData();
  }

  onGridRowDeleteClick(args, id) {
    deleteData(args, id, this.onDelete);
  }

  onDelete(args, id, confirm) {
    if (confirm.value == true) {
      args.props.deleteUserApplication(id);
    }
  }

  onGridFetchData(state) {
    const sort = {
      field: this.state.sort.field,
      direction: this.state.sort.direction
    };
    if (state.sorted.length != 0) {
      sort.field = state.sorted[0].id;
      sort.direction = state.sorted[0].asc ? 'asc' : (state.sorted[0].desc ? 'desc' : 'asc');
    }

    this.setState({
      pageIndex: state.page,
      pageSize: state.pageSize,
      sort: sort
    });

    var activeStatus;
    if (this.state.activeStatus.toLowerCase() == 'active') {
      activeStatus = 1;
    } else if (this.state.activeStatus.toLowerCase() == 'inactive') {
      activeStatus = 0;
    } else {
      activeStatus = '';
    }

    const criteria = {
      pageIndex: state.page,
      pageSize: state.pageSize,
      sortField: sort.field,
      sortDirection: sort.direction,

      userName: this.state.userName,
      clientName: this.state.clientName,
      groupName: this.state.groupName,
      activeStatus: activeStatus
    };
    this.props.getUserApplication(criteria);
  }


  loadData() {
    let activeStatus = '';
    if (this.state.activeStatus.toLowerCase() == 'active') {
      activeStatus = 1;
    } else if (this.state.activeStatus.toLowerCase() == 'inactive') {
      activeStatus = 0;
    } else {
      activeStatus = '';
    }
    const criteria = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
      sortField: this.state.sort.field,
      sortDirection: this.state.sort.direction,
      userName: this.state.userName,
      clientName: this.state.clientName,
      groupName: this.state.groupName,
      activeStatus: activeStatus
    };
    this.props.getUserApplication(criteria);
  }

  loadClient() {
    this.props.getClient();
  }

  loadGroup(clientName) {
    this.props.getGroup(clientName);
  }

  onButtonAddClick() {
    this.props.history.push('/userprofile/userapplication/add');
  }

  onButtonEditClick(data) {
    this.props.history.push('/userprofile/userapplication/edit/' + data.id);
  }

  onButtonResetClick(e) {
    const selectActiveStatus = document.getElementsByName('activeStatus')[0];
    selectActiveStatus.selectedIndex = 0;
    
    const selectClientName = document.getElementsByName('clientName')[0];
    selectClientName.selectedIndex = 0;
    
    const inputGroupName = document.getElementsByName('groupName')[0];
    inputGroupName.selectedIndex = 0;
    
    this.setState({ userName: '', clientName: '', groupName: '', activeStatus: '', group: [] });

    this.state.userName = ''
    this.state.clientName = ''
    this.state.groupName = ''
    this.state.activeStatus = ''
    this.state.group = []

    this.loadData();
  }

  render() {
    const { data, group, loading } = this.props;

    const columns = [
      {
        Header: '',
        width: 105,
        accessor: 'id',
        Cell: props =>
          <div>
            <Button
              color='primary'
              className='btn-sm mr-1'
              onClick={() => this.onButtonEditClick(data.content[props.index])}>
              Edit
            </Button>
            <Button
              color='danger'
              className='btn-sm'
              onClick={() => this.onGridRowDeleteClick(this, props.value)}
            >
              Delete
            </Button>
          </div>
      },
      {
        Header: 'User Name',
        accessor: 'userName'
      },
      {
        Header: 'Group Name',
        accessor: 'groupName'
      },
      {
        Header: 'Client Name',
        accessor: 'clientName'
      },
      {
        Header: 'Quota',
        accessor: 'creditBalance'
      },
      {
        Header: 'Remaining Quota',
        accessor: 'remainingCreditBalance'
      },
      {
        Header: 'Priority',
        accessor: 'priority'
      },
      {
        Header: 'Active Status',
        accessor: 'activeStatus',
        Cell: props => <span>{props.value == 1 ? 'Active' : 'Inactive'}</span>
      }
    ]
    return (
      <div>
        <BlockUi tag='div' blocking={loading}>
          <Fade>
            <Row className='mb-4'>
              <Col>
                <div>
                  <div className='btn-group'>
                    <button
                      type='button'
                      className='btn btn-primary btn-sm btn-pill mB-10'
                      onClick={this.onButtonAddClick}
                    >
                      <i className="fa fa-plus"></i>&nbsp;Add
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    Search Criteria
                    <div className='card-header-actions'>
                      <Button color='link' className='card-header-action btn-minimize'
                        data-target='#collapseBody' onClick={this.toggle}>
                        <i className='icon-arrow-up'></i></Button>
                    </div>
                  </CardHeader>
                  <Collapse isOpen={this.state.collapse} id='collapseBody'>
                    <CardBody>
                      <div className='form-horizontal'>
                        <FormGroup row>
                          <Col md='3'>
                            <Label>User Name</Label>
                          </Col>
                          <Col xs='12' md='9'>
                            <Input
                              type='input'
                              name='username'
                              value={this.state.userName}
                              onChange={this.onInputUserNameChange}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md='3'>
                            <Label>Client Name</Label>
                          </Col>
                          <Col xs='12' md='9'>
                            <Input
                              type='select'
                              name='clientName'
                              value={this.state.clientName}
                              onChange={this.onInputClientNameChange}
                            >
                              <option value=''></option>
                              {this.state.client.map((e, key) => {
                                return <option key={key} value={e.clientName}> {e.clientName} </option>
                              })}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md='3'>
                            <Label>Group Name</Label>
                          </Col>
                          <Col xs='12' md='9'>
                            <Input
                              type='select'
                              name='groupName'
                              value={group.groupName}
                              onChange={this.onInputGroupNameChange}
                            >
                              <option value=''></option>
                              {this.state.group.map((e, key) => {
                                return <option key={key} value={e.groupName}> {e.groupName} </option>
                              })}
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md='3'>
                            <Label>Active Status</Label>
                          </Col>
                          <Col xs='12' md='9'>
                            <Input
                              type='select'
                              name='activeStatus'
                              value={this.state.activeStatus}
                              onChange={this.onSelectActiveStatusChange}
                            >
                              <option value=''></option>
                              <option>Active</option>
                              <option>Inactive</option>
                            </Input>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md='3' />
                          <Col xs='12' md='9'>
                            <Button
                              type='submit'
                              color='primary'
                              className='btn-sm mr-1'
                              onClick={this.onButtonSearchClick}
                            >
                              Search
                          </Button>
                          <Button
                              color='primary'
                              className='btn-sm'
                              onClick={this.onButtonResetClick}
                            >
                              Reset
                          </Button>
                          </Col>
                        </FormGroup>
                      </div>
                    </CardBody>
                  </Collapse>
                  
                </Card>
              </Col>
            </Row>
            <Row className='mb-4'>
              <Col>
                <Paper>
                  <ReactTable
                    className='-striped -highlight'
                    columns={columns}
                    data={data.content}
                    pages={data.totalPages}
                    defaultPageSize={this.state.pageSize}
                    onFetchData={this.onGridFetchData}
                    manual
                    loading={loading}
                  />
                </Paper>
              </Col>
            </Row>
          </Fade>
        </BlockUi>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.get('userApplicationReducer').data,
  loading: state.get('userApplicationReducer').loading,
  currentAction: state.get('userApplicationReducer').currentAction,
  client: state.get('userApplicationReducer').client,
  group: state.get('userApplicationReducer').group,
  error: state.get('userApplicationReducer').error
});

const mapDispatchToProps = dispatch => {
  return {
    getUserApplication: (criteria) => {
      dispatch(getUserApplication(criteria));
    },
    deleteUserApplication: (id) => {
      dispatch(deleteUserApplication(id));
    },
    getUser: () => {
      dispatch(getUser());
    },
    getClient: () => {
      dispatch(getClient());
    },
    getGroup: (clientName) => {
      dispatch(getGroup(clientName));
    }
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'userApplicationReducer',
  reducer: userApplicationReducer,
});

const withSaga = injectSaga({
  key: 'userApplicationSaga',
  saga: userApplicationSaga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(View);
