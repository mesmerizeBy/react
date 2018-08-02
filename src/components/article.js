import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import request from './util/request.js';
import {Row, Col} from 'antd';

class Article extends React.Component {
	state={
		content:"",
		title:"",
		data:"",
		tags:"",
		types:""
	}
	componentDidMount(){
		var a_id=this.props.match.params.id
		console.log(a_id)
		var target=this;
		request.post('/getArticle',{"id":a_id}).then((response)=>response.json()).then(function(res){
	        target.setState({
	        	content:res['content'],
	        	title:res['title'],
	        	data:res['data'],
	        	tags:res['tags'],
	        	types:res["types"]
	        })

	    }).catch(console.log);
	}
	render() {
		
    	return (
    		<div>
	    		<QueueAnim>
	    			<Row>
	    				<Col span={8} offset={8}><h2 style={{textAlign:"center"}}>{this.state.title}</h2></Col>
	    			</Row>
				  <div key="b" dangerouslySetInnerHTML = {{ __html:this.state.content }} style={{ width: '100%', border: '1px solid #d9d9d9', borderRadius: 4 }}>
				    
				  </div>
			  	</QueueAnim>
		  	</div>
  		)
    }
}

export default Article;