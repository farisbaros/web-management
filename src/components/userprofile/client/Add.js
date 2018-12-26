import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { configureStore, injectReducer, injectSaga } from 'redux-inject-reducer-and-saga';
import BlockUi from 'react-block-ui';
import { Card, CardBody, CardHeader, Fade, Col, Row, Table, Form, FormGroup,
         Label, Input, CardFooter, Button, Alert, ListGroup, ListGroupItem
        } from 'reactstrap';

import Switch from 'react-switch';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ReactTable from 'react-table';

import {
    addClient,
    getVendor,
    getOperator,
    getGsmPort,
    getClientGsm,
    ADD_CLIENT_SUCCESS,
    ADD_CLIENT_FAIL,
    GET_VENDOR_SUCCESS,
    GET_VENDOR_FAIL,
    GET_OPERATOR_SUCCESS,
    GET_OPERATOR_FAIL,
    GET_GSM_PORT_SUCCESS,
    GET_GSM_PORT_FAIL,
    GET_CLIENT_GSM_SUCCESS,
    GET_CLIENT_GSM_FAIL
} from './Action';
import { clientReducer } from './Reducer';
import { clientSaga } from './Saga';

import { messages } from '../../controls/MessageBox';
import * as message from '../../../utils/Messages';

const initialState = {
    listError: [],
    currentAction: '',
    clientName: '',
    senderId: '',
    redundancyCheck: true,
    renewCreditUsage: 1,
    invoiceType: 'Client',
    activeStatus: true,
    hostToHost: true,
    iPAllowance: '',
    pricingSchema: 'SMS',
    showPricingSMS: true,
    showPricingOperator: false,
    showPricingChannel: false,
    showPricingVolume: false,
    listVendor: [],
    listOperator: [],
    listGsmPort: [],
    listClientGsm: [],
    clientVendorOperators: [],
    clientGSMs: [],
    clientPricingPerSMSs: [],
    clientPricingPerOperators: [],
    clientPricingPerChannels: [],
    clientPricingPerVolumes: []
}

class AddClient extends Component {

    constructor() {
        super();
        this.state = initialState;
        
        this.onInputClientNameChange = this.onInputClientNameChange.bind(this);
        this.onInputSenderIdChange = this.onInputSenderIdChange.bind(this);
        this.onInputStatusChange = this.onInputStatusChange.bind(this);
        
        this.onInputRedundancyCheckChange = this.onInputRedundancyCheckChange.bind(this);
        this.onInputRenewCreditUsageChange = this.onInputRenewCreditUsageChange.bind(this);
        this.onInputInvoiceTypeChange = this.onInputInvoiceTypeChange.bind(this);
        
        this.onInputHostToHostChange = this.onInputHostToHostChange.bind(this);
        this.onInputIPAllowanceChange = this.onInputIPAllowanceChange.bind(this);
        
        this.onInputPricingSchemaChange = this.onInputPricingSchemaChange.bind(this);

        this.renderCellPricingSms = this.renderCellPricingSms.bind(this);
        this.onButtonAddPricingSmsClick = this.onButtonAddPricingSmsClick.bind(this);
        this.onButtonDeletePricingSmsClick = this.onButtonDeletePricingSmsClick.bind(this);

        this.renderCellPricingOperator = this.renderCellPricingOperator.bind(this);
        this.onButtonAddPricingOperatorClick = this.onButtonAddPricingOperatorClick.bind(this);
        this.onButtonDeletePricingOperatorClick = this.onButtonDeletePricingOperatorClick.bind(this);

        this.renderCellPricingChannel = this.renderCellPricingChannel.bind(this);
        this.onButtonAddPricingChannelClick = this.onButtonAddPricingChannelClick.bind(this);
        this.onButtonDeletePricingChannelClick = this.onButtonDeletePricingChannelClick.bind(this);
        
        this.renderCellPricingVolume = this.renderCellPricingVolume.bind(this);
        this.onButtonAddPricingVolumeClick = this.onButtonAddPricingVolumeClick.bind(this);
        this.onButtonDeletePricingVolumeClick = this.onButtonDeletePricingVolumeClick.bind(this);
        
        this.renderCellVendorOperator = this.renderCellVendorOperator.bind(this);
        this.onButtonAddVendorOperatorClick = this.onButtonAddVendorOperatorClick.bind(this);
        this.onButtonDeleteVendorOperatorClick = this.onButtonDeleteVendorOperatorClick.bind(this);

        this.onInputClientOperatorChange = this.onInputClientOperatorChange.bind(this);
        this.onInputClientVendorChange = this.onInputClientVendorChange.bind(this);

        this.onButtonSaveClick = this.onButtonSaveClick.bind(this);
        this.onButtonBackClick = this.onButtonBackClick.bind(this);
        this.onButtonDismissClick = this.onButtonDismissClick.bind(this);

        //this.onButtonAddGSM = this.onButtonAddGSM.bind(this);
        //this.onButtonDeleteGSM = this.onButtonDeleteGSM.bind(this);
    }

    componentDidMount() {
        this.props.getVendor();
        this.props.getOperator();
        this.props.getGsmPort();
        this.props.getClientGsm();
    }

    componentWillReceiveProps(props) {
        const currentAction = props.currentAction;
        
        if (currentAction === ADD_CLIENT_SUCCESS) {
            messages('Success', message.DATA_ADD_SUCCESS, 'success', false);
    
            this.props.history.push('/userprofile/client');
        } else if (currentAction === ADD_CLIENT_FAIL) {
            messages('Error', 'Failed to Add Client', 'error', false);
        } else if (currentAction === GET_VENDOR_SUCCESS) {
            this.setState({listVendor: props.dataVendor});
        } else if (currentAction === GET_VENDOR_FAIL) {
            //messages('Error', 'Failed to Get Vendor', 'error', false);
        } else if (currentAction === GET_OPERATOR_SUCCESS) {
            this.setState({listOperator: props.dataOperator});
        } else if (currentAction === GET_OPERATOR_FAIL) {
            //messages('Error', 'Failed to Get Operator', 'error', false);
        } else if (currentAction === GET_GSM_PORT_SUCCESS) {
            this.setState({listGsmPort: props.dataGsmPort});
        } else if (currentAction === GET_GSM_PORT_FAIL) {
            //messages('Error', 'Failed to Get GSM Port', 'error', false);
        } else if (currentAction === GET_CLIENT_GSM_SUCCESS) {
            this.setState({listClientGsm: props.dataClientGsm});
        } else if (currentAction === GET_CLIENT_GSM_FAIL) {
            //messages('Error', 'Failed to Get Client GSM', 'error', false);
        }
    }
    
    onInputClientNameChange(event){
        this.setState({clientName : event.target.value});
    }

    onInputSenderIdChange(event){
        this.setState({senderId : event.target.value});
    }

    onInputHostToHostChange(event){
        if (event.target.value == 'Yes') {
            this.setState({hostToHost : true});
        } else {
            this.setState({hostToHost : false});
        }

        this.setState({iPAllowance : ''});
    }

    onInputIPAllowanceChange(event){
        this.setState({iPAllowance : event.target.value});
    }

    onInputStatusChange(event){
        this.setState({activeStatus : event.target.value});
    }

    onInputRedundancyCheckChange(event){
        this.setState({redundancyCheck : event.target.value});
    }

    onInputRenewCreditUsageChange(event){
        this.setState({renewCreditUsage : parseInt(event.target.value)});
    }

    onInputInvoiceTypeChange(event){
        this.setState({invoiceType : event.target.value});
    }

    onInputPricingSchemaChange(event){
        this.setState({pricingSchema : event.target.value});

        if (event.target.value == 'SMS') {
            this.setState({
                showPricingSMS: true,
                showPricingOperator: false,
                showPricingChannel: false,
                showPricingVolume: false,
                clientPricingPerOperators: [],
                clientPricingPerChannels: [],
                clientPricingPerVolumes: []
            });
        } else if (event.target.value == 'Operator') {
            this.setState({
                showPricingSMS: false,
                showPricingOperator: true,
                showPricingChannel: false,
                showPricingVolume: false,
                clientPricingPerSMSs: [],
                clientPricingPerChannels: [],
                clientPricingPerVolumes: []
            });
        } else if (event.target.value == 'Channel') {
            this.setState({
                showPricingSMS: false,
                showPricingOperator: false,
                showPricingChannel: true,
                showPricingVolume: false,
                clientPricingPerSMSs: [],
                clientPricingPerOperators: [],
                clientPricingPerVolumes: []
            });
        } else {
            this.setState({
                showPricingSMS: false,
                showPricingOperator: false,
                showPricingChannel: false,
                showPricingVolume: true,
                clientPricingPerSMSs: [],
                clientPricingPerOperators: [],
                clientPricingPerChannels: []
            });
        }
    }

    renderCellPricingSms(cellInfo) {
        return (
          <div
            style={{ backgroundColor: '#fafafa' }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.clientPricingPerSMSs];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ data });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.clientPricingPerSMSs[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
    }
    
    onButtonAddPricingSmsClick(event) {
        var object = {
            id: 0,
            clientId: 0,
            clientName: this.state.clientName,
            type: '',
            price: 0.0
        };

        var data = this.state.clientPricingPerSMSs;
        data.push(object);

        this.setState({clientPricingPerSMSs: data });
    }

    onButtonDeletePricingSmsClick(index) {
        var data = this.state.clientPricingPerSMSs;
        data.splice(index, 1);

        this.setState({clientPricingPerSMSs: data });
    }

    renderCellPricingOperator(cellInfo) {
        return (
          <div
            style={{ backgroundColor: '#fafafa' }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.clientPricingPerOperators];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ data });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.clientPricingPerOperators[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
    }
    
    onButtonAddPricingOperatorClick(event) {
        var object = {
            id: 0,
            clientId: 0,
            clientName: this.state.clientName,
            operator: '',
            vendor: '',
            price: 0.0
        };

        var data = this.state.clientPricingPerOperators;
        data.push(object);

        this.setState({clientPricingPerOperators : data});
    }

    onButtonDeletePricingOperatorClick(index) {
        var data = this.state.clientPricingPerOperators;
        data.splice(index, 1);

        this.setState({clientPricingPerOperators : data});
    }

    renderCellPricingChannel(cellInfo) {
        return (
          <div
            style={{ backgroundColor: '#fafafa' }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.clientPricingPerChannels];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ data });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.clientPricingPerChannels[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
    }

    onInputPricingChannelType(props) {
        alert(props.value);
        alert(props.index);
        alert(props.name);
    }
    
    onButtonAddPricingChannelClick(event) {
        var object = {
            id: 0,
            clientId: 0,
            clientName: this.state.clientName,
            type: '',
            price: 0.0
        };

        var data = this.state.clientPricingPerChannels;
        data.push(object);

        this.setState({clientPricingPerChannels : data});
    }

    onButtonDeletePricingChannelClick(index) {
        var data = this.state.clientPricingPerChannels;
        data.splice(index, 1);



        this.setState({clientPricingPerChannels : data});
    }

    renderCellPricingVolume(cellInfo) {
        return (
          <div
            style={{ backgroundColor: '#fafafa' }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.clientPricingPerVolumes];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ data });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.clientPricingPerVolumes[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
    }
    
    onButtonAddPricingVolumeClick(event) {
        var object = {
            id: 0,
            clientId: 0,
            clientName: this.state.clientName,
            startVolume: 0,
            endVolume: 0,
            price: 0.0
        };

        var data = this.state.clientPricingPerVolumes;
        data.push(object);

        this.setState({clientPricingPerVolumes : data});
    }

    onButtonDeletePricingVolumeClick(index) {
        var data = this.state.clientPricingPerVolumes;
        data.splice(index, 1);

        this.setState({clientPricingPerVolumes : data});
    }

    renderCellVendorOperator(cellInfo) {
        return (
          <div
            style={{ backgroundColor: '#fafafa' }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const data = [...this.state.clientVendorOperators];
              data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ data });
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.clientVendorOperators[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
    }

    onInputClientOperatorChange(props) {
        alert(props.value);
        alert(props.index);
    }

    onInputClientVendorChange(event) {
        alert(event.target.value);
        alert(event.target.index);
    }
    
    onButtonAddVendorOperatorClick(event) {
        var object = {
            id: 0,
            clientId: 0,
            clientName: this.state.clientName,
            type: '',
            price: 0.0
        };

        var data = this.state.clientVendorOperators;
        data.push(object);

        this.setState({clientVendorOperators: data });
    }

    onButtonDeleteVendorOperatorClick(index) {
        var data = this.state.clientVendorOperators;
        data.splice(index, 1);

        this.setState({clientVendorOperators: data });
    }

    onButtonBackClick(){
        this.props.history.goBack();
    }

    onButtonDismissClick() {
        this.setState({ currentAction: '' });
    }

    onButtonSaveClick() {
        if (this.isValid()) {
          this.props.addClient({
            clientName: this.state.clientName,
            senderId: this.state.senderId,
            redundancyCheck: this.state.redundancyCheck,
            renewCreditUsage: this.state.renewCreditUsage,
            invoiceType: this.state.invoiceType,
            activeStatus: this.state.activeStatus,
            hostToHost: this.state.hostToHost,
            iPAllowance: this.state.iPAllowance,
            pricingSchema: this.state.pricingSchema,
            clientVendorOperators: this.state.clientVendorOperators,
            clientGSMs: this.state.clientGSMs,
            clientPricingPerSMSs: this.state.clientPricingPerSMSs,
            clientPricingPerOperators: this.state.clientPricingPerOperators,
            clientPricingPerChannels: this.state.clientPricingPerChannels,
            clientPricingPerVolumes: this.state.clientPricingPerVolumes
          });
        }
    }
    
    isValid() {
        let isValid = true;
        this.state.listError = [];
        this.setState({ isValid: isValid, currentAction: '' });
        let re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let reNum = /^[0-9\b]+$/;
    
        if (this.state.clientName ==='' || this.state.clientName.trim() === '') {
          this.state.listError.push('Client Name is required');
        }

        if (this.state.senderId ==='' || this.state.senderId.trim() === '') {
          this.state.listError.push('Sender ID is required');
        }
    
        if (this.state.hostToHost) {
            if (this.state.iPAllowance ==='' || this.state.iPAllowance.trim() === '') {
                this.state.listError.push('IP Allowance is required');
            }
        }
    
        if (this.state.listError.length > 0) {
          isValid = false;
        }
    
        this.setState({isValid : isValid});
    
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
                            <strong>Add Client</strong>
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

                        {this.state.currentAction === ADD_CLIENT_SUCCESS ?
                        <div className='alert alert-success alert-dismissible fade show' role='alert'>
                        <strong>Add client success!</strong>
                        <button type='button' className='close' data-dismiss='alert' aria-label='Close' onClick={this.onButtonDismissClick}>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                        </div>
                        : false }

                        {this.state.currentAction === ADD_CLIENT_FAIL ?
                        <div className='alert alert-danger alert-dismissible fade show' role='alert'>
                        <strong>Add client fail!</strong>
                        <button type='button' className='close' data-dismiss='alert' aria-label='Close' onClick={this.onButtonDismissClick}>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                        </div>
                        : false }
                        <Form className='form-horizontal'>
                        <Row>
                        <Col>
                            <FormGroup row>
                                <Col md='3'>
                                    <Label htmlFor='txtClientName'>Client Name</Label>
                                </Col>
                                <Col xs='12' md='9'>
                                    <Input type='text' required id='txtClientName' name='txtClientName' value={this.state.clientName} onChange={this.onInputClientNameChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md='3'>
                                    <Label htmlFor='txtSenderId'>Sender ID</Label>
                                </Col>
                                <Col xs='12' md='9'>
                                    <Input type='text' required id='txtSenderId' name='txtSenderId' value={this.state.senderId} onChange={this.onInputSenderIdChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md='3'>
                                    <label htmlFor='selectRedundancyCheck'>Redundancy Check</label>
                                </Col>
                                <Col xs='12' md='9'>
                                    <Input type='select' name='selectRedundancyCheck'
                                    value={this.state.redundancyCheck}
                                    onChange={this.onInputRedundancyCheckChange}>
                                        <option value='true'>Yes</option>
                                        <option value='false'>No</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md='3'>
                                    <Label htmlFor='selectRenewCreditUsage'>Renew Credit Usage</Label>
                                </Col>
                                <Col xs='12' md='9'>
                                    <Input type='select' name='selectRenewCreditUsage'
                                      onChange={this.onInputRenewCreditUsageChange}>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                        <option>25</option>
                                        <option>26</option>
                                        <option>27</option>
                                        <option>28</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md='3'>
                                    <label htmlFor='selectInvoiceType'>Invoice Type</label>
                                </Col>
                                <Col xs='12' md='9'>
                                    <Input type='select' name='selectInvoiceType'
                                    value={this.state.invoiceType}
                                    onChange={this.onInputInvoiceTypeChange}>
                                        <option value='Client'>Client</option>
                                        <option value='Group'>Group</option>
                                        <option value='CostCenter'>Cost Center</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md='3'>
                                    <label htmlFor='selectStatus'>Status</label>
                                </Col>
                                <Col xs='12' md='9'>
                                    <Input type='select' name='selectStatus'
                                    value={this.state.activeStatus}
                                    onChange={this.onInputStatusChange}>
                                        <option value='true'>Active</option>
                                        <option value='false'>Inactive</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <Alert color='secondary'>
                                <b>Host To Host</b>
                            </Alert>
                            <FormGroup row>
                                <Col md='3'>
                                    <label htmlFor='selectHostToHost'>Host To Host</label>
                                </Col>
                                <Col xs='12' md='9'>
                                    <Input type='select' name='selectHostToHost'
                                    onChange={this.onInputHostToHostChange}>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md='3'>
                                    <Label htmlFor='txtIPAllowance'>IP Allowance</Label>
                                </Col>
                                <Col xs='12' md='9'>
                                    <Input type='text' id='txtIPAllowance' name='txtIPAllowance'
                                        value={this.state.iPAllowance} onChange={this.onInputIPAllowanceChange}
                                        disabled={!this.state.hostToHost} />
                                </Col>
                            </FormGroup>
                            <Alert color='secondary'>
                                <b>Masking</b>
                            </Alert>
                            <FormGroup row>
                                <Col>
                                    <Row className='mb-4'>
                                        <Col>
                                            <Button color='primary' className='btn-sm'
                                                    onClick={this.onButtonAddVendorOperatorClick}><i className='fa fa-plus'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className='mb-4'>
                                        <Col>
                                            <ReactTable
                                                
                                                className='-striped -highlight'
                                                columns={[
                                                    {
                                                        Header: 'Operator',
                                                        accessor: 'operator',
                                                        Cell: props => (
                                                            <div>
                                                                <Input type='select' name='selectOperator'
                                                                onChange={() => this.onInputClientOperatorChange(props)}>
                                                                    <option value='Operator1'>Operator 1</option>
                                                                    <option value='Operator2'>Operator 2</option>
                                                                </Input>
                                                            </div>
                                                            )
                                                    },
                                                    {
                                                        Header: 'Vendor',
                                                        accessor: 'Vendor',
                                                        Cell: props => (
                                                            <div>
                                                                <Input type='select' name='selectVendor'
                                                                onChange={this.onInputClientVendorChange}>
                                                                    <option value='Vendor1'>Vendor 1</option>
                                                                    <option value='Vendor2'>Vendor 2</option>
                                                                </Input>
                                                            </div>
                                                            )
                                                    },
                                                    {
                                                        Header: '',
                                                        width: 40,
                                                        accessor: 'id',
                                                        Cell: props => (
                                                        <div>
                                                            <Button color='danger' className='btn-sm'
                                                            onClick={() => this.onButtonDeleteVendorOperatorClick(props)}>
                                                                <i className='fa fa-trash'></i>
                                                            </Button>
                                                        </div>
                                                        )
                                                    }
                                                ]}
                                                data={this.state.clientVendorOperators}
                                                pageSize={this.state.clientVendorOperators.length}
                                                showPagination={false}
                                                noDataText=''
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </FormGroup>
                            <Alert color='secondary'>
                                <b>Long Number</b>
                            </Alert>
                            {/* <FormGroup row>
                                <Col>
                                    <Button color='primary' className='btn-sm'
                                            onClick={this.onButtonAddPricingSmsClick}><i className='fa fa-plus'></i>
                                    </Button>
                                    <ReactTable
                                        
                                        className='-striped -highlight'
                                        columns={[
                                            {
                                                Header: 'Type',
                                                accessor: 'type',
                                                Cell: this.renderCellPricingSms
                                            },
                                            {
                                                Header: 'Price',
                                                accessor: 'price',
                                                Cell: this.renderCellPricingSms
                                            },
                                            {
                                                Header: '',
                                                width: 40,
                                                accessor: 'id',
                                                Cell: props => (
                                                <div>
                                                    <Button color='danger' className='btn-sm'
                                                    onClick={() => this.onButtonDeletePricingSmsClick(props)}
                                                    ><i className='fa fa-trash'></i>
                                                    </Button>
                                                </div>
                                                )
                                            }
                                        ]}
                                        data={this.state.clientPricingPerSMSs}
                                        pageSize={this.state.clientPricingPerSMSs.length}
                                        showPagination={false}
                                        noDataText=''
                                    />
                                </Col>
                            </FormGroup> */}
                            <Alert color='secondary'>
                                    <b>Pricing</b>
                                </Alert>
                                <FormGroup row>
                                    <Col md='3'>
                                        <label htmlFor='selectPricingSchema'>Pricing Schema</label>
                                    </Col>
                                    <Col xs='12' md='9'>
                                        <Input type='select' name='selectPricingSchema'
                                        value={this.state.pricingSchema}
                                        onChange={this.onInputPricingSchemaChange}>
                                            <option>SMS</option>
                                            <option>Operator</option>
                                            <option>Channel</option>
                                            <option>Volume</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                {this.state.showPricingSMS &&
                                <Col>
                                    <Row className='mb-4'>
                                        <Col>
                                            <Button color='primary' className='btn-sm'
                                                    onClick={this.onButtonAddPricingSmsClick}><i className='fa fa-plus'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className='mb-4'>
                                        <Col>
                                            <ReactTable
                                                className='-striped -highlight'
                                                columns={[
                                                    {
                                                        Header: 'Type',
                                                        accessor: 'type',
                                                        Cell: this.renderCellPricingSms
                                                    },
                                                    {
                                                        Header: 'Price',
                                                        accessor: 'price',
                                                        Cell: this.renderCellPricingSms
                                                    },
                                                    {
                                                        Header: '',
                                                        width: 40,
                                                        accessor: 'id',
                                                        Cell: props => (
                                                        <div>
                                                            <Button color='danger' className='btn-sm'
                                                            onClick={() => this.onButtonDeletePricingSmsClick(props)}
                                                            ><i className='fa fa-trash'></i>
                                                            </Button>
                                                        </div>
                                                        )
                                                    }
                                                ]}
                                                data={this.state.clientPricingPerSMSs}
                                                pageSize={this.state.clientPricingPerSMSs.length}
                                                showPagination={false}
                                                noDataText=''
                                            />
                                        </Col>
                                    </Row>
                                </Col>}
                                {this.state.showPricingOperator &&
                                <Col>
                                    <Row className='mb-4'>
                                        <Col>
                                            <Button color='primary' className='btn-sm'
                                                    onClick={this.onButtonAddPricingOperatorClick}><i className='fa fa-plus'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className='mb-4'>
                                        <Col>
                                            <ReactTable
                                                className='-striped -highlight'
                                                columns={[
                                                    {
                                                        Header: 'Operator',
                                                        accessor: 'operatorId',
                                                        Cell: this.renderCellPricingOperator
                                                    },
                                                    {
                                                        Header: 'Price',
                                                        accessor: 'price',
                                                        Cell: this.renderCellPricingOperator
                                                    },
                                                    {
                                                        Header: '',
                                                        width: 40,
                                                        accessor: 'id',
                                                        Cell: props => (
                                                        <div>
                                                            <Button color='danger' className='btn-sm'
                                                            onClick={() => this.onButtonDeletePricingOperatorClick(props)}
                                                            ><i className='fa fa-trash'></i>
                                                            </Button>
                                                        </div>
                                                        )
                                                    }
                                                ]}
                                                data={this.state.clientPricingPerOperators}
                                                pageSize={this.state.clientPricingPerOperators.length}
                                                showPagination={false}
                                                noDataText=''
                                            />
                                        </Col>
                                    </Row>
                                </Col>}
                                {this.state.showPricingChannel &&
                                <Col>
                                    <Row className='mb-4'>
                                        <Col>
                                            <Button color='primary' className='btn-sm'
                                                    onClick={this.onButtonAddPricingChannelClick}><i className='fa fa-plus'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className='mb-4'>
                                        <Col>
                                            <ReactTable
                                                className='-striped -highlight'
                                                columns={[
                                                    {
                                                        Header: 'Type',
                                                        accessor: 'type',
                                                        Cell: props => (
                                                        <div>
                                                            <Input type='select' name='selectChannelType'
                                                            onChange={() => this.onInputPricingChannelType(props)}>
                                                                <option value='masking'>Masking</option>
                                                                <option value='longnumber'>Long Number</option>
                                                            </Input>
                                                        </div>
                                                        )
                                                    },
                                                    {
                                                        Header: 'Price',
                                                        accessor: 'price',
                                                        Cell: this.renderCellPricingChannel
                                                    },
                                                    {
                                                        Header: '',
                                                        width: 40,
                                                        accessor: 'id',
                                                        Cell: props => (
                                                        <div>
                                                            <Button color='danger' className='btn-sm'
                                                            onClick={() => this.onButtonDeletePricingChannelClick(props)}
                                                            ><i className='fa fa-trash'></i>
                                                            </Button>
                                                        </div>
                                                        )
                                                    }
                                                ]}
                                                data={this.state.clientPricingPerChannels}
                                                pageSize={this.state.clientPricingPerChannels.length}
                                                showPagination={false}
                                                noDataText=''
                                            />
                                        </Col>
                                    </Row>
                                </Col>}
                                {this.state.showPricingVolume &&
                                <Col>
                                    <Row className='mb-4'>
                                        <Col>
                                            <Button color='primary' className='btn-sm'
                                                    onClick={this.onButtonAddPricingVolumeClick}><i className='fa fa-plus'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className='mb-4'>
                                        <Col>
                                            <ReactTable
                                                className='-striped -highlight'
                                                columns={[
                                                    {
                                                        Header: 'Start Volume',
                                                        accessor: 'startVolume',
                                                        Cell: this.renderCellPricingVolume
                                                    },
                                                    {
                                                        Header: 'End Volume',
                                                        accessor: 'endVolume',
                                                        Cell: this.renderCellPricingVolume
                                                    },
                                                    {
                                                        Header: 'Price',
                                                        accessor: 'price',
                                                        Cell: this.renderCellPricingVolume
                                                    },
                                                    {
                                                        Header: '',
                                                        width: 40,
                                                        accessor: 'id',
                                                        Cell: props => (
                                                        <div>
                                                            <Button color='danger' className='btn-sm'
                                                            onClick={() => this.onButtonDeletePricingVolumeClick(props)}
                                                            ><i className='fa fa-trash'></i>
                                                            </Button>
                                                        </div>
                                                        )
                                                    }
                                                ]}
                                                data={this.state.clientPricingPerVolumes}
                                                pageSize={this.state.clientPricingPerVolumes.length}
                                                showPagination={false}
                                                noDataText=''
                                            />
                                        </Col>
                                    </Row>
                                </Col>}
                            </FormGroup>
                        </Col>
                        </Row>
                        <div className='form-actions'>
                            <Button onClick={this.onButtonSaveClick} color='primary' className='btn-sm btn-save'>
                                <i className='fa fa-dot-circle-o' /> Save
                            </Button>
                            <Button onClick={this.onButtonBackClick} color='danger' className='btn-sm btn-cancel'>
                                <i className='fa fa-ban' /> Cancel
                            </Button>
                        </div>
                        </Form>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
            </Fade>
            </BlockUi>
        </div>
        )
    }
}

const mapStateToProps = state => ({
  data: state.get('clientReducer').data,
  loading: state.get('clientReducer').loading,
  currentAction: state.get('clientReducer').currentAction
});

const mapDispatchToProps = dispatch => {
  return {
    addClient: (model) => {
        dispatch(addClient(model));
    },
    getVendor: () => {
        dispatch(getVendor());
    },
    getOperator: () => {
        dispatch(getOperator());
    },
    getGsmPort: () => {
        dispatch(getGsmPort());
    },
    getClientGsm: () => {
        dispatch(getClientGsm());
    }
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

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
  withConnect,
)(AddClient);

//export default AddClient;