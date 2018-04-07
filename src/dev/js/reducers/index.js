import {combineReducers} from 'redux';
import AnimalReducer from './reducer-animals';
import ExhibitReducer from './reducer-exhibits';
import DateReducer from './reducer-date';
import TripReducer from './reducer-trip';
import AttractionReducer from './reducer-attractions';
import ExploreBarReducer from './reducer-exploreBar';
import AppReducer from './reducer-App';

const allReducers = combineReducers({
    animals: AnimalReducer, //data is now called animals pulled from reducer-animals.js
    exhibits: ExhibitReducer,
    date: DateReducer,
    trip: TripReducer,
    attractions: AttractionReducer,
    exploreBar: ExploreBarReducer,
    App: AppReducer,
});

export default allReducers;
