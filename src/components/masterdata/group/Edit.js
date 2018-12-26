import React, { Component } from 'react';
import { configureStore, injectReducer, injectSaga } from "redux-inject-reducer-and-saga";
import { compose } from 'redux';
import { connect } from "react-redux";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import { 
    Card, 
    CardBody, 
    CardHeader, 
    Fade, 
    Col, 
    Row, 
    FormGroup, 
    Label, 
    Input, 
    Button,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import ReactDOM from 'react-dom';

import { updateGroup, getClient , getOperator, getPortGsm, getGroupById, getPrivileges} from './Action';
import { groupReducer } from './Reducer';
import { groupSaga } from './Saga';

class Edit extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            listError: [],
            isValid: true, 
            collapse: true,
            fadeIn: true,
            timeout: 300,
            groupName: '',
            clientId:'',
            clientCode:'',
            operatorId:'',
            portGsmCode: '',
            portGsmId:'',
            privileges:'',
            groupDesc:'',
            blackListStatus:false,
            callableApiFlag: false,
            callableApiIsRequired : false,
            callableApiUrl:'',
            callableApiUsername:'',
            callableApiPassword: '',
            hostToHost: false
        };

        this.callableApiUrlInput = React.createRef();
    
        this.operatorFields = { text: 'operatorName', value: 'operatorId' };
        this.clientFields = { text: 'Clients', value: 'Id' };
        this.portGsmFields = { text: 'portGsmModemName', value: 'portGsmModemId' };
        this.privilegesFields = { text: 'Privileges', value: 'Id' };
        this.messageTypeFields = { text: 'MessageTypes', value: 'Id' };
        
        this.onBackPressed = this.onBackPressed.bind(this);
        this.submitted = false;
        this.onSaveClick = this.onSaveClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onChangecallableApi = this.onChangecallableApi.bind(this);
        this.onChangecallableApiFlag = this.onChangecallableApiFlag.bind(this);
        this.onChangeBlackListStatus = this.onChangeBlackListStatus.bind(this);
        this.onChangePrivileges = this.onChangePrivileges.bind(this);
      } 
    
    onChangeClient = event => {
        var index = event.nativeEvent.target.selectedIndex;
        this.setState({ clientName: event.nativeEvent.target[index].text, clientId: event.target.value, hostToHost:this.getHostToHostClient().get(parseInt(event.target.value)) });
    }  

    onChangePrefix() {
        this.setState({operatorId: this.listPrefix.value.toString() })
    }

    onChangePortGsm() {
        this.setState({ portGsmId: this.listPortGsm.value.toString() })
    }

    onChangePrivileges(e) {
        this.setState({privileges:e.target.value})
    }

    onChangecallableApi = event => {
        if(this.state.callableApiFlag ==  true){
            this.setState({
                [event.target.name]: event.target.value,
              });
        }
    }

    rendereComplete() {
        this.onChange();
    }

    onChangeBlackListStatus(e) {
        this.setState({
            blackListStatus: e.checked
        });
    }

    onChangecallableApiFlag(e) {
        this.setState({
            callableApiFlag: e.checked
        });

        if(e.checked == true){
            ReactDOM.findDOMNode(this.refs.callableApiUrlInput).focus();
        }
    }

    validateCAllableApi(){
        if(this.state.callableApiFlag == true){
            if(this.state.callableApiUrl.length == 0 && this.state.callableApiUsername.length == 0 && this.state.callableApiPassword.length == 0){
                return true;
            }
            this.setState({callableApiIsRequired:false});
            return false;
        }
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onSaveClick() {
        if (this.isValid()) {
            this.props.addGroup({
                groupName: this.state.groupName,
                blackListStatus: this.state.blackListStatus,
                client: {
                    clientId: this.state.clientId,
                    clientName: this.state.clientName
                },
                operator: this.getOperatorObject(this.state.operatorId),
                portGSMModem: this.getPortGsmObject(this.state.portGsmId),
                previlege: {
                    previlegeTemplateId: 2,
                    previlegeTemplateName: "Template A",
                    previlegeCode: ["MO1", "MO2", "MO3", "MO4"]
                },
                callableApiFlag: this.state.callableApiFlag,
                callableApiUrl: this.state.callableApiUrl,
                callableApiUsername: this.state.callableApiUsername,
                callableApiPassword: this.state.callableApiPassword,
                groupDesc: this.state.groupDesc,
                groupStatus: true
          });
        }
    }

    onBackPressed() {
        this.props.history.goBack();
    }

    getIdFromUrl(){
        let temp = this.props.location.pathname.split("/");
        return temp[temp.length-1];
    }

    componentDidMount() {
        this.props.getGroupById({ id: this.getIdFromUrl() });        
        this.props.getClient(null);
        this.props.getOperator(null);
        this.props.getPortGsm(null);
        this.props.getPrivileges(null);
    }

    componentWillReceiveProps(props){
        if(props.model){
            this.setState({
                groupName: props.model.groupName,
                groupDesc: props.model.groupDesc,
                callableApiFlag: props.model.callableApiFlag,
                callableApiUrl: props.model.callableApiUrl,
                callableApiUsername: props.model.callableApiUsername,
                callableApiPassword: props.model.callableApiPassword,
                groupDesc: props.model.groupDesc,
                groupStatus: props.model.groupStatus,
                blackListStatus: props.model.blackListStatus,
            });
        }
    }

    isValid() {
        let isValid = true;
        this.state.listError = [];
        this.setState({ isValid: isValid });
    
        if (this.state.groupName == "") {
          this.state.listError.push("Group Name is required");
        }

        if (this.state.groupName.length > 20){
            this.state.listError.push("Group Name length max 20 character");
        }
    
        if (this.state.clientId.length ==""){
            this.state.listError.push("Client is required");
        }

        if (this.state.operatorId.length ==""){
            this.state.listError.push("Operator is required");
        }

        if (this.state.portGsmId.length ==""){
            this.state.listError.push("Port gsm is required");
        }

        if (this.state.privileges.length ==""){
            this.state.listError.push("Privileges is required");
        }

        if (this.state.groupDesc.length > 100){
            this.state.listError.push("Description length max 100 character");
        }

        if (this.validateCAllableApi()) {
            this.state.listError.push("Url, username, password callableAPI is required");
        } else {
            this.setState({callableApiIsRequired:true});
        }

        if (this.state.listError.length > 0) {
          isValid = false;
        }
    
        this.setState({ isValid: isValid });
    
        return isValid;
    }

    removeCommaFromArray(arr) {
        var newArr = [];
        for (var idx = 0; idx < arr.length;idx++){
            if (arr[idx] != ",")
                newArr.push(arr[idx]);
        }
        return newArr
    }

    getHostToHostClient() {
        let hostToHostMap = new Map();
        this.props.client.map((item, index) => {
            hostToHostMap.set(item.id, item.hostToHost);
        });

        return hostToHostMap;
    }

    getOperatorMap() {
        let operatorMap = new Map();
        this.props.operator.map((item, index) => {
            operatorMap.set(item.operatorId, item);
        });

        return operatorMap;
    }

    getPortGsmMap() {
        let portGsmMap = new Map();
        this.props.portGsm.map((item, index) => {
            portGsmMap.set(item.portGsmModemId, item);
        });
        
        return portGsmMap;
    }

    getPortGsmObject(portGsmId) {
        portGsmId = this.removeCommaFromArray(portGsmId);
        let portGsmObjList = [];
        let portGsmMap = new Map();
        
        portGsmMap = this.getPortGsmMap();
        let idx = 0;
        
        portGsmId.map((item, index) => {
            portGsmObjList.push(portGsmMap.get(parseInt(portGsmId[idx])));
            idx++;
        });
        
        return portGsmObjList;
    }

    getOperatorObject(operatorId) {
        operatorId = this.removeCommaFromArray(operatorId);
        operatorId.length;
        let operatorObjList = [];
        let operatorMap = new Map();
        
        operatorMap = this.getOperatorMap();
        let idx = 0;
        
        operatorId.map((item, index) => {
            operatorObjList.push(operatorMap.get(parseInt(operatorId[idx])));
            idx++;
        });
        return operatorObjList;
    }

    render() {
        const { data, loading, client, operator, portGsm, model, privileges } = this.props;
        var display ={display:'inline'};
        const callableApiIsRequired = this.state.callableApiIsRequired;

        return (
            <div>
                <BlockUi tag="div" blocking={loading}>
                <Fade>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                            <strong>Edit Group</strong>
                            </CardHeader>
                            <CardBody>
                                <ListGroup className="mb-4">
                                    {!this.state.isValid &&
                                    this.state.listError.map(error => (
                                        <ListGroupItem key={error} action color="danger">
                                        {error}
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Group Name</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Input type="text" id="groupName" name="groupName" onChange={this.handleInputChange} placeholder="Enter Group Name..." autoComplete="off" value={this.state.groupName}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Client{this.state.clientName}</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Input
                                            type='select'
                                            name='clientName'
                                            //doni value={this.state.clientId}
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
                                        <Label>Prefix</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <MultiSelectComponent id="operatorId"  name="operatorId"  change={this.onChangePrefix.bind(this)} dataSource={operator} ref={(dropdownlist) => { this.listPrefix = dropdownlist; }} fields={this.operatorFields} mode="Default" placeholder="Select a Prefix" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Port GSM</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <MultiSelectComponent id="portGsmId" name="portGsmId" change={this.onChangePortGsm.bind(this)} dataSource={portGsm} ref={(dropdownlist) => { this.listPortGsm = dropdownlist; }} fields={this.portGsmFields} mode="Default" placeholder="Select a Port GSM" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Priviledges</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        {/* <DropDownListComponent id="privileges" name="privileges" change={this.onChangePrivileges.bind(this)} dataSource={this.privilegesList} ref={(dropdownlist) => { this.listPrivilege = dropdownlist; }} fields={this.privilegesFields} placeholder="Select a Priviledge Template" popupHeight="220px"/> */}
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
                                    <Col md="3">
                                        <Label>Description</Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                    <Input type="textarea" name="groupDesc" id="groupDesc"  onChange={this.handleInputChange} rows="3"
                                        placeholder="Description..." value={this.state.groupDesc} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Blacklist Status</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                                <CheckBoxComponent ref={(scope) => { this.checkboxObj = scope; }} change={this.onChangeBlackListStatus}></CheckBoxComponent>
                                    </Col>
                                    </FormGroup>
                                <div style={{ display: this.state.hostToHost == true ? 'block' : "none" }}>
                                    <FormGroup row>
                                    <Col md="3">
                                        <Label>Callable API</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <CheckBoxComponent  ref={(scope) => { this.checkboxApiObj = scope; }} change={this.onChangecallableApiFlag} ></CheckBoxComponent>
                                    </Col>
                                        </FormGroup>
                                </div>
                                <div style={{display:this.state.callableApiFlag == true ? 'block' : "none"}}>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>URL</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                                    <Input type="text" id="callableApiUrl" name="callableApiUrl" value={this.state.callableApiUrl} onChange={this.handleInputChange} placeholder="Enter URL..." autoComplete="off" ref="callableApiUrlInput" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>User Name</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="callableApiUsername" name="callableApiUsername" value={this.state.callableApiUsername}  onChange={this.handleInputChange} placeholder="Enter User Name..." autoComplete="off" />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>Password</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="password" id="callableApiPassword" name="callableApiPassword" value={this.state.callableApiPassword} onChange={this.handleInputChange} placeholder="Enter Password..." autoComplete="off" />
                                        </Col>
                                    </FormGroup>
                                </div>
                                <div className="form-actions">
                                    <Button type="button" color="primary" onClick={this.onSaveClick}><i className="fa fa-dot-circle-o"></i> Save</Button>&nbsp;
                                    <a className="btn btn-danger" onClick={this.onBackPressed}><i className="fa fa-ban"></i> Cancel</a>
                                </div>
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
        data: state.get('groupReducer').data,
        loading: state.get('groupReducer').loading,
        model: state.get('groupReducer').model,
        client: state.get('groupReducer').client,
        operator: state.get('groupReducer').operator,
        portGsm: state.get('groupReducer').portGsm,
        privileges: state.get('groupReducer').privileges
    });

    const mapDispatchToProps = dispatch => {
        return {
            getGroupById: (criteria) => {
                dispatch(getGroupById(criteria));
            },
            updateGroup: (criteria) => {
                dispatch(updateGroup(criteria));
            },
            getClient: (criteria) => {
                dispatch(getClient(criteria));
            },
            getOperator: (criteria) => {
                dispatch(getOperator(criteria));
            },
            getPrivileges: (criteria) => {
                dispatch(getPrivileges(criteria));
            },
            getPortGsm: (criteria) => {
                dispatch(getPortGsm(criteria));
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
        withConnect
    )(Edit);
