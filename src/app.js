import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Routes from './routes.js'
import {reducer} from './components/reducers/mainr.js'
 

 

let store = createStore(reducer);
 
//渲染组件
window.onload = () => {
	ReactDOM.render(
	    <Provider store={store}>
	        <Routes />
	    </Provider>,
	    document.getElementById('app')
	)
}
