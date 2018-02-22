import {combineReducers} from 'redux';
import AnimalReducer from './reducer-animals';
import ExhibitReducer from './reducer-exhibits';

const allReducers = combineReducers({
    animals: AnimalReducer, //data is now called animals pulled from reducer-animals.js
    exhibits: ExhibitReducer,
});

export default allReducers;
