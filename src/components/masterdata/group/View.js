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
    Row
} from "reactstrap";
import Switch from "react-switch";

import axios from "axios";
import PropTypes from "prop-types";
import { getGroup, deleteGroup, getClient, getPrivileges } from './Action';
import { groupReducer } from './Reducer';
import { groupSaga } from './Saga';
import { deleteData } from "../../controls/MessageBox";
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

class View extends Component {
   
    constructor(props) {
        super(props);
    
        this.state = {
            groupName: '',
            clientName: '',
            operatorName: '',
            portGsmName: '',
            privileges: '',
            groupStatus: false,
            privilegeTempName:'',
            pageIndex: 0,
            pageSize: 10,
            sort: {
                field: "groupName",
                direction: "asc"
            },
            prevAction: null
        };

        this.baseState = this.state 

        this.clientFields = { text: 'Clients', value: 'Id' };
        this.prefixFields = { text: 'Prefixs', value: 'Id' };
        this.portGsmFields = { text: 'PortGsm', value: 'Id' };
        this.privilegesFields = { text: 'Privileges', value: 'Id' };

        this.onInputgroupNameChange = this.onInputgroupNameChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onChangePrefix = this.onChangePrefix.bind(this);
        this.onChangePrivileges = this.onChangePrivileges.bind(this);
        this.onGridRowDeleteClick = this.onGridRowDeleteClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onChangeGroupStatus = this.onChangeGroupStatus.bind(this);
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onChangePrefix(e) {
        this.setState({operatorName:e.target.value})
    }

    onChangePortGsm(e) {
        this.setState({portGsmName: e.target.value})
    }

    onChangePrivileges(e) {
        this.setState({privileges:e.target.value})
    }

    componentDidMount() {
        this.search();
        this.props.getClient(null);
        this.props.getPrivileges(null);
    }

    onInputgroupNameChange(e) {
        this.setState({ groupName: e.target.value });
    }

    onSearchClick(e) {
        this.search();
    }

    onAddClick() {
        this.props.history.push("/masterdata/group/add");
    }

    onClearClick() {
        this.setState(this.baseState);
    }

    onGridRowDeleteClick(props, id) {
        deleteData(props, id, this.onDelete);
    }
    
    onDelete(props, id, confirm) {
        if (confirm.value == true) {
            props.deleteGroup(id);
        }
    }

    onChangeClient = event => {
        var index = event.nativeEvent.target.selectedIndex;
        this.setState({ id: event.nativeEvent.target[index].text, clientName: event.target.value });
    }

    
    onChangeGroupStatus(checked) {
        this.setState({ checked });
    }

    search() {
        var criteria = {
            groupName: this.state.groupName,
            clientName: this.state.clientName,
            operatorName: this.state.operatorName,
            portGsmName: this.state.portGsmName,
            privileges: this.state.privileges,
            groupStatus: this.state.groupStatus==true?1:0,
            privilegeTempName:this.state.privilegeTempName,
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize,
            sortField: this.state.sort.field,
            sortDirection: this.state.sort.direction,
        }
        this.props.getGroup(criteria);
    }

    render() {
        const { data, loading , client, privileges} = this.props;
        const columns = [
          {
            Header: '',
            width: 110,
            accessor: 'id',
            Cell: props =>
            <div>
                <a className="btn btn-sm btn-primary" href={'#/masterdata/group/edit/' + props.value}>
                Edit
                </a>&nbsp;
                {/* <a className="btn btn-sm btn-danger" onClick={() => this.onGridRowDeleteClick(this.props, props.value)}>
                    Delete
                </a> */}
            </div>
          },
          {
            Header: 'Group',
            accessor: 'groupName'
          },
          {
            Header: 'Client',
            accessor: 'clientName'
          },
          {
            Header: 'Operator',
            accessor: 'joinOperatorName'
          },
          {
            Header: 'Port GSM',
            accessor: 'joinPortGsmModemName'
          },
          {
            Header: 'Privileges',
            accessor: 'joinPrevilegeTempName'
          }, {
            Header: 'Status',
            accessor: 'groupStatus'
          },]

          return (
            <div>
              <BlockUi tag="div" blocking={loading}>
                <Fade>
                  <Row>
                    <Col>
                      <Card>
                        <CardHeader>Search Criteria</CardHeader>
                        <CardBody>
                            <div className="form-horizontal">
                                <FormGroup row>
                                <Col md="3">
                                    <Label>Group Name</Label>
                                </Col>
                                <Col xs="12" md="6">
                                    <Input
                                    type="input"
                                    name="groupName"
                                    value={this.state.groupName}
                                    onChange={this.onInputgroupNameChange}
                                    placeholder="Enter Group"
                                    />
                                </Col>
                                </FormGroup>
                                <FormGroup row>
                                        <Col md="3">
                                            <Label>Client</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input
                                                type='select'
                                                name='clientName'
                                                value={this.state.clientName}
                                                onChange={this.onChangeClient}
                                            >
                                            <option value=''>Select Client</option>
                                            {client.map((e, key) => {
                                                return <option key={key} value={e.id}> {e.clientName} </option>
                                            })}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>Operator</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input
                                            type="input" id="operatorName" name="operatorName" onChange={this.onChangePrefix}
                                            placeholder="Enter Operator Name" value={this.state.operatorName}
                                        />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>Port GSM</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Input
                                                type="input" id="portGsmName" name="portGsmName" onChange={this.onChangePortGsm.bind(this)}
                                                placeholder="Enter Port GSM" value={this.state.portGsmName}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>Privileges</Label>
                                        </Col>
                                        <Col xs="12" md="6">
                                            {/* <DropDownListComponent id="privileges" name="privileges" change={this.onChangePrivileges.bind(this)} dataSource={this.privilegesList} ref={(dropdownlist) => { this.listPrivilege = dropdownlist; }} fields={this.privilegesFields} placeholder="Select a Privilege Template" value={this.state.privileges} popupHeight="220px"/> */}
                                            <Input
                                                type='select'
                                                name='privileges'
                                                value={this.state.privileges}
                                                onChange={this.onChangePrivileges}
                                            >
                                            <option value=''>Select Privileges</option>
                                            {privileges.map((e, key) => {
                                                return <option key={key} value={e.previlegeTemplateId}> {e.previlegeTemplateName} </option>
                                            })}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                <FormGroup row>
                                    <Col md="3" />
                                    <Col xs="12" md="9">
                                        <Button
                                            type="submit"
                                            color="primary"
                                            onClick={this.onSearchClick}
                                            >
                                            Search
                                        </Button>&nbsp;
                                        <Button
                                            type="button"
                                            color="danger"
                                            onClick={this.onClearClick}
                                            >
                                            Clear
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col>
                        <div>
                            <div className="btn-group">
                            <button
                                type="button"
                                className="btn btn-primary mB-10"
                                onClick={this.onAddClick}
                            >
                                +
                            </button>
                            </div>
                        </div>
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
                            page={this.state.page}
                            defaultPageSize={this.state.size}
                            onPageChange={this.onPageChange}
                            
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
        data: state.get('groupReducer').data,
        loading: state.get('groupReducer').loading,
        client: state.get('groupReducer').client,
        privileges: state.get('groupReducer').privileges
    });
    
    const mapDispatchToProps = dispatch => {
        return {
            getClient: (action) => {
                dispatch(getClient(action));
            },
            getGroup: (criteria) => {
                dispatch(getGroup(criteria));
            },
            getPrivileges: (criteria) => {
                dispatch(getPrivileges(criteria));
            },
            deleteGroup: (id) => {
                dispatch(deleteGroup(id));
            }
        };
    };
  
    const withConnect = connect(mapStateToProps, mapDispatchToProps);
    
    const withReducer = injectReducer({
        key: 'groupReducer',
        reducer: groupReducer,
    });
  
    const withSaga = injectSaga({
        key: 'groupSaga',
        saga: groupSaga,
    });
  
    export default compose(
        withReducer,
        withSaga,
        withConnect,
    )(View);
    