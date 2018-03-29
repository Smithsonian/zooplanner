import {applyMiddleware, createStore} from 'redux';
import allReducers from "./dev/js/reducers";
import {createLogger} from "redux-logger";
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise(), thunk, createLogger())
const store = createStore(allReducers, middleware);

console.log(store.getState())
export default store;

