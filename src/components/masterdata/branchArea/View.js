import React, { Component } from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import { configureStore, injectReducer, injectSaga } from "redux-inject-reducer-and-saga";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import ReactTable from "react-table";
import * as ReactDOM from 'react-dom';
import { history } from "../../../services";

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

import PropTypes from "prop-types";
import {
    getBranchAreaBySearchCriteria,
    deleteBranchArea,
    DELETE_BRANCH_AREA_SUCCESS,
    DELETE_BRANCH_AREA_FAIL,
    GET_BRANCH_AREA,
    GET_BRANCH_AREA_FAIL
} from './Action';

import { branchAreaReducer } from './Reducer';
import { branchAreaSaga } from './Saga';
import Paper from '@material-ui/core/Paper';
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
    baCode: '',
    baDesc: '',
    area:'',
};

class View extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
    
        this.state = initialState;

        this.toggle = this.toggle.bind(this);
        this.onInputBranchAreaCodeChange = this.onInputBranchAreaCodeChange.bind(this);
        this.onInputBranchAreaChange = this.onInputBranchAreaChange.bind(this);
        this.onButtonSearchClick = this.onButtonSearchClick.bind(this);
        this.onButtonAddClick = this.onButtonAddClick.bind(this);
        this.onButtonEditClick = this.onButtonEditClick.bind(this);
        this.onButtonResetClick = this.onButtonResetClick.bind(this);
        this.onGridRowDeleteClick = this.onGridRowDeleteClick.bind(this);
        this.onGridFetchData = this.onGridFetchData.bind(this);
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidMount() {
        this.getBranchAreaBySearchCriteria();
    }

    componentWillReceiveProps(props) {
        const currentAction = props.currentAction;
    
        if (currentAction === DELETE_BRANCH_AREA_SUCCESS) {
          messages('Success', 'Branch area successfully deleted.', 'success', false);
    
          this.getUserBySearchCriteria();
        } else if (currentAction === DELETE_BRANCH_AREA_FAIL) {
          const error = props.error;
    
          handleApiError(props, error, 'Branch Area', 'Branch area is not deleted successfully.');
        } else if (currentAction === GET_BRANCH_AREA_FAIL) {
          const error = props.error;
    
          handleApiError(props, error, 'Branch Area', 'Failed to get branch area.');
        }
    }
    
    onButtonEditClick(id) {
        this.props.history.push('/masterdata/branchArea/edit/' + id);
    }

    onInputBranchAreaCodeChange(e) {
        this.setState({ baCode: e.target.value });
    }

    onInputBranchAreaChange(e) {
        this.setState({ area: e.target.value });
    }

    onButtonSearchClick(e) {
        this.getBranchAreaBySearchCriteria();
    }

    onButtonResetClick() {
        this.setState({ baCode: '', baDesc: '', area: '' });
        this.props.getBranchAreaBySearchCriteria();
    }

    onButtonAddClick() {
        this.props.history.push("/masterdata/branchArea/add");
    }

    onGridRowDeleteClick(args, id) {
        deleteData(args, id, this.onDelete);
    }
    
    onDelete(args, id, confirm) {
        if (confirm.value == true) {
          args.props.deleteBranchArea(id);
        }
    }

    getBranchAreaBySearchCriteria() {
        const criteria = {
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize,
            sortField: this.state.sort.field,
            sortDirection: this.state.sort.direction,
            baCode: this.state.baCode,
            baDesc: this.state.baDesc,
            area: this.state.area
          };
          this.props.getBranchAreaBySearchCriteria(criteria);
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
            this.getBranchAreaBySearchCriteria();
          })
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
            Header: 'Branch Area Code',
            accessor: 'baCode'
          },
          {
            Header: 'Area',
            accessor: 'area'
          },{
            Header: 'Description',
            accessor: 'baDesc'
          }]

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
                                        <Label>BA Code</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input
                                        type="input"
                                        name="baCode"
                                        value={this.state.baCode}
                                        onChange={this.onInputBranchAreaCodeChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Area</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input
                                        type="input"
                                        name="area"
                                        value={this.state.area}
                                        onChange={this.onInputBranchAreaChange}
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
                                        className="mr-1"
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
        data: state.get('branchAreaReducer').data,
        loading: state.get('branchAreaReducer').loading,
        currentAction: state.get("branchAreaReducer").currentAction
    });
  
    const mapDispatchToProps = dispatch => {
        return {
        getBranchAreaBySearchCriteria: (criteria) => {
            dispatch(getBranchAreaBySearchCriteria(criteria));
        },
        deleteBranchArea: (id) => {
          dispatch(deleteBranchArea(id))
        }
        };
    };
  
    const withConnect = connect(mapStateToProps, mapDispatchToProps);
    const withReducer = injectReducer({
        key: 'branchAreaReducer',
        reducer: branchAreaReducer,
    });
  
    const withSaga = injectSaga({
        key: 'branchAreaSaga',
        saga: branchAreaSaga,
    });
  
    export default compose(
        withReducer,
        withSaga,
        withConnect,
    )(View);
  