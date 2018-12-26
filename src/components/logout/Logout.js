import React, { Component } from 'react';
import { DropdownItem } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    localStorage.removeItem('token');
    const loggedIn = localStorage.getItem('token') != null ? true : false;
    this.setState({ loggedIn: loggedIn });
  }

  render() {
    if (!this.state.loggedIn) {
      return (<Redirect to="/login" />);
    }

  }
}

export default Logout;
