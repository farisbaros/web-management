import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card, CardBody, CardHeader, Fade, Col, Row, Table, Form, FormGroup, Label, Input, CardFooter, Button, ListGroup, ListGroupItem, Alert, CustomInput, Collapse } from 'reactstrap';
import {
  addUserApplication,
  getUserApplicationByUsername,
  getUser,
  getClient,
  getGroup,
  getBranchArea,
  getCostCenter,
  ADD_USER_APPLICATION_SUCCESS,
  ADD_USER_APPLICATION_FAIL,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAIL,
  GET_GROUP_SUCCESS,
  GET_GROUP_FAIL,
  GET_BRANCH_AREA_SUCCESS,
  GET_BRANCH_AREA_FAIL,
  GET_COST_CENTER_SUCCESS,
  GET_COST_CENTER_FAIL
} from './Action';

import { userApplicationReducer } from './Reducer';
import { userApplicationSaga } from './Saga';
import { configureStore, injectReducer, injectSaga } from 'redux-inject-reducer-and-saga';
import { compose } from 'redux';
import { connect } from 'react-redux';

import BlockUi from 'react-block-ui';
import Switch from 'react-switch';
import { messages } from '../../controls/MessageBox';
import { Typeahead } from 'react-bootstrap-typeahead';
import * as message from '../../../utils/Messages';
import { handleApiError } from '../../../utils/ErrorHandling';

const initState = {
  collapseFC: false,
  collapseFTP: false,
  fullName: '',
  userType: '',
  userNameId: '',
  userName: '',
  clientId: '',
  clientName: '',
  groupId: '',
  groupName: '',
  creditBalance: null,
  operationalHour1: '',
  operationalHour2: '',
  operationalDay1: '',
  operationalDay2: '',
  priority: '',
  excludeHoliday: false,
  activeStatus: true,
  urlStatus: false,
  urlInbox: '',
  urlUserName: '',
  urlPassword: '',
  urlMessageFormat: '',
  baCodeId: '',
  baCode: '',
  baCostCenterId: '',
  baCostCenter: '',
  ftpStatus: false,
  ftpType: '',
  ftpDirectory: '',
  ftpUserName: '',
  ftpPassword: '',
  ftpContent: '',
  ftpDelimiter: '',
  ftpFileType: '',
  ftpPinColumn: null,
  passiveSelected: false,
  errorList: [],
  isValid: true,
  user: [],
  client: [],
  group: [],
  branchArea: [],
  costCenter: []  
}

class Add extends Component {

  constructor(props) {
    super(props);

    this.state = initState;

    this.onInputFullNameChange = this.onInputFullNameChange.bind(this);
    this.onInputUserNameChange = this.onInputUserNameChange.bind(this);
    this.onInputUserTypeChange = this.onInputUserTypeChange.bind(this);
    this.onInputCreditBalanceChange = this.onInputCreditBalanceChange.bind(this);
    this.onInputOperationalHour1Change = this.onInputOperationalHour1Change.bind(this);
    this.onInputOperationalHour2Change = this.onInputOperationalHour2Change.bind(this);
    this.onInputOperationalDay1Change = this.onInputOperationalDay1Change.bind(this);
    this.onInputOperationalDay2Change = this.onInputOperationalDay2Change.bind(this);
    this.onInputUrlInboxChange = this.onInputUrlInboxChange.bind(this);
    this.onInputUrlUserNameChange = this.onInputUrlUserNameChange.bind(this);
    this.onInputUrlPasswordChange = this.onInputUrlPasswordChange.bind(this);
    this.onInputFtpDirectoryChange = this.onInputFtpDirectoryChange.bind(this);
    this.onInputFtpUserNameChange = this.onInputFtpUserNameChange.bind(this);
    this.onInputFtpPasswordChange = this.onInputFtpPasswordChange.bind(this);
    this.onInputFtpContentChange = this.onInputFtpContentChange.bind(this);
    this.onSelectUrlMessageFormatChange = this.onSelectUrlMessageFormatChange.bind(this);
    this.onSelectBaCodeChange = this.onSelectBaCodeChange.bind(this);
    this.onSelectBaCostCenterChange = this.onSelectBaCostCenterChange.bind(this);
    this.onSelectFtpStatusChange = this.onSelectFtpStatusChange.bind(this);
    this.onSelectFtpTypeChange = this.onSelectFtpTypeChange.bind(this);
    this.onSelectPriorityChange = this.onSelectPriorityChange.bind(this);
    this.onSelectUrlStatusChange = this.onSelectUrlStatusChange.bind(this);
    this.onSelectClientNameChange = this.onSelectClientNameChange.bind(this);
    this.onSelectGroupNameChange = this.onSelectGroupNameChange.bind(this);
    this.onSelectFtpDelimiterChange = this.onSelectFtpDelimiterChange.bind(this);
    this.onSelectFtpFileTypeChange = this.onSelectFtpFileTypeChange.bind(this);
    this.onSelectFtpPinColumnChange = this.onSelectFtpPinColumnChange.bind(this);
    this.onCheckExcludeHolidayChange = this.onCheckExcludeHolidayChange.bind(this);
    this.onSwitchStatusChange = this.onSwitchStatusChange.bind(this);
    this.onButtonSaveClick = this.onButtonSaveClick.bind(this);
    this.onButtonCancelClick = this.onButtonCancelClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      fullName: ReactDOM.findDOMNode(this.refs.fullName).value.trim(),
      // userName: ReactDOM.findDOMNode(this.refs.userName).value.trim(),
      userType: ReactDOM.findDOMNode(this.refs.userType).value.trim(),
      clientName: ReactDOM.findDOMNode(this.refs.clientName).value.trim(),
      groupName: ReactDOM.findDOMNode(this.refs.groupName).value.trim(),
      creditBalance: ReactDOM.findDOMNode(this.refs.creditBalance).value.trim(),
      operationalHour1: ReactDOM.findDOMNode(this.refs.startOperationalHour).value.trim(),
      operationalHour2: ReactDOM.findDOMNode(this.refs.endOperationalHour).value.trim(),
      operationalDay1: ReactDOM.findDOMNode(this.refs.startOperationalDay).value.trim(),
      operationalDay2: ReactDOM.findDOMNode(this.refs.endOperationalDay).value.trim(),
      priority: ReactDOM.findDOMNode(this.refs.priority).value.trim(),
      urlStatus: ReactDOM.findDOMNode(this.refs.urlStatus).checked,
      urlInbox: ReactDOM.findDOMNode(this.refs.urlInbox).value.trim(),
      urlUserName: ReactDOM.findDOMNode(this.refs.urlUserName).value.trim(),
      urlPassword: ReactDOM.findDOMNode(this.refs.urlPassword).value.trim(),
      urlMessageFormat: ReactDOM.findDOMNode(this.refs.urlMessageFormat).value.trim(),
      baCode: ReactDOM.findDOMNode(this.refs.baCode).value.trim(),
      baCostCenter: ReactDOM.findDOMNode(this.refs.baCostCenter).value.trim(),
      ftpStatus: ReactDOM.findDOMNode(this.refs.ftpStatus).checked,
      ftpType: ReactDOM.findDOMNode(this.refs.ftpType).value.trim(),
      ftpDirectory: ReactDOM.findDOMNode(this.refs.ftpDirectory).value.trim(),
      ftpUserName: ReactDOM.findDOMNode(this.refs.ftpUserName).value.trim(),
      ftpPassword: ReactDOM.findDOMNode(this.refs.ftpPassword).value.trim(),
      ftpContent: ReactDOM.findDOMNode(this.refs.ftpContent).value.trim(),
      ftpDelimiter: ReactDOM.findDOMNode(this.refs.ftpDelimiter).value.trim(),
      ftpFileType: ReactDOM.findDOMNode(this.refs.ftpFileType).value.trim(),
      ftpPinColumn: ReactDOM.findDOMNode(this.refs.ftpPinColumn).value.trim(),
      passiveSelected: false
    });
    
    const clientName = '';
    const baCode = '';

    this.loadUser();
    this.loadClient();
    this.loadGroup(clientName);
    this.loadBranchArea();
    this.loadCostCenter(baCode);
  }

  componentWillReceiveProps(props) {
    const currentAction = props.currentAction;

    if (currentAction === GET_USER_SUCCESS) {
      this.setState({ user: props.user });
    } else if (currentAction === GET_CLIENT_SUCCESS) {
      this.setState({ client: props.client });
    } else if (currentAction === GET_GROUP_SUCCESS) {
      this.setState({ group: props.group });
    } else if (currentAction === GET_BRANCH_AREA_SUCCESS) {
      this.setState({ branchArea: props.branchArea });
    } else if (currentAction === GET_COST_CENTER_SUCCESS) {
      this.setState({ costCenter: props.costCenter });
    } else if (currentAction === ADD_USER_APPLICATION_SUCCESS) {
      messages('Success', message.DATA_ADD_SUCCESS, 'success', false);
      this.props.history.push('/userprofile/userapplication');
    } else if (currentAction === ADD_USER_APPLICATION_FAIL) {
      const error = props.error;
      handleApiError(props, error, 'Add User Application Management', message.DATA_ADD_FAIL);
    }
  }

  loadUser() {
    this.props.getUser();
  }

  loadClient() {
    this.props.getClient();
  }

  loadGroup(clientName) {
    this.props.getGroup(clientName);
  }

  loadBranchArea() {
    this.props.getBranchArea();
  }

  loadCostCenter(baCode) {
    this.props.getCostCenter(baCode);
  }

  onButtonCancelClick() {
    this.props.history.push('/userprofile/userapplication');
  }

  onInputFullNameChange(e) {
    this.setState({ fullName: e.target.value });
  }

  onInputUserTypeChange(e) {
    this.setState({ userType: e.target.value });
  }

  onInputUserNameChange = value => {
    value.map((e, key) => {
      this.setState({ userName: e.username, fullName: e.fullName, userNameId: e.id });
      this.props.getUserApplicationByUsername(e.username);
    })
  }

  onSelectClientNameChange(e) {
    const index = e.nativeEvent.target.selectedIndex;
    this.setState({
      clientName: e.nativeEvent.target[index].text,
      clientId: e.target.value
    });
    this.loadGroup(e.nativeEvent.target[index].text);
  }

  onSelectGroupNameChange(e) {
    const index = e.nativeEvent.target.selectedIndex;
    this.setState({
      groupName: e.nativeEvent.target[index].text,
      groupId: e.target.value
    });
  }

  onInputCreditBalanceChange(e) {
    this.setState({ creditBalance: e.target.value });
  }

  onInputOperationalHour1Change(e) {
    this.setState({ operationalHour1: e.target.value });
  }

  onInputOperationalHour2Change(e) {
    this.setState({ operationalHour2: e.target.value });
  }

  onInputOperationalDay1Change(e) {
    this.setState({ operationalDay1: e.target.value });
  }

  onInputOperationalDay2Change(e) {
    this.setState({ operationalDay2: e.target.value });
  }

  onSelectPriorityChange(e) {
    this.setState({ priority: e.target.value });
  }

  onSelectUrlStatusChange(e) {
    this.setState({ urlStatus: e.target.checked, collapseFC: !this.state.urlStatus });
  }

  onInputUrlInboxChange(e) {
    this.setState({ urlInbox: e.target.value });
  }

  onInputUrlUserNameChange(e) {
    this.setState({ urlUserName: e.target.value });
  }

  onInputUrlPasswordChange(e) {
    this.setState({ urlPassword: e.target.value });
  }

  onSelectUrlMessageFormatChange(e) {
    this.setState({ urlMessageFormat: e.target.value });
  }

  onSelectBaCodeChange(e) {
    const index = e.nativeEvent.target.selectedIndex;
    this.setState({
      baCode: e.nativeEvent.target[index].text,
      baCodeId: e.target.value
    });
    this.loadCostCenter(e.nativeEvent.target[index].text);
  }

  onSelectBaCostCenterChange(e) {
    const index = e.nativeEvent.target.selectedIndex;
    this.setState({
      baCostCenter: e.nativeEvent.target[index].text,
      baCostCenterId: e.target.value
    });
  }

  onSelectFtpStatusChange(e) {
    this.setState({ ftpStatus: e.target.checked, collapseFTP: !this.state.ftpStatus });
  }

  onSelectFtpTypeChange(e) {
    this.setState({ ftpType: e.target.value });
    if (e.target.value == 'Passive') {
      this.setState({ passiveSelected: true });
    } else {
      this.setState({ passiveSelected: false });
    }
  }

  onInputFtpDirectoryChange(e) {
    this.setState({ ftpDirectory: e.target.value });
  }

  onInputFtpUserNameChange(e) {
    this.setState({ ftpUserName: e.target.value });
  }

  onInputFtpPasswordChange(e) {
    this.setState({ ftpPassword: e.target.value });
  }

  onInputFtpContentChange(e) {
    this.setState({ ftpContent: e.target.value });
  }

  onSelectFtpDelimiterChange(e) {
    this.setState({ ftpDelimiter: e.target.value });
  }

  onSelectFtpFileTypeChange(e) {
    this.setState({ ftpFileType: e.target.value });
  }

  onSelectFtpPinColumnChange(e) {
    this.setState({ ftpPinColumn: e.target.value });
  }

  onCheckExcludeHolidayChange(e) {
    this.setState({ excludeHoliday: e.target.checked });
  }

  onSwitchStatusChange(activeStatus) {
    if (this.state.activeStatus === true) {
      this.setState({ activeStatus: false });
    } else {
      this.setState({ activeStatus: true });
    }
  }

  isValid() {
    let isValid = true;
    this.state.errorList = [];
    this.setState({
      isValid: isValid,
      currentAction: ''
    });
    const regWhiteSpace = /\s/;

    if (this.state.userNameId == null || this.state.userNameId == '') {
      this.state.errorList.push('User name cannot be empty');
    } else if (regWhiteSpace.test(this.state.userName)) {
      this.state.errorList.push('User name cannot contains space');
    }
    if (regWhiteSpace.test(this.state.urlUserName)) {
      this.state.errorList.push('URL user name cannot contains space');
    }
    if (regWhiteSpace.test(this.state.ftpUserName)) {
      this.state.errorList.push('FTP user name cannot contains space');
    }
    if (regWhiteSpace.test(this.state.urlPassword)) {
      this.state.errorList.push('URL password cannot contains space');
    }
    if (regWhiteSpace.test(this.state.ftpPassword)) {
      this.state.errorList.push('FTP password cannot contains space');
    }
    if (regWhiteSpace.test(this.state.urlInbox)) {
      this.state.errorList.push('URL cannot contains space');
    }
    if (this.state.ftpPinColumn < 0) {
      this.state.errorList.push('Pin column cannot be negative value');
    }
    if (this.state.clientName == '') {
      this.state.errorList.push('Client name cannot be empty');
    }
    if (!(this.state.userType == 'Admin Client') && this.state.groupName == '') {
      this.state.errorList.push('Group name cannot be empty');
    }
    if (!(this.state.userType == 'Admin Client') && (this.state.creditBalance == null || this.state.creditBalance == '')) {
      this.state.errorList.push('Credit balance cannot be empty');
    }
    if (this.state.creditBalance < 0) {
      this.state.errorList.push('Credit balance cannot be negative value');
    }
    if (this.state.operationalHour1 == '' || this.state.operationalHour2 == '') {
      this.state.errorList.push('Operational hours cannot be empty');
    }
    if (this.state.operationalDay1 == '' || this.state.operationalDay2 == '') {
      this.state.errorList.push('Operational days cannot be empty');
    }
    if (!(this.state.userType == 'Admin Client') && this.state.baCode == '') {
      this.state.errorList.push('BA Code cannot be empty');
    }
    if (!(this.state.userType == 'Admin Client') && this.state.baCostCenter == '') {
      this.state.errorList.push('Cost center cannot be empty');
    }
    if (this.props.data.length > 0) {
      this.state.errorList.push('Username already exist');
    }

    // FORWARD CALL
    if (!(this.state.userType == 'Admin Client') && this.state.urlStatus == true) {
      if (this.state.urlInbox == '') {
        this.state.errorList.push('URL call center cannot be empty');
      }
      if (this.state.urlUserName == '') {
        this.state.errorList.push('Forward call username cannot be empty');
      }
      if (this.state.urlPassword == '') {
        this.state.errorList.push('Forward call password cannot be empty');
      }
      if (this.state.urlMessageFormat == '') {
        this.state.errorList.push('Forward call message format cannot be empty');
      }
    }

    //FTP SETUP
    if (!(this.state.userType == 'Admin Client') && this.state.ftpStatus == true) {
      if (this.state.ftpType == '') {
        this.state.errorList.push('FTP type cannot be empty');
      }
      if (this.state.passiveSelected == true) {
        if (this.state.ftpDirectory == '') {
          this.state.errorList.push('FTP directory cannot be empty');
        }
        if (this.state.ftpUserName == '') {
          this.state.errorList.push('FTP username cannot be empty');
        }
        if (this.state.ftpPassword == '') {
          this.state.errorList.push('FTP password cannot be empty');
        }
      }
      if (this.state.ftpContent == '') {
        this.state.errorList.push('SMS content cannot be empty');
      }
      if (this.state.ftpDelimiter == '') {
        this.state.errorList.push('Content delimiter cannot be empty');
      }
      if (this.state.ftpFileType == '') {
        this.state.errorList.push('File type cannot be empty');
      }
      if (this.state.ftpPinColumn == '') {
        this.state.errorList.push('Pin column cannot be empty');
      }
    }

    if (this.state.errorList.length > 0) {
      isValid = false;
      window.scrollTo(0, 0);
    }

    this.setState({ isValid: isValid });

    return isValid;
  }

  handledString(val) {
    if (val.trim() == '') {
      val = null;
    }
    return val;
  }

  onButtonSaveClick(e) {
    if (this.isValid()) {
      /*
      let model;

      if (this.state.userType == 'Admin Client') {
        model = {
          fullName: this.handledString(this.state.fullName),
          userNameId: this.state.userNameId,
          userName: this.handledString(this.state.userName),
          userType: this.state.userType,
          clientId: this.state.clientId,
          clientName: this.handledString(this.state.clientName),
          groupName: 'Group Admin',
          activeStatus: this.state.activeStatus
        };
      } else if (this.state.urlStatus == true && !this.state.ftpStatus) {
        model = {
          fullName: this.handledString(this.state.fullName),
          userNameId: this.state.userNameId,
          userName: this.handledString(this.state.userName),
          userType: this.state.userType,
          clientId: this.state.clientId,
          clientName: this.handledString(this.state.clientName),
          groupId: this.state.groupId,
          groupName: this.handledString(this.state.groupName),
          creditBalance: this.state.creditBalance,
          remainingCreditBalance: this.state.creditBalance,
          startOperationalHour: (this.state.operationalHour1.split(':').length < 3) ? this.state.operationalHour1 + ':00' : this.state.operationalHour1,
          endOperationalHour: (this.state.operationalHour2.split(':').length < 3) ? this.state.operationalHour2 + ':00' : this.state.operationalHour2,
          startOperationalDay: this.state.operationalDay1,
          endOperationalDay: this.state.operationalDay2,
          priority: this.state.priority,
          excludeHoliday: this.state.excludeHoliday,
          activeStatus: this.state.activeStatus,
          urlStatus: this.state.urlStatus,
          urlInbox: this.handledString(this.state.urlInbox),
          urlUserName: this.handledString(this.state.urlUserName),
          urlPassword: this.handledString(this.state.urlPassword),
          urlMessageFormat: this.state.urlMessageFormat,
          baCodeId: this.state.baCodeId,
          baCode: this.state.baCode,
          baCostCenterId: this.state.baCostCenterId,
          baCostCenter: this.state.baCostCenter
        };
      } else if (!this.state.urlStatus == true && this.state.ftpStatus) {
        model = {
          fullName: this.handledString(this.state.fullName),
          userNameId: this.state.userNameId,
          userName: this.handledString(this.state.userName),
          userType: this.state.userType,
          clientId: this.state.clientId,
          clientName: this.handledString(this.state.clientName),
          groupId: this.state.groupId,
          groupName: this.handledString(this.state.groupName),
          creditBalance: this.state.creditBalance,
          remainingCreditBalance: this.state.creditBalance,
          startOperationalHour: (this.state.operationalHour1.split(':').length < 3) ? this.state.operationalHour1 + ':00' : this.state.operationalHour1,
          endOperationalHour: (this.state.operationalHour2.split(':').length < 3) ? this.state.operationalHour2 + ':00' : this.state.operationalHour2,
          startOperationalDay: this.state.operationalDay1,
          endOperationalDay: this.state.operationalDay2,
          priority: this.state.priority,
          excludeHoliday: this.state.excludeHoliday,
          activeStatus: this.state.activeStatus,
          baCodeId: this.state.baCodeId,
          baCode: this.state.baCode,
          baCostCenterId: this.state.baCostCenterId,
          baCostCenter: this.state.baCostCenter,
          ftpStatus: this.state.ftpStatus,
          ftpType: this.state.ftpType,
          ftpDirectory: this.handledString(this.state.ftpDirectory),
          ftpUserName: this.handledString(this.state.ftpUserName),
          ftpPassword: this.handledString(this.state.ftpPassword),
          ftpSmsContent: this.handledString(this.state.ftpContent),
          ftpDelimiter: this.state.ftpDelimiter,
          ftpFileType: this.state.ftpFileType,
          ftpPinColumn: this.state.ftpPinColumn
        };
      } else {
        model = {
          fullName: this.handledString(this.state.fullName),
          userNameId: this.state.userNameId,
          userName: this.handledString(this.state.userName),
          userType: this.state.userType,
          clientId: this.state.clientId,
          clientName: this.handledString(this.state.clientName),
          groupId: this.state.groupId,
          groupName: this.handledString(this.state.groupName),
          creditBalance: this.state.creditBalance,
          remainingCreditBalance: this.state.creditBalance,
          startOperationalHour: (this.state.operationalHour1.split(':').length < 3) ? this.state.operationalHour1 + ':00' : this.state.operationalHour1,
          endOperationalHour: (this.state.operationalHour2.split(':').length < 3) ? this.state.operationalHour2 + ':00' : this.state.operationalHour2,
          startOperationalDay: this.state.operationalDay1,
          endOperationalDay: this.state.operationalDay2,
          priority: this.state.priority,
          excludeHoliday: this.state.excludeHoliday,
          activeStatus: this.state.activeStatus,
          urlStatus: this.state.urlStatus,
          urlInbox: this.handledString(this.state.urlInbox),
          urlUserName: this.handledString(this.state.urlUserName),
          urlPassword: this.handledString(this.state.urlPassword),
          urlMessageFormat: this.state.urlMessageFormat,
          baCodeId: this.state.baCodeId,
          baCode: this.state.baCode,
          baCostCenterId: this.state.baCostCenterId,
          baCostCenter: this.state.baCostCenter,
          ftpStatus: this.state.ftpStatus,
          ftpType: this.state.ftpType,
          ftpDirectory: this.handledString(this.state.ftpDirectory),
          ftpUserName: this.handledString(this.state.ftpUserName),
          ftpPassword: this.handledString(this.state.ftpPassword),
          ftpSmsContent: this.handledString(this.state.ftpContent),
          ftpDelimiter: this.state.ftpDelimiter,
          ftpFileType: this.state.ftpFileType,
          ftpPinColumn: this.state.ftpPinColumn
        };
      }
      */
      const model = {
        userNameId: this.state.userNameId,
        userName: this.handledString(this.state.userName),
        fullName: this.handledString(this.state.fullName),
        userType: this.state.userType,
        clientId: this.state.clientId,
        clientName: this.handledString(this.state.clientName),
        excludeHoliday: this.state.excludeHoliday,
        activeStatus: this.state.activeStatus
      };

      if (this.state.userType == 'Admin Client') {
        Object.assign(model, {
          groupName: 'Group Admin'
        });
      } else {
        Object.assign(model, {
          groupId: this.state.groupId,
          groupName: this.handledString(this.state.groupName),
          creditBalance: this.state.creditBalance,
          startOperationalHour: (this.state.operationalHour1.split(':').length < 3) ? this.state.operationalHour1 + ':00' : this.state.operationalHour1,
          endOperationalHour: (this.state.operationalHour2.split(':').length < 3) ? this.state.operationalHour2 + ':00' : this.state.operationalHour2,
          startOperationalDay: this.state.operationalDay1,
          endOperationalDay: this.state.operationalDay2,
          priority: this.state.priority,
          baCodeId: this.state.baCodeId,
          baCode: this.state.baCode,
          baCostCenterId: this.state.baCostCenterId,
          baCostCenter: this.state.baCostCenter
        });

        if (this.state.urlStatus == true) {
          Object.assign(model, {
            urlStatus: true,
            urlInbox: this.handledString(this.state.urlInbox),
            urlUserName: this.handledString(this.state.urlUserName),
            urlPassword: this.handledString(this.state.urlPassword),
            urlMessageFormat: this.state.urlMessageFormat
          });
        } else {
          Object.assign(model, {
            urlStatus: false
          });
        }
  
        if (this.state.ftpStatus == true) {
          Object.assign(model, {
            ftpStatus: true,
            ftpType: this.state.ftpType,
            ftpDirectory: this.handledString(this.state.ftpDirectory),
            ftpUserName: this.handledString(this.state.ftpUserName),
            ftpPassword: this.handledString(this.state.ftpPassword),
            ftpSmsContent: this.handledString(this.state.ftpContent),
            ftpDelimiter: this.state.ftpDelimiter,
            ftpFileType: this.state.ftpFileType,
            ftpPinColumn: this.state.ftpPinColumn
          });
        } else {
          Object.assign(model, {
            ftpStatus: false
          });
        }
      }

      this.props.addUserApplication(model);
    }
  }

  render() {
    const { loading } = this.props;
    const minLength = 1;
    const maxResults = 5;

    return (
      <div>
        <BlockUi tag='div' blocking={loading}>
          <Fade>
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <strong>Add User Application</strong>
                  </CardHeader>
                  <CardBody>
                    <ListGroup className='mb-4'>
                      {!this.state.isValid &&
                        this.state.errorList.map(error => (
                          <ListGroupItem key={error} action color='danger'>
                            {error}
                          </ListGroupItem>
                        ))}
                    </ListGroup>

                    <Form className='form-horizontal'>
                      <Row>
                        <Col>
                          <Alert color='secondary'>
                            <b>User Information</b>
                          </Alert>
                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='selectUserName'>Username</Label>
                            </Col>
                            <Col xs='12' md='9'>
                              <Typeahead
                                labelKey='username'
                                minLength={minLength}
                                maxResults={maxResults}
                                options={this.state.user}
                                placeholder=''
                                onChange={this.onInputUserNameChange}
                                onInputChange={(value) => this.setState({ fullName: '' })}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='txtFullName'>Full Name</Label>
                            </Col>
                            <Col xs='12' md='9'>
                              <Input type='text' id='txtFullName' name='txtFullName' value={this.state.fullName}
                                onChange={this.onInputFullNameChange} ref='fullName' readOnly />
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='selectUserType'>User Type</Label>
                            </Col>
                            <Col xs='12' md='9'>
                              <Input type='select' id='selectUserType' name='selectUserType' defaultValue='Normal'
                                onChange={this.onInputUserTypeChange} ref='userType'>
                                <option>Initiator</option>
                                <option>Supervisor</option>
                                <option>Admin Client</option>
                              </Input>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='selectClientName'>Client Name</Label>
                            </Col>
                            <Col xs='12' md='9'>
                              <Input type='select' id='selectClientName' name='selectClientName' defaultValue='Client 1'
                                onChange={this.onSelectClientNameChange} ref='clientName'>
                                <option value=''></option>
                                {this.state.client.map((e, key) => {
                                  return <option key={key} value={e.id}> {e.clientName} </option>
                                })}
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='selectGroupName'>Group Name</Label>
                            </Col>
                            <Col xs='12' md='9'>
                              <Input type='select' id='selectGroupName' name='selectGroupName' defaultValue='Group 1'
                                disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'}
                                onChange={this.onSelectGroupNameChange} ref='groupName'>
                                <option value=''></option>
                                {this.state.group.map((e, key) => {
                                  return <option key={key} value={e.groupId}> {e.groupName} </option>
                                })}
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='numberCreditBalance'>Credit Balance</Label>
                            </Col>
                            <Col xs='12' md='9'>
                              <Input type='number' id='numberCreditBalance' name='numberCreditBalance'
                                min="0" max="2147483647"
                                disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'}
                                onChange={this.onInputCreditBalanceChange} ref='creditBalance' />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='timeOperationalHour1'>Operational Hours</Label>
                            </Col>
                            <Col xs='12' md='4'>
                              <Input type='select' id='timeOperationalHour1' name='timeOperationalHour1' defaultValue='0'
                                disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'}
                                onChange={this.onInputOperationalHour1Change} ref='startOperationalHour'>
                                <option value='0'>00.00</option>
                                <option value='1'>01.00</option>
                                <option value='2'>02.00</option>
                                <option value='3'>03.00</option>
                                <option value='4'>04.00</option>
                                <option value='5'>05.00</option>
                                <option value='6'>06.00</option>
                                <option value='7'>07.00</option>
                                <option value='8'>08.00</option>
                                <option value='9'>09.00</option>
                                <option value='10'>10.00</option>
                                <option value='11'>11.00</option>
                                <option value='12'>12.00</option>
                                <option value='13'>13.00</option>
                                <option value='14'>14.00</option>
                                <option value='15'>15.00</option>
                                <option value='16'>16.00</option>
                                <option value='17'>17.00</option>
                                <option value='18'>18.00</option>
                                <option value='19'>19.00</option>
                                <option value='20'>20.00</option>
                                <option value='21'>21.00</option>
                                <option value='22'>22.00</option>
                                <option value='23'>23.00</option>
                              </Input>
                            </Col>
                            <Col md='1' className='text-center'>
                              -
                          </Col>
                            <Col xs='12' md='4'>
                              <Input type='select' id='timeOperationalHour2' name='timeOperationalHour2' defaultValue='0'
                                disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'}
                                onChange={this.onInputOperationalHour2Change} ref='endOperationalHour'>
                                <option value='0'>00.00</option>
                                <option value='1'>01.00</option>
                                <option value='2'>02.00</option>
                                <option value='3'>03.00</option>
                                <option value='4'>04.00</option>
                                <option value='5'>05.00</option>
                                <option value='6'>06.00</option>
                                <option value='7'>07.00</option>
                                <option value='8'>08.00</option>
                                <option value='9'>09.00</option>
                                <option value='10'>10.00</option>
                                <option value='11'>11.00</option>
                                <option value='12'>12.00</option>
                                <option value='13'>13.00</option>
                                <option value='14'>14.00</option>
                                <option value='15'>15.00</option>
                                <option value='16'>16.00</option>
                                <option value='17'>17.00</option>
                                <option value='18'>18.00</option>
                                <option value='19'>19.00</option>
                                <option value='20'>20.00</option>
                                <option value='21'>21.00</option>
                                <option value='22'>22.00</option>
                                <option value='23'>23.00</option>
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='selectOperationalDay'>Operational Days</Label>
                            </Col>
                            <Col xs='12' md='4'>
                              <Input type='select' id='selectOperationalDay1' name='selectOperationalDay1' defaultValue='1'
                                disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'}
                                onChange={this.onInputOperationalDay1Change} ref='startOperationalDay'>
                                <option value='1'>Sunday</option>
                                <option value='2'>Monday</option>
                                <option value='3'>Tuesday</option>
                                <option value='4'>Wednesday</option>
                                <option value='5'>Thursday</option>
                                <option value='6'>Friday</option>
                                <option value='7'>Saturday</option>
                              </Input>
                            </Col>
                            <Col md='1' className='text-center'>
                              -
                      </Col>
                            <Col xs='12' md='4'>
                              <Input type='select' id='selectOperationalDay2' name='selectOperationalDay2' defaultValue='1'
                                disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'}
                                onChange={this.onInputOperationalDay2Change} ref='endOperationalDay'>
                                <option value='1'>Sunday</option>
                                <option value='2'>Monday</option>
                                <option value='3'>Tuesday</option>
                                <option value='4'>Wednesday</option>
                                <option value='5'>Thursday</option>
                                <option value='6'>Friday</option>
                                <option value='7'>Saturday</option>
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='selectPriority'>Priority</Label>
                            </Col>
                            <Col xs='12' md='9'>
                              <Input type='select' id='selectPriority' name='selectPriority' defaultValue='Normal'
                                disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'}
                                onChange={this.onSelectPriorityChange} ref='priority'>
                                <option>Normal</option>
                                <option>High</option>
                                <option>Very High</option>
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='selectBaCode'>BA Code</Label>
                            </Col>
                            <Col xs='12' md='9'>
                              <Input type='select' id='selectBaCode' name='selectBaCode' defaultValue='Code 1'
                                disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'}
                                onChange={this.onSelectBaCodeChange} ref='baCode'>
                                <option value=''></option>
                                {this.state.branchArea.map((e, key) => {
                                  return <option key={key} value={e.id}> {e.baCode} </option>
                                })}
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='selectCostCenter'>Cost Center</Label>
                            </Col>
                            <Col xs='12' md='9'>
                              <Input type='select' id='selectCostCenter' name='selectCostCenter' defaultValue='CC 1'
                                disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'}
                                onChange={this.onSelectBaCostCenterChange} ref='baCostCenter'>
                                <option value=''></option>
                                {this.state.costCenter.map((e, key) => {
                                  return <option key={key} value={e.id}> {e.costCenterCode} </option>
                                })}
                              </Input>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Col md='3' >
                              <Label htmlFor='checkExcludeHoliday'>Holiday Calendar</Label>
                            </Col>
                            <Col xs='12' md='9'>
                              <FormGroup check>
                                <Label check>
                                  <Input type='checkbox' id='checkExcludeHoliday' ref='urlexcludeHoliday'
                                    onChange={this.onCheckExcludeHolidayChange} checked={!(this.state.userType == 'Admin Client') ? this.state.excludeHoliday : false}
                                    disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'} />{' '}
                                  Exclude Holiday Calendar
                        </Label>
                              </FormGroup>
                            </Col>
                          </FormGroup>
                      <FormGroup row>
                        <Col md='3'>
                          <Label htmlFor='switchStatus'>Active Status</Label>
                        </Col>
                        <Col xs='12' md='9'>
                          <Switch
                            onChange={this.onSwitchStatusChange}
                            checked={this.state.activeStatus}
                            id='switchStatus'
                          />
                        </Col>
                      </FormGroup>

                          <Alert color='secondary'>
                            <FormGroup check>
                              <Label check>
                                <Input type='checkbox' id='checkUrlStatus' ref='urlStatus' disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'}
                                  onChange={this.onSelectUrlStatusChange} checked={!(this.state.userType == 'Admin Client') ? this.state.urlStatus : false} />{' '}
                                <b>Forward Call</b>
                              </Label>
                            </FormGroup>
                          </Alert>
                          <Collapse isOpen={this.state.collapseFC} id='collapseBody'>
                            <FormGroup row>
                              <Col md='3' >
                                <Label htmlFor='urlInbox'>URL Call Center</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='url' id='urlInbox' name='urlInbox'
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.urlStatus) ? '' : 'disabled'}
                                  onChange={this.onInputUrlInboxChange} ref='urlInbox' />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md='3' >
                                <Label htmlFor='urlUserName'>Username</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='text' id='urlUserName' name='urlUserName' maxLength='20'
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.urlStatus) ? '' : 'disabled'}
                                  onChange={this.onInputUrlUserNameChange} ref='urlUserName' />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md='3' >
                                <Label htmlFor='urlPassword'>Password</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='password' id='urlPassword' name='urlPassword' maxLength='20'
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.urlStatus) ? '' : 'disabled'}
                                  onChange={this.onInputUrlPasswordChange} ref='urlPassword' />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md='3' >
                                <Label htmlFor='selectMessageFormat'>Message Format</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='select' id='selectMessageFormat' name='selectMessageFormat'
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.urlStatus) ? '' : 'disabled'}
                                  defaultValue='Format 1'
                                  onChange={this.onSelectUrlMessageFormatChange} ref='urlMessageFormat'>
                                  <option>Format1</option>
                                  <option>Format2</option>
                                  <option>Format3</option>
                                </Input>
                              </Col>
                            </FormGroup>
                          </Collapse>
                          <Alert color='secondary'>
                            <FormGroup check>
                              <Label check>
                                <Input type='checkbox' id='checkFtpStatus' ref='ftpStatus'
                                  disabled={!(this.state.userType == 'Admin Client') ? '' : 'disabled'}
                                  onChange={this.onSelectFtpStatusChange} checked={!(this.state.userType == 'Admin Client') ? this.state.ftpStatus : false} />{' '}
                                <b>FTP Setup</b>
                              </Label>
                            </FormGroup>
                          </Alert>
                          <Collapse isOpen={this.state.collapseFTP} id='collapseBody'>
                            <FormGroup row>
                              <Col md='3' >
                                <Label htmlFor='selectType'>Type</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='select' id='selectType' name='selectType' defaultValue='Active'
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.ftpStatus) ? '' : 'disabled'}
                                  onChange={this.onSelectFtpTypeChange} ref='ftpType'>
                                  <option>Active</option>
                                  <option>Passive</option>
                                </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md='3' >
                                <Label htmlFor='ftpDirectory'>Directory</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='text' id='ftpDirectory' name='ftpDirectory' onChange={this.onInputFtpDirectoryChange}
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.ftpStatus && this.state.passiveSelected) ? '' : 'disabled'} ref='ftpDirectory'
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md='3' >
                                <Label htmlFor='ftpUserName'>Username</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='text' id='ftpUserName' name='ftpUserName' maxLength='20'
                                  onChange={this.onInputFtpUserNameChange}
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.ftpStatus && this.state.passiveSelected) ? '' : 'disabled'} ref='ftpUserName'
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md='3' >
                                <Label htmlFor='ftpPassword'>Password</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='password' id='ftpPassword' name='ftpPassword' maxLength='20'
                                  onChange={this.onInputFtpPasswordChange}
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.ftpStatus && this.state.passiveSelected) ? '' : 'disabled'} ref='ftpPassword'
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md='3' >
                                <Label htmlFor='ftpContent'>SMS Content</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='textarea' rows='10' id='ftpContent' name='ftpContent'
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.ftpStatus) ? '' : 'disabled'}
                                  onChange={this.onInputFtpContentChange} ref='ftpContent' />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md='3' >
                                <Label htmlFor='selectDelimiter'>Content Delimiter</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='select' id='selectDelimiter' name='selectDelimiter' defaultValue=';'
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.ftpStatus) ? '' : 'disabled'}
                                  onChange={this.onSelectFtpDelimiterChange} ref='ftpDelimiter'>
                                  <option value=';'>Semicolon ';'</option>
                                  <option value='|'>Pipe '|'</option>
                                  <option value='#'>Hashtag '#'</option>
                                </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md='3' >
                                <Label htmlFor='selectFileType'>File Type</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='select' id='selectFileType' name='selectFileType' defaultValue='TXT'
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.ftpStatus) ? '' : 'disabled'}
                                  onChange={this.onSelectFtpFileTypeChange} ref='ftpFileType'>
                                  <option>TXT</option>
                                  <option>CSV</option>
                                </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md='3'>
                                <Label htmlFor='numberPinColumn'>Pin Column</Label>
                              </Col>
                              <Col xs='12' md='9'>
                                <Input type='number' id='numberPinColumn' name='numberPinColumn'
                                  disabled={(!(this.state.userType == 'Admin Client') && this.state.ftpStatus) ? '' : 'disabled'}
                                  onChange={this.onSelectFtpPinColumnChange} ref='ftpPinColumn' />
                              </Col>
                            </FormGroup>
                          </Collapse>
                        </Col>
                      </Row>
                      <FormGroup row>
                        <Col md='3' />
                        <Col xs='12' md='9'>
                          <div className='form-actions'>
                            <Button
                              onClick={this.onButtonSaveClick}
                              color='primary'
                              className='btn-sm mr-1'
                            >
                              <i className='fa fa-dot-circle-o' /> Save
                          </Button>
                            <Button
                              color='danger'
                              className='btn-sm'
                              onClick={this.onButtonCancelClick}
                            >
                              <i className='fa fa-ban' /> Cancel
                          </Button>
                          </div>
                        </Col>
                      </FormGroup>
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
  currentAction: state.get('userApplicationReducer').currentAction,
  loading: state.get('userApplicationReducer').loading,
  error: state.get('userApplicationReducer').error,
  data: state.get('userApplicationReducer').data,
  user: state.get('userApplicationReducer').user,
  client: state.get('userApplicationReducer').client,
  group: state.get('userApplicationReducer').group,
  branchArea: state.get('userApplicationReducer').branchArea,
  costCenter: state.get('userApplicationReducer').costCenter
});

const mapDispatchToProps = dispatch => {
  return {
    addUserApplication: (model) => {
      dispatch(addUserApplication(model));
    },
    getUserApplicationByUsername: (username) => {
      dispatch(getUserApplicationByUsername(username));
    },
    getUser: () => {
      dispatch(getUser());
    },
    getClient: () => {
      dispatch(getClient());
    },
    getGroup: (clientName) => {
      dispatch(getGroup(clientName));
    },
    getBranchArea: () => {
      dispatch(getBranchArea());
    },
    getCostCenter: (baCode) => {
      dispatch(getCostCenter(baCode));
    }
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'userApplicationReducer',
  reducer: userApplicationReducer,
});

const withSaga = injectSaga({
  key: 'userApplicationSaga',
  saga: userApplicationSaga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Add);
