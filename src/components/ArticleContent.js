import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import request from './util/request.js';
import {Row, Col,Icon,Tag} from 'antd';
import { Route,Link ,Switch as Sroute,Redirect} from 'react-router-dom';


const colors=['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple'];
class ArticleContent extends React.Component{
	state={
		content:"",
		title:"",
		date:"",
		tags:[],
		types:[]
	}
	componentDidMount(){
		var a_id=this.props.match.params.id
		console.log(a_id)
		var target=this;
		request.post('/getArticle',{"id":a_id}).then((response)=>response.json()).then(function(res){
			console.log(res)
	        target.setState({
	        	content:res['content'],
	        	title:res['title'],
	        	date:res['date'],
	        	tags:res['tags'],
	        	types:res["types"]
	        })

	    }).catch(console.log);
	}
	render() {
		
    	return (
    		<div style={{margin:"10px 10px", boxShadow:'0 0 5px #888888',padding:"10px 10px"}}>
				<h2 style={{textAlign:"center",width:"100%"}}>{this.state.title}</h2>
				<p style={{lineHeight:"40px",fontColor:"#666",margin:"0",borderBottom:"1px solid #ccc"}}>
					{this.state.date}
				</p>
				<div dangerouslySetInnerHTML = {{ __html:this.state.content }} style={{ width: '100%',minHeight:"200px",margin:"20px 0",textIndent:"2em" ,fontSize:"16px"}}></div>
			   
			        <p style={{margin:"5px 0"}}>个人分类:&nbsp;
			        {this.state.types.map(type=>(
			        	<Tag color={colors[Math.round(Math.random()*10)]} >
          				{type}
        				</Tag>
			        ))}
			        </p>
			       
        			<p style={{margin:"5px 0"}}>标签:&nbsp;
        			{this.state.tags.map(tag=>(
			        	<Tag color={colors[Math.round(Math.random()*10)]} >
          				{tag}
        				</Tag>
			        ))}
			        </p>
		  	</div>
  		)
    }
}

export default ArticleContent;