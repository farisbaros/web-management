import React, { Component } from 'react';
import { injectReducer, injectSaga } from "redux-inject-reducer-and-saga";
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

import { getBranch, addCostCenter, ADD_COST_CENTER_SUCCESS, ADD_COST_CENTER_FAIL } from './Action';
import { costCenterReducer } from './Reducer';
import { costCenterSaga } from './Saga';

class Add extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listError: [],
            isValid: true,
            costCenterCode: '',
            baId:'',
            baCode:'',
            costCenterDesc:'',
            isCostCenterNumeric: true,
            prevAction: null
        }
      
        this.onBackPressed = this.onBackPressed.bind(this);
        this.submitted = false;
        this.onSaveClick = this.onSaveClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onChangeBaCode = this.onChangeBaCode.bind(this);
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSaveClick() {
        if (this.isValid()) {
            this.state;debugger
            this.props.addCostCenter({
            baId:this.state.baId,
            baCode: this.state.baCode,
            costCenterCode: this.state.costCenterCode,
            costCenterDesc:   this.state.costCenterDesc
          });
        }
    }
    componentDidMount() {
        this.props.getBranch(null);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { prevAction, data } = this.props;
    
        if (prevAction === ADD_COST_CENTER_SUCCESS) {
          if (this.state.prevAction != prevAction){
            this.setState({
              prevAction: prevAction,
              costCenterCode: '',
              baId:'',
              baCode:'',
              costCenterDesc:'',
            })
          }
        }
        else if (prevAction === ADD_COST_CENTER_FAIL) {
          if (this.state.prevAction != prevAction){
            const listError=[];
            data.listError.forEach(e => {
              listError.push(e);
            })
            this.setState({
              prevAction: prevAction,
              listError: listError,
              isValid: false
            });
          }
        }
    }

    onBackPressed() {
        this.props.history.goBack();
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

    onChangeBaCode = event => {
        var index = event.nativeEvent.target.selectedIndex;
        this.setState({ baCode: event.nativeEvent.target[index].text, baId: event.target.value });
    }

    render() {
        var display = { display: 'inline', width:'10%'}
        const { data, loading, branchList } = this.props;

        return (
            <div>
                <Fade>
                <Row>
                    <Col>
                    <Card>
                        <CardHeader>
                            <strong>Add Cost Center Area</strong>
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
                                    <Col xs="12" md="6">
                                        <Input type="text" id="costCenterCode" name="costCenterCode" onChange={this.handleInputChange} placeholder="Enter Cost Center Code..." autoComplete="off" value={this.state.costCenterCode}/>
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
                                    <Col xs="12" md="6">
                                        <Input type="textarea" name="costCenterDesc" id="costCenterDesc" rows="9" onChange={this.handleInputChange} 
                                            placeholder="Description..." value={this.state.costCenterDesc}/>
                                    </Col>
                                </FormGroup>
                                <div className="form-actions">
                                    <Button type="button" onClick={this.onSaveClick} color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>&nbsp;
                                    <a className="btn btn-danger" onClick={this.onBackPressed}><i className="fa fa-ban"></i> Cancel</a>
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
        prevAction: state.get('costCenterReducer').prevAction,
        branchList: state.get('costCenterReducer').branchList,
    });
  
    const mapDispatchToProps = dispatch => {
        return {
            addCostCenter: (data) => {
                dispatch(addCostCenter(data));
            },
            getBranch: (action) => {
              dispatch(getBranch(action));
            },
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
    )(Add);
