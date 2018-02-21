import React from 'react';
import ReactDOM from 'react-dom';
import App from './dev/js/components/App';
import './dev/css/Main.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from 'react-redux';
import store from './store'


// store.dispatch({
// 	type: "FETCH_ANIMALS",
// 	payload: axios.get('https://nationalzoo.si.edu/pyd/views/animals?display_id=list')
// });

const root = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, root);