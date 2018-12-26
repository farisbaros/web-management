import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

import { configureStore as iConfigureStore} from "redux-inject-reducer-and-saga";

export default function configureStore(initialState) {

  const sagaMiddleware = createSagaMiddleware();
  const middleware = [thunk, sagaMiddleware];
  const enhancers = [];

  let composeEnhancers = compose;

  // const store = createStore(
  //   rootReducer(),
  //   initialState,
  //   //applyMiddleware(sagaMiddleware)
  //   composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  // );

  const store = iConfigureStore(
    rootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  );

  store.asyncReducers = {};
  // store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);


  return store;
}
