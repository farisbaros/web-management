import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectReducer, injectSaga } from 'redux-inject-reducer-and-saga';
import {
  getUserBySearchCriteria,
  deleteUser,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_FAIL
} from './Action';
import { userReducer } from './Reducer';
import { userSaga } from './Saga';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import ReactTable from 'react-table';
import Paper from '@material-ui/core/Paper';
import * as config from '../../utils/Config';
import { activeStatusData } from '../controls/MessageBox';
import { messages } from '../controls/MessageBox';
import * as message from '../../utils/Messages';
import { handleApiError } from '../../utils/ErrorHandling';

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

import PropTypes from 'prop-types';

const initialState = {
  collapse: false,
  pageIndex: 0,
  pageSize: config.PAGE_SIZE,
  sort: {
    field: 'lastModifiedDate',
    direction: 'desc'
  },
  userName: '',
  fullName: '',
  activeStatus: null
};

class View extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.onInputUsernameChange = this.onInputUsernameChange.bind(this);
    this.onInputFullNameChange = this.onInputFullNameChange.bind(this);
    this.onButtonSearchClick = this.onButtonSearchClick.bind(this);
    this.onButtonResetClick = this.onButtonResetClick.bind(this);
    this.onButtonAddClick = this.onButtonAddClick.bind(this);
    this.onButtonEditClick = this.onButtonEditClick.bind(this);
    this.onSelectActiveStatusChange = this.onSelectActiveStatusChange.bind(this);
    this.onGridFetchData = this.onGridFetchData.bind(this);
  }

  componentDidMount() {
    this.getUserBySearchCriteria();
  }

  componentWillReceiveProps(props) {
    const currentAction = props.currentAction;

    if (currentAction === DELETE_USER_SUCCESS) {
      messages('Success', 'Active status successfully edited.', 'success', false);

      this.getUserBySearchCriteria();
    } else if (currentAction === DELETE_USER_FAIL) {
      const error = props.error;

      handleApiError(props, error, 'User Management', 'Active status is not edited successfully.');
    } else if (currentAction === GET_USER_FAIL) {
      const error = props.error;

      handleApiError(props, error, 'User Management', 'Failed to get user.');
    }
  }

  componentDidUpdate(prevProps, prevState) {

  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  onInputUsernameChange(e) {
    this.setState({ userName: e.target.value });
  }

  onInputFullNameChange(e) {
    this.setState({ fullName: e.target.value });
  }

  onButtonSearchClick(e) {
    this.getUserBySearchCriteria();
  }

  onButtonResetClick(e) {
    const input = document.getElementsByName('selectActiveStatus')[0];
    input.selectedIndex = 0;
    this.setState({ userName: '', fullName: '', activeStatus: null });
  }

  onButtonAddClick() {
    this.props.history.push('/usermanagement/add');
  }

  onButtonEditClick(id) {
    this.props.history.push('/usermanagement/edit/' + id);
  }

  onSelectActiveStatusChange(e) {
    if (e.target.value === 'Active') {
      this.setState({ activeStatus: true });
    } else if (e.target.value === 'Inactive') {
      this.setState({ activeStatus: false });
    } else {
      this.setState({ activeStatus: null });
    }
  }

  onGridRowDeleteClick(args, id) {
    activeStatusData(args, id, this.onDelete);
  }

  onDelete(args, id, confirm) {
    if (confirm.value === true) {
      args.props.deleteUser(id);
    }
  }

  onGridFetchData(state) {
    const sort = {
      field: this.state.sort.field,
      direction: this.state.sort.direction
    };
    if (state.sorted.length != 0) {
      sort.field = state.sorted[0].id;
      sort.direction = state.sorted[0].asc
        ? 'asc'
        : state.sorted[0].desc
          ? 'desc'
          : 'asc';
    }

    this.setState({
      pageIndex: state.page,
      pageSize: state.pageSize,
      sort: sort
    }, () => {
      this.getUserBySearchCriteria();
    })
  }

  getUserBySearchCriteria() {
    const criteria = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
      sortField: this.state.sort.field,
      sortDirection: this.state.sort.direction,
      userName: this.state.userName,
      fullName: this.state.fullName,
      activeStatus: this.state.activeStatus
    };

    this.props.getUserBySearchCriteria(criteria);
  }

  render() {
    const { data, loading } = this.props;

    const columns = [
      {
        Header: '',
        width: 115,
        accessor: 'id',
        Cell: props => (
          <div>
            <Button
              color='primary'
              className='btn-sm mr-1'
              onClick={() => this.onButtonEditClick(props.value)}
            >
              Edit
            </Button>
            <Button
              color='danger'
              className='btn-sm'
              onClick={() => this.onGridRowDeleteClick(this, props.value)}
            >
              { props.row.activeStatus === true ? 'Inactive' : 'Active' }

            </Button>
          </div>
        )
      },
      {
        Header: 'User Name',
        accessor: 'username'
      },
      {
        Header: 'Full Name',
        accessor: 'fullName'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Active Status',
        accessor: 'activeStatus',
        Cell: props => <span>{props.value ? 'Active' : 'Inactive'}</span>
      }
    ];

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
                              onChange={this.onInputUsernameChange}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md='3'>
                            <Label>Full Name</Label>
                          </Col>
                          <Col xs='12' md='9'>
                            <Input
                              type='input'
                              name='fullName'
                              value={this.state.fullName}
                              onChange={this.onInputFullNameChange}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md='3'>
                            <Label>Active Status</Label>
                          </Col>
                          <Col xs='12' md='9'>
                            <Input
                              type='select'
                              id='selectActiveStatus'
                              name='selectActiveStatus'
                              onChange={this.onSelectActiveStatusChange}
                            >
                              <option value='' />
                              <option value='Active'>Active</option>
                              <option value='Inactive'>Inactive</option>
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
                    loading={loading}
                    manual
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
  loading: state.get('usermanagementReducer').loading,
  data: state.get('usermanagementReducer').data,
  currentAction: state.get('usermanagementReducer').currentAction,
  error: state.get('usermanagementReducer').error
});

const mapDispatchToProps = dispatch => {
  return {
    getUserBySearchCriteria: criteria => {
      dispatch(getUserBySearchCriteria(criteria));
    },
    deleteUser: id => {
      dispatch(deleteUser(id));
    }
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({
  key: 'usermanagementReducer',
  reducer: userReducer
});

const withSaga = injectSaga({
  key: 'usermanagementSaga',
  saga: userSaga
});

export default compose(
  withReducer,
  withSaga,
  withConnect
)(View);
