import React, { Component } from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import { configureStore, injectReducer, injectSaga } from "redux-inject-reducer-and-saga";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import ReactTable from "react-table";

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
} from "reactstrap";

import axios from "axios";
import PropTypes from "prop-types";
import { getCostCenterByCriteria, deleteCostCenter, DELETE_COST_CENTER_SUCCESS, DELETE_COST_CENTER_FAIL, GET_COST_CENTER_BY_ID_FAIL } from './Action';
import { costCenterReducer } from './Reducer';
import { costCenterSaga } from './Saga';
import * as config from '../../../utils/Config';
import { deleteData } from '../../controls/MessageBox';
import { messages } from '../../controls/MessageBox';
import * as message from '../../../utils/Messages';
import { handleApiError } from '../../../utils/ErrorHandling';

const initialState = {
    collapse: false,
    pageIndex: 0,
    pageSize: config.PAGE_SIZE,
    sort: {
        field: "lastModifiedDate",
        direction: "desc"
    },
    costCenterCode: '',
    costCenterDesc: '',
    baCode: '',
    currentAction: null
};

class View extends Component {
    constructor(props) {
        super(props);
    
        this.state = initialState;

        //this.baseState = this.state 
        this.toggle = this.toggle.bind(this);
        this.onInputCostCenterCodeChange = this.onInputCostCenterCodeChange.bind(this);
        this.onInputBaCodeChange = this.onInputBaCodeChange.bind(this);
        this.onButtonSearchClick = this.onButtonSearchClick.bind(this);
        this.onButtonResetClick = this.onButtonResetClick.bind(this);
        this.onButtonAddClick = this.onButtonAddClick.bind(this);
        this.onGridRowDeleteClick = this.onGridRowDeleteClick.bind(this);
        this.onGridFetchData = this.onGridFetchData.bind(this);
        this.onButtonEditClick = this.onButtonEditClick.bind(this);
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    onButtonEditClick(id) {
        this.props.history.push('/masterdata/costCenter/edit/' +id);
    }

    getCostCenterByCriteria() {
        const criteria = {
            pageIndex: this.state.page,
            pageSize: this.state.pageSize,
            sortField: this.state.sort.field,
            sortDirection: this.state.sort.direction,
            baCode: this.state.baCode,
            costCenterCode: this.state.costCenterCode,
            costCenterDesc: this.state.costCenterDesc
          };
          this.props.getCostCenterByCriteria(criteria);
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
            this.getCostCenterByCriteria();
          })
      }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentDidMount() {
        this.getCostCenterByCriteria();
    }
    
    componentWillReceiveProps(props) {
        const currentAction = props.currentAction;
    
        if (currentAction === DELETE_COST_CENTER_SUCCESS) {
          messages('Success', 'Cost center successfully deleted.', 'success', false);
    
          this.getCostCenterByCriteria();
        } else if (currentAction === DELETE_COST_CENTER_FAIL) {
          const error = props.error;
    
          handleApiError(props, error, 'Cost center', 'Cost center is not deleted successfully.');
        } else if (currentAction === GET_COST_CENTER_BY_ID_FAIL) {
          const error = props.error;
    
          handleApiError(props, error, 'Cost center', 'Failed to get cost center.');
        }
    }

    onInputCostCenterCodeChange(e) {
        this.setState({ costCenterCode: e.target.value });
    }

    onInputBaCodeChange(e) {
        this.setState({ baCode: e.target.value });
    }

    onButtonSearchClick(e) {
        this.getCostCenterByCriteria();
    }

    onButtonResetClick() {
        this.setState({ costCenterCode: '', costCenterDesc: '', baCode: '' });
        this.props.getCostCenterByCriteria();
    }

    onButtonAddClick() {
        this.props.history.push("/masterdata/costCenter/add");
    }

    onGridRowDeleteClick(props, id) {
        deleteData(props, id, this.onDelete);
    }
    
    onDelete(props, id, confirm) {
    if (confirm.value == true) {
        props.deleteCostCenter(id);
    }
    }

    search() {
        var criteria = {
            costCenterCode: this.state.costCenterCode,
            costCenterDesc: this.state.costCenterDesc,
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize,
            sortField: this.state.sort.field,
            sortDirection: this.state.sort.direction,
            baCode: this.state.baCode,
        }
        this.props.getCostCenter(criteria);
    }

    render() {
        const { data, loading } = this.props;

        const columns = [
          {
            Header: '',
            width: 110,
            accessor: 'id',
            Cell: props =>
            <div>
               <Button
                color='primary'
                className='btn-sm mr-1'
                onClick={() => this.onButtonEditClick(props.value)}
                >
                Edit
              </Button>&nbsp;
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
            Header: 'Cost Center Code',
            accessor: 'costCenterCode'
          },
          {
            Header: 'Cost center',
            accessor: 'baCode'
          },
          {
            Header: 'Description',
            accessor: 'costCenterDesc'
          },]

          return (
            <div>
            <BlockUi tag="div" blocking={loading}>
              <Fade>
                <Row>
                    <Col>
                        <div>
                        <Row className="mb-4">
                            <Col>
                                <div>
                                    <div className="btn-group">
                                    <button
                                        type="button"
                                        className="btn btn-primary mB-10"
                                        onClick={this.onButtonAddClick}
                                    >
                                    &nbsp;Add
                                    </button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        </div>
                    <Card>
                    <CardHeader>Search Criteria
                            <div className='card-header-actions'>
                            <Button color='link' className='card-header-action btn-minimize'
                                data-target='#collapseBody' onClick={this.toggle}>
                                <i className='icon-arrow-up'></i></Button>
                            </div>
                        </CardHeader>
                      <Collapse isOpen={this.state.collapse} id='collapseBody'>
                      <CardBody>
                          <div className="form-horizontal">
                              <FormGroup row>
                                  <Col md="3">
                                      <Label>Cost Center Code</Label>
                                  </Col>
                                  <Col xs="12" md="9">
                                      <Input
                                      type="input"
                                      name="costCenterCode"
                                      value={this.state.costCenterCode}
                                      onChange={this.onInputCostCenterCodeChange}
                                      />
                                  </Col>
                              </FormGroup>
                              <FormGroup row>
                                  <Col md="3">
                                      <Label>Cost center Code</Label>
                                  </Col>
                                  <Col xs="12" md="9">
                                      <Input
                                      type="input"
                                      name="baCode"
                                      value={this.state.baCode}
                                      onChange={this.onInputBaCodeChange}
                                      />
                                  </Col>
                              </FormGroup>              
                              <FormGroup row>
                                  <Col md="3" />
                                      <Col xs="12" md="9">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        onClick={this.onButtonSearchClick}
                                        >
                                        Search
                                    </Button>&nbsp;
                                    <Button
                                        type="button"
                                        color="danger"
                                        onClick={this.onButtonResetClick}
                                        >
                                        Clear
                                    </Button>
                                  </Col>
                              </FormGroup>
                          </div>
                        </CardBody>
                      </Collapse>
                    </Card>
                  </Col>
                </Row>
                <Card>
                      <Row className="mb-4">
                      <Col>
                          <ReactTable
                              className="-striped -highlight"
                              className="-striped -highlight"
                              columns={columns}
                              data={data.content}
                              pages={data.totalPages}
                              defaultPageSize={this.state.pageSize}
                              onGridFetchData={this.onGridFetchData}
                              loading={loading}
                              manual
                          />
                      </Col>
                      </Row>
                  </Card>
              </Fade>
            </BlockUi>
          </div>
          );
    }
}


    const mapStateToProps = state => ({
        data: state.get('costCenterReducer').data,
        loading: state.get('costCenterReducer').loading,
        currentAction: state.get("costCenterReducer").currentAction
    });
  
    const mapDispatchToProps = dispatch => {
        return {
            getCostCenterByCriteria: (criteria) => {
                dispatch(getCostCenterByCriteria(criteria));
            },
            deleteCostCenter: (id) => {
                dispatch(deleteCostCenter(id));
            }
        };
    };
  
    const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
    const withReducer = injectReducer({
        key: 'costCenterReducer',
        reducer: costCenterReducer,
    });
  
    const withSaga = injectSaga({
        key: 'costCenterSaga',
        saga: costCenterSaga,
    });
  
    export default compose(
        withReducer,
        withSaga,
        withConnect,
    )(View);
  