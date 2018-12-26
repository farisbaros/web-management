import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import PropTypes from "prop-types";

// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './styles/scss/style.css'
import './styles/style.css'

// Containers
import { DefaultLayout } from './containers';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';

import { PrivateRoute } from './utils/PrivateRoute';


class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { store, routes, history } = this.props;

    return (
      <Provider store={store} routes={routes} history={history}>
        <HashRouter>
          <Switch>
            <Route path="/login" name="Login Page" component={Login} />
            <Route path="/logout" name='Logout' component={Logout} />
            <PrivateRoute path="/" name="Home" component={DefaultLayout} />
            {/* <Route path="/" name="Home" component={DefaultLayout} /> */}
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
