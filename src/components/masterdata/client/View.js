import React, { Component } from "react";
import { compose } from 'redux';
import { connect } from "react-redux";
import { configureStore, injectReducer, injectSaga } from "redux-inject-reducer-and-saga";
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import ReactTable from "react-table";
import MUIDataTable from "mui-datatables";
import Paper from '@material-ui/core/Paper';

import * as ReactDOM from 'react-dom';
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

import axios from "axios";


import PropTypes from "prop-types";
import { history } from "../../../services";

import { fetchProducts } from "../../../actions";

import { getClient } from './Action';
import { clientReducer } from './Reducer';
import { clientSaga } from './Saga';


class View extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      clientName: ''
    };

    this.onInputClientNameChange = this.onInputClientNameChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.template = this.gridTemplate.bind(this);
    this.onGridRowDeleteClick = this.onGridRowDeleteClick.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  onInputClientNameChange(e) {
    this.setState({ clientName: e.target.value });

  }

  onSearchClick(e) {
    this.search();
  }

  onAddClick() {
    this.props.history.push("/masterdata/client/add");
  }

  onGridRowDeleteClick(id) {

  }

  search() {
    var criteria = {
      clientName: this.state.clientName
    }
    this.props.getClient(criteria);
  }

  gridTemplate(props) {
    var id = props.clientId
    var editLink = '#/masterdata/client/edit/' + id;

    return (
      <div>
        <a className="btn btn-sm btn-primary" href={editLink}>
          Edit
        </a>
        <a
          className="btn btn-sm btn-danger"
          onClick={() => {
            if (window.confirm("Delete this data?"))
              this.onGridRowDeleteClick(props.clientId);
          }}
        >
          Delete
        </a>
      </div>
    );
  }

  render() {
    const { data, loading } = this.props;

    const columns = [
      {
        Header: '',
        width: 55,
        accessor: 'clientId',
        Cell: props =>
        <a className="btn btn-sm btn-primary" href={'#/masterdata/client/edit/' + props.value}>
          Edit
        </a>
      },
      {
        Header: 'Client Name',
        accessor: 'clientName'
      }]

    // const columns = [
    //   {
    //     name: "",
    //     options: {
    //       filter: false,
    //       sort: false
    //     }
    //   },
    //   {
    //     name: "Client Name",
    //     options: {
    //       filter: true,
    //       sort: true,
    //     }
    //   },
    // ];
    // const EditButton = ({ onExecute }) => (
    //   <IconButton onClick={onExecute} title="Edit row">
    //     <EditIcon />
    //   </IconButton>
    // );

    // const commandComponents = {
    //   edit: EditButton
    // };

    // const Command = ({ id, onExecute }) => {
    //   const CommandButton = commandComponents[id];
    //   return (
    //     <CommandButton
    //       onExecute={onExecute}
    //     />
    //   );
    // };


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
                          <Label>Client Name</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="input"
                            name="clientName"
                            value={this.state.clientName}
                            onChange={this.onInputClientNameChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3" />
                        <Col xs="12" md="9">
                          <Button
                            type="submit"
                            color="primary"
                            className="btn-sm"
                            onClick={this.onSearchClick}
                          >
                            Search
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
                      className="btn btn-primary btn-sm  mB-10"
                      onClick={this.onAddClick}
                    >
                      +
                  </button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
              {/* <Paper>
              <Grid
                rows={data}
                columns={[
                  { name: 'clientId', title: 'Client ID' },
                  { name: 'clientName', title: 'Client Name' }
                ]}>
                <Table />
                <TableHeaderRow />
              </Grid>
              </Paper> */}

                {/* <MUIDataTable
                  data={data}
                  columns={columns}
                /> */}

                <ReactTable
                  className="-striped -highlight"
                  data={data}
                  columns={columns}

                />

                {/* <GridComponent
                dataSource={data}
                allowPaging={true}
                allowSorting={true}
              >
                <ColumnsDirective>
                  <ColumnDirective
                    template={this.template}
                    width="120"
                    textAlign="Center"
                  />
                  <ColumnDirective
                    field="clientId"
                    headerText="Client ID"
                    textAlign="Right"
                    visible={false}
                  />
                  <ColumnDirective
                    field="clientName"
                    headerText="Client Name"
                  />
                </ColumnsDirective>
                <Inject services={[Page, Sort]} />
              </GridComponent> */}
              </Col>
            </Row>
          </Fade>
        </BlockUi>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.get('clientReducer').data,
  loading: state.get('clientReducer').loading
});

// function mapStateToProps(state) {
//   //debugger;
//   return {
//     data: state.get('clientReducer').data,
//     loading: state.get('clientReducer').loading
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    getClient: (criteria) => {
      dispatch(getClient(criteria));
    }
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'clientReducer',
  reducer: clientReducer,
});

const withSaga = injectSaga({
  key: 'clientSaga',
  saga: clientSaga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(View);

// export default connect(
//   mapStateToProps, mapDispatchToProps)(View);

// export default connect(
//   mapStateToProps)(withRouter(View));
