import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectReducer, injectSaga } from 'redux-inject-reducer-and-saga';
import { getClientBySearchCriteria, GET_CLIENT_FAIL, GET_CLIENT_SUCCESS } from './Action';
import { clientReducer } from './Reducer';
import { clientSaga } from './Saga';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import ReactTable from 'react-table';
import Paper from '@material-ui/core/Paper';
import * as config from '../../../utils/Config';
import { messages } from '../../controls/MessageBox';

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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse
} from 'reactstrap';

import PropTypes from 'prop-types';

const initialState = {
  collapse: false,
  pageIndex: 0,
  pageSize: config.PAGE_SIZE,
  sort: {
    field: 'clientName',
    direction: 'asc'
  },
  clientName: '',
  senderId: '',
  modemPort: '',
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
    this.onInputClientNameChange = this.onInputClientNameChange.bind(this);
    this.onInputSenderIdChange = this.onInputSenderIdChange.bind(this);
    this.onInputModemPortChange = this.onInputModemPortChange.bind(this);
    this.onSelectActiveStatusChange = this.onSelectActiveStatusChange.bind(this);
    this.onButtonSearchClick = this.onButtonSearchClick.bind(this);
    this.onButtonResetClick = this.onButtonResetClick.bind(this);
    this.onButtonAddClick = this.onButtonAddClick.bind(this);
    this.onButtonEditClick = this.onButtonEditClick.bind(this);
    this.onGridFetchData = this.onGridFetchData.bind(this);
  }

  componentDidMount() {
    this.getClientBySearchCriteria();
  }

  componentWillReceiveProps(props) {
    const currentAction = props.currentAction;
    
    if (currentAction === GET_CLIENT_FAIL) {
      messages('Fail', 'Get client fail.' , 'error', false);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  onInputClientNameChange(e) {
    this.setState({ clientName: e.target.value });
  }

  onInputSenderIdChange(e) {
    this.setState({ senderId: e.target.value });
  }

  onInputModemPortChange(e) {
    this.setState({ modemPort: e.target.value });
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

  onButtonSearchClick(e) {
    this.getClientBySearchCriteria();
  }

  onButtonResetClick(e) {
    const input = document.getElementsByName('selectActiveStatus')[0];
    input.selectedIndex = 0;
    this.setState({ clientName: '', senderId: '', modemPort: '', activeStatus: null });
  }

  onButtonAddClick() {
    this.props.history.push('/userprofile/client/add');
  }

  onButtonEditClick(id) {
    this.props.history.push('/userprofile/client/edit/' + id);
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
      this.getClientBySearchCriteria();
    })
  }

  getClientBySearchCriteria() {
    const criteria = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
      sortField: this.state.sort.field,
      sortDirection: this.state.sort.direction,
      clientName: this.state.clientName,
      senderId: this.state.senderId,
      modemPort: this.state.modemPort,
      activeStatus: this.state.activeStatus
    };
    this.props.getClientBySearchCriteria(criteria);
  }

  render() {
    const { data, loading } = this.props;

    const columns = [
      {
        Header: '',
        width: 50,
        accessor: 'id',
        Cell: props => (
          <div>
            <Button
              color='primary'
              className='btn-sm'
              onClick={() => this.onButtonEditClick(props.value)}
            >
              Edit
            </Button>
          </div>
        )
      },
      {
        Header: 'Client Name',
        accessor: 'clientName'
      },
      {
        Header: 'Sender ID',
        accessor: 'senderId'
      },
      {
        Header: 'Modem Port',
        accessor: 'modemPort'
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
                      className='btn btn-primary btn-sm  mB-10'
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
                            <Label>Client Name</Label>
                          </Col>
                          <Col xs='12' md='9'>
                            <Input
                              type='input'
                              name='clientName'
                              value={this.state.clientName}
                              onChange={this.onInputClientNameChange}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md='3'>
                            <Label>Sender ID</Label>
                          </Col>
                          <Col xs='12' md='9'>
                            <Input
                              type='input'
                              name='senderId'
                              value={this.state.senderId}
                              onChange={this.onInputSenderIdChange}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md='3'>
                            <Label>Modem Port</Label>
                          </Col>
                          <Col xs='12' md='9'>
                            <Input
                              type='input'
                              name='modemPort'
                              value={this.state.modemPort}
                              onChange={this.onInputModemPortChange}
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
                              <option />
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
                    onGridFetchData={this.onGridFetchData}
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
  loading: state.get('clientReducer').loading,
  data: state.get('clientReducer').data,
  currentAction: state.get('clientReducer').currentAction,
  error: state.get('clientReducer').error
});

const mapDispatchToProps = dispatch => {
  return {
    getClientBySearchCriteria: criteria => {
      dispatch(getClientBySearchCriteria(criteria));
    }
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({
  key: 'clientReducer',
  reducer: clientReducer
});

const withSaga = injectSaga({
  key: 'clientSaga',
  saga: clientSaga
});

export default compose(
  withReducer,
  withSaga,
  withConnect
)(View);
