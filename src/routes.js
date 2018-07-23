import { Route,HashRouter,Link ,Switch,BrowserRouter} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import SideMenu from './components/main.js';
class Routes extends React.Component {
	
	render() {
    	return (
		  <BrowserRouter>
		  	<div style={{ weidth: '100%', height: '100%' }}>
	        	<Route  path="/" component={SideMenu}/>
	        </div>
	      </BrowserRouter>
  		);
    }
}

export default Routes;