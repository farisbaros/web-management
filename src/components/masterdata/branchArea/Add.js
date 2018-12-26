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
    Button,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import { compose } from 'redux';
import { connect } from "react-redux";
import { injectReducer, injectSaga } from "redux-inject-reducer-and-saga";
import BlockUi from 'react-block-ui';

import { addBranchArea, ADD_BRANCH_AREA_FAIL, ADD_BRANCH_AREA_SUCCESS } from './Action';
import { branchAreaReducer } from './Reducer';
import { branchAreaSaga } from './Saga';

import * as config from '../../../utils/Config';
import { deleteData } from '../../controls/MessageBox';
import { messages } from '../../controls/MessageBox';
import * as message from '../../../utils/Messages';
import { handleApiError } from '../../../utils/ErrorHandling';

const initialState = {
    listError: [],
    isValid: true,
    baCode: '',
    baDesc: '',
    area:'',
    currentAction: null
  };

class Add extends Component {
    constructor() {
        super();

        this.state = initialState;
        
        this.onButtonBackClick = this.onButtonBackClick.bind(this);
        this.onButtonSaveClick = this.onButtonSaveClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    componentWillReceiveProps(props) {
        const currentAction = props.currentAction;
    
        if (currentAction === ADD_BRANCH_AREA_SUCCESS) {
          messages('Add Branch Area', message.DATA_ADD_SUCCESS, 'success', false);
          this.props.history.push('/masterdata/branchArea');
        } else if (currentAction === ADD_BRANCH_AREA_FAIL) {
          const error = props.error;
    
          handleApiError(props, error, 'Add Branch Area', message.DATA_ADD_FAIL);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    onButtonSaveClick() {
        if (this.isValid()) {
            
          this.props.addBranchArea({
            baCode: this.state.baCode,
            baDesc: this.state.baDesc,
            area:   this.state.area
          });
        }
    }

    onButtonBackClick() {
        this.props.history.goBack();
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
            this.state.listError.push("Branch area code only allows a-z, A-Z, 0-9");
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
    
        this.setState({ isValid: isValid });
    
        return isValid;
    }

    render() {
        var display = { display: 'inline', width:'10%'}
        const { loading, currentAction } = this.props;

        return (
            <div>
                <BlockUi tag='div' blocking={loading}>
                <Fade>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                            <strong>Add Branch Area</strong>
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
                                            <Input type="text" id="area" name="area" onChange={this.onInputChange} placeholder="Enter Area..." value={this.state.area}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label>Description</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="baDesc" id="baDesc" onChange={this.onInputChange} rows="9" placeholder="Description..." value={this.state.baDesc}/>
                                        </Col>
                                    </FormGroup>
                                    <div className="form-actions">
                                        <Button type="submit" onClick={this.onButtonSaveClick} color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>&nbsp;
                                        <a className="btn btn-danger" onClick={this.onButtonBackClick}><i className="fa fa-ban"></i> Cancel</a>
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
        error: state.get('branchAreaReducer').error,
        data: state.get('branchAreaReducer').data,
        loading: state.get('branchAreaReducer').loading,
        currentAction: state.get('branchAreaReducer').currentAction,
    });

    const mapDispatchToProps = dispatch => {
        return {
            addBranchArea: (data) => {
                dispatch(addBranchArea(data));
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
    )(Add);

