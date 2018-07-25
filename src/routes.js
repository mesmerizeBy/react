import { Route,HashRouter,Link ,Switch,BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main.js';
class Routes extends React.Component {
	
	render() {
    	return (
		  <HashRouter>
		  	<div style={{ width: '100%', height: '100%' }}>
	        	<Route  path="/" component={Main}/>
	        </div>
	      </HashRouter>
  		);
    }
}

export default Routes;