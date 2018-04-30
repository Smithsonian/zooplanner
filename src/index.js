import React from 'react';
import ReactDOM from 'react-dom';
import App from './dev/js/components/App';
import './dev/css/Main.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from 'react-redux';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// store.dispatch({
// 	type: "FETCH_ANIMALS",
// 	payload: axios.get('https://nationalzoo.si.edu/pyd/views/animals?display_id=list')
// });

const root = document.getElementById('root');
const Appp = () => (
	<MuiThemeProvider>
    	<App />
	</MuiThemeProvider>
)

ReactDOM.render(
	<Provider store={store}>
		<Appp />
	</Provider>, root);