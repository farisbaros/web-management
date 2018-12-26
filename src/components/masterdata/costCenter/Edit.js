import React, { Component } from 'react';
import { injectReducer, injectSaga } from "redux-inject-reducer-and-saga";
import { compose } from 'redux';
import { connect } from "react-redux";

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

import {
    getBranch,
    editCostCenter,
    getCostCenterById,
    EDIT_COST_CENTER_SUCCESS,
    EDIT_COST_CENTER_FAIL,
    GET_COST_CENTER_BY_ID_SUCCESS,
    GET_COST_CENTER_FAIL,
    GET_COST_CENTER_BY_ID,
    GET_COST_CENTER_BY_ID_FAIL
} from './Action';
import { costCenterReducer } from './Reducer';
import { costCenterSaga } from './Saga';

import * as config from '../../../utils/Config';
import { deleteData } from '../../controls/MessageBox';
import { messages } from '../../controls/MessageBox';
import * as message from '../../../utils/Messages';
import { handleApiError } from '../../../utils/ErrorHandling';

const initialState = {
    listError: [],
    isValid: true,
    costCenterCode: '',
    baCode: '',
    baId:'',
    costCenterDesc:'',
    isCostCenterNumeric: true,
    currentAction: '',
  };

class Edit extends Component {
    constructor(props) {
        super(props);
        
        this.state = initialState;
``
        this.onButtonBackClick = this.onButtonBackClick.bind(this);
        this.onButtonSaveClick = this.onButtonSaveClick.bind(this);
        this.baCodeFields = { text: 'baName', value: 'baCode' };
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onButtonSaveClick() {
        if (this.isValid()) {

          let id = this.getIdFromUrl();  
            this.props.editCostCenter(id, {
            baId:this.state.baId,
            baCode: this.state.baCode,
            costCenterCode: this.state.costCenterCode,
            costCenterDesc:   this.state.costCenterDesc
          });
        }
    }

    onButtonBackClick() {
        this.props.history.goBack();
    }

    onChangeBaCode = event => {
        var index = event.nativeEvent.target.selectedIndex;
        this.setState({ baCode: event.nativeEvent.target[index].text, baId: event.target.value });
    }

    componentDidMount() {
        this.getCostCenterById();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillReceiveProps(props) {
        const currentAction = props.currentAction;
        if (currentAction === GET_COST_CENTER_BY_ID_SUCCESS) {
            if (props.model) {
                this.setState({
                    costCenterCode: props.model.costCenterCode,
                    costCenterDesc: props.model.costCenterDesc,
                    baCode: props.model.baCode,
                    baId:props.model.baId
                });
            }
            this.props.getBranch(null);
        } else if (currentAction === EDIT_COST_CENTER_SUCCESS) {
            messages('Edit Cost Center', message.DATA_EDIT_SUCCESS, 'success', false);
            this.props.history.push('/masterdata/costCenter');
            
        } else if (currentAction === EDIT_COST_CENTER_FAIL) {
            const error = props.error;
            handleApiError(props, error, 'Edit Cost Center', message.DATA_EDIT_FAIL);
        }
            else if (currentAction === GET_COST_CENTER_FAIL) {
            const error = props.error;
            handleApiError(props, error, 'Edit Cost Center', 'Failed to get cost center.');
        }
            else if (currentAction === GET_COST_CENTER_BY_ID_FAIL) {
            const error = props.error;
            handleApiError(props, error, 'Edit Cost Center', 'Failed to get cost center by id.');
        }
    }

    getIdFromUrl(){
        let temp = this.props.location.pathname.split("/");
        return temp[temp.length-1];
    }

    getCostCenterById(){
        this.props.getCostCenterById(this.props.match.params.id);
    }

    rendereComplete() {
        this.onChangeBaCode();
        this.onChange();
    }

    isValid() {
        let isValid = true;
        this.state.listError = [];
        this.setState({ isValid: isValid });
    
        if (this.state.costCenterCode == "") {
          this.state.listError.push("Cost center is required");
        }

        if ((/^[a-z\d\-\s]+$/i.test(this.state.costCenterCode))==false){
            this.state.listError.push("Cost center only allows a-z, A-Z, 0-9, and dash");
        }
    
        if (this.state.baCode.length ==""){
            this.state.listError.push("Branch area is required");
        }

        if (this.state.costCenterDesc.length > 100){
            this.state.listError.push("Description length max 100 character");
        }

        if (this.state.listError.length > 0) {
          isValid = false;
        }
    
        this.setState({ isValid: isValid });
    
        return isValid;
    }
   
    render() {
        var display = { display: 'inline', width:'10%'}
        const { data, loading, model, branchList } = this.props;

        return (
            <div>
                <Fade>
                <Row>
                    <Col>
                    <Card>
                        <CardHeader>
                            <strong>Edit Cost Center</strong>
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
                                        <Label>Cost Center Code<span className="invalid-feedback" style={display}>*</span></Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="costCenterCode" name="costCenterCode" onChange={this.onInputChange}  placeholder="Enter Cost Center Code..." autoComplete="off" value={this.state.costCenterCode} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Branch Area<span className="invalid-feedback" style={display}>*</span></Label>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <Input
                                            type='select'
                                            name='baCode'
                                            value={this.state.baId}
                                            onChange={this.onChangeBaCode}
                                            ref='baCode'
                                        >
                                        <option value=''>Select Branch Area</option>
                                        {branchList.map((e, key) => {
                                            return <option key={key} value={e.id}> {e.baCode} </option>
                                        })}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label>Description</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="textarea" name="costCenterDesc" id="costCenterDesc" rows="9" onChange={this.onInputChange} 
                                            placeholder="Description..." value={this.state.costCenterDesc}/>
                                    </Col>
                                </FormGroup>
                                <div className="form-actions">
                                    <Button type="submit" onClick={this.onButtonSaveClick} color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>
                                    <a className="btn btn-danger" onClick={this.onButtonBackClick}><i className="fa fa-ban"></i> Cancel</a>
                                </div>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
                </Fade>
            </div>
        )
    }
}

    const mapStateToProps = state => ({
        data: state.get('costCenterReducer').data,
        loading: state.get('costCenterReducer').loading,
        model:state.get('costCenterReducer').model,
        currentAction: state.get('costCenterReducer').currentAction,
        branchList: state.get('costCenterReducer').branchList
    });
    
  
    const mapDispatchToProps = dispatch => {
        return {
            getBranch: (action) => {
                dispatch(getBranch(action));
            },
            getCostCenterById: (criteria) => {
                dispatch(getCostCenterById(criteria));
            },
            editCostCenter: (id, model) => {
                dispatch(editCostCenter(id, model));
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
        withConnect
    )(Edit);
