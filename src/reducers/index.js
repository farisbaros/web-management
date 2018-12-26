import { combineReducers } from 'redux'

// export const injectReducer = (store, { key, reducer }) => {
//   if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

//   store.asyncReducers[key] = reducer
//   store.replaceReducer(rootReducer(store.asyncReducers))
// }
export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(rootReducer(store.asyncReducers));
}

export default function rootReducer(asyncReducers) {
  return combineReducers({
    ...asyncReducers
  });
}

