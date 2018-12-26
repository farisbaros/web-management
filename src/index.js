import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./store/configureStore";
import rootSaga from "./sagas";
import routes from "./routes";
import createHistory from 'history/createBrowserHistory'

// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);

const history = createHistory()

ReactDOM.render(<App
  store={store}
  routes={routes}
  history={history}/>,
  document.getElementById("root"));

// disable ServiceWorker
// registerServiceWorker();
