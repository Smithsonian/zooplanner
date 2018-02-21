import {combineReducers} from 'redux';
import AnimalReducer from './reducer-animals';

const allReducers = combineReducers({
    animals: AnimalReducer, //data is now called animals pulled from reducer-animals.js
});

export default allReducers;
