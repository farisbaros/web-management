import React, { Component } from 'react';
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
    CardFooter, 
    Button,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import { compose } from 'redux';
import { connect } from "react-redux";
import { configureStore, injectReducer, injectSaga } from "redux-inject-reducer-and-saga";

import {
    editBranchArea,
    getBranchAreaById,
    EDIT_BRANCH_AREA_SUCCESS,
    EDIT_BRANCH_AREA_FAIL,
    GET_BRANCH_AREA_BY_ID_SUCCESS,
    GET_BRANCH_AREA_FAIL,
    GET_BRANCH_AREA_BY_ID_FAIL
} from './Action';

import { branchAreaReducer } from './Reducer';
import { branchAreaSaga } from './Saga';

import * as config from '../../../utils/Config';
import { deleteData } from '../../controls/MessageBox';
import { messages } from '../../controls/MessageBox';
import * as message from '../../../utils/Messages';
import { handleApiError } from '../../../utils/ErrorHandling';

const initialState = {
    id:'',
    listError: [],
    isValid: true,
    baCode: '',
    baDesc: '',
    area: '',
    currentAction: ''
  };

class Edit extends Component {
    constructor(props) {
        super(props);
        
        this.state = initialState;
        
        this.onInputChange = this.onInputChange.bind(this);
        this.onButtonSaveClick = this.onButtonSaveClick.bind(this);
        this.onButtonBackClick = this.onButtonBackClick.bind(this);
    }

    onInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onButtonSaveClick() {
        if (this.isValid()) {
            const model = {
                baCode: this.state.baCode,
                baDesc: this.state.baDesc,
                area: this.state.area
            }
            this.props.editBranchArea(this.getIdFromUrl(), model);
        }
    }

    onButtonBackClick() {
        this.props.history.goBack();
    }

    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
        this.props.getBranchAreaById(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillReceiveProps(props){
        const currentAction = props.currentAction;
        if (currentAction === GET_BRANCH_AREA_BY_ID_SUCCESS) {
            if (props.model) {
                this.setState({
                    baCode: props.model.baCode,
                    baDesc: props.model.baDesc,
                    area: props.model.area,
                });
            }
        } else if (currentAction === EDIT_BRANCH_AREA_SUCCESS) {
            messages('Edit Branch Area', message.DATA_EDIT_SUCCESS, 'success', false);
            this.props.history.push('/masterdata/branchArea');
            
        } else if (currentAction === EDIT_BRANCH_AREA_FAIL) {debugger
            const error = props.error;
            handleApiError(props, error, 'Edit Branch Area', message.DATA_EDIT_FAIL);
        }
            else if (currentAction === GET_BRANCH_AREA_FAIL) {
            const error = props.error;
            handleApiError(props, error, 'Edit Branch Area', 'Failed to get branch area.');
        }
            else if (currentAction === GET_BRANCH_AREA_BY_ID_FAIL) {
            const error = props.error;
            handleApiError(props, error, 'Edit Branch Area', 'Failed to get branch area by id.');
        }
    }

    getBranchAreaById(){
        this.props.getBranchAreaById(this.props.match.params.id);
    }

    isValid() {
        let isValid = true;
        this.state.listError = [];
        this.setState({ isValid: isValid });
    
        if (this.state.baCode == "") {
          this.state.listError.push("Branch area code is required");
        }
    
        if (this.state.baCode.length > 10){
            this.state.listError.push("Branch area code length max 10 character");
        }

        if ((/^[a-z\d\s]+$/i.test(this.state.baCode))==false){
            this.state.listError.push("Branch area code only allows a-z, A-Z");
        }

        if (this.state.baDesc.length > 100){
            this.state.listError.push("Description length max 100 character");
        }

        if (this.state.area == "") {
            this.state.listError.push("Area is required");
        }

        if (this.state.area.length > 50){
            this.state.listError.push("Area length max 50 character");
        }
    
        if (this.state.listError.length > 0) {
          isValid = false;
        }
    
        this.setState({ isValid: isValid, currentAction: null });
    
        return isValid;
    }

    render() {
        var display = { display: 'inline', width:'10%'}
        const { data, loading, model } = this.props;

        return (
            <div>
                <Fade>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                            <strong>Edit Branch Area</strong>
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
                                            <Label>Branch Code<span className="invalid-feedback" style={display}>*</span></Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="baCode" name="baCode" onChange={this.onInputChange} placeholder="Enter Branch Area Code..." value={this.state.baCode}/>
                                        </Col>
                                    </FormGroup>
                                     <FormGroup row>
                                        <Col md="3">
                                            <Label>Area<span className="invalid-feedback" style={display}>*</span></Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="area" name="area" onChange={this.onInputChange} placeholder="Enter Area..."  value={this.state.area}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>Description</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="baDesc" id="baDesc" onChange={this.onInputChange}  rows="9" placeholder="Description..."  value={this.state.baDesc}/>
                                        </Col>
                                    </FormGroup>
                                    <div className="form-actions">
                                        <Button
                                            onClick={this.onButtonSaveClick}
                                            color='primary'
                                            className='btn-sm'
                                            >
                                            <i className='fa fa-dot-circle-o' /> Update
                                        </Button>&nbsp;
                                        <Button
                                            color='danger'
                                            className='btn-sm'
                                            onClick={this.onButtonBackClick}
                                            >
                                            <i className='fa fa-ban' /> Cancel
                                        </Button>
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
    data: state.get('branchAreaReducer').data,
    loading: state.get('branchAreaReducer').loading,
    model:state.get('branchAreaReducer').model,
    currentAction: state.get('branchAreaReducer').currentAction,
    error: state.get('branchAreaReducer').error,
});

const mapDispatchToProps = dispatch => {
    return {
        editBranchArea: (id, model) => {
            dispatch(editBranchArea(id, model));
        },
        getBranchAreaById: (id) => {
            dispatch(getBranchAreaById(id));
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
)(Edit);
