import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Fade, Col, Row, Table, Form, FormGroup, Label, Input, CardFooter, Button } from 'reactstrap';
// import Service from './Service';

class Add extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clientName: '',
      email: ''
    };

    // this.Service = new Service();
  }

  onInputClientName = event => {
    this.setState({ clientName: event.target.value });
  }

  onInputEmail = event => {
    this.setState({ email: event.target.value });
  }

  onSubmit = event => {
    event.preventDefault();

    const obj = {
      clientId: this.state.clientId,
      clientName: this.state.clientName,
      email: this.state.email
    };

    // this.Service.post(obj).then(res => {
    //     alert("Success Save");
    // });
  }

  render() {

    return (
      <div>
        <Fade>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <strong>Add Client</strong>
                </CardHeader>
                <CardBody>
                  <Form method="post" onSubmit={this.onSubmit} className="form-horizontal">
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="txtClientName">Client Name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="txtClientName" name="txtClientName" onChange={this.onInputClientName} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="txtEmail">Email</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input type="text" id="txtEmail" name="txtEmail" onChange={this.onInputEmail} />
                      </Col>
                    </FormGroup>
                    <div className="form-actions">
                      <Button type="submit" color="primary"><i className="fa fa-dot-circle-o"></i> Save</Button>
                      <a className="btn btn-danger" href="/masterdata/client/"><i className="fa fa-ban"></i> Cancel</a>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Fade>
      </div>
    )
  }
}

export default Add;
