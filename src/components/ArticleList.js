import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import request from './util/request.js';
import {Row, Col,List,Icon,Tag} from 'antd';
import { Route,Link ,Switch as Sroute,Redirect} from 'react-router-dom';
import {setCount} from './action/maina.js';
import {connect } from 'react-redux';


const colors=['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple'];

class ArticleList extends React.Component{
	state={
		list:[],
		typelist:{}
	}
	componentDidMount(){
		var a_id=this.props.match.params.id
		console.log(a_id)
		var target=this;
		request.post('/getArticleList',{}).then((response)=>response.json()).then(function(res){
			console.log(res);
	        target.setState({
	        	list:res['list'],
	        	
	        })
	        target.props.onSet(res['count']);
			
	    }).catch(console.log);
	}
	render() {
		console.log(this.props)
    	return (
    		<div style={{margin:"10px 10px", boxShadow:'0 0 5px #888888',padding:"10px 20px"}}>
    				<h2 style={{textAlign:'center'}}> 文章列表</h2>
					<List
				    itemLayout="horizontal"
				    dataSource={this.state.list}
				    renderItem={item => (
				    	
				      <List.Item>
				      	<Row style={{width:"100%"}}>
				      	<Col span={24}>
				        <h3 style={{fontWeight:"600"}}>{item.title}</h3>
				        </Col>
				        <Col span={24} style={{display:"flex",flex:"1 0 auto",alignItems: 'center'}}>
				        <Icon style={{marginRight:"10px"}} type="calendar" />
				        {item.date}&emsp;
				        <Icon style={{marginRight:"10px"}} type="bars" />
				        <p style={{margin:"0"}}>{item.types.map(type=>(
				        	<Tag color={colors[Math.round(Math.random()*10)]} >
              				{type}
            				</Tag>
				        ))
            			}</p><Icon style={{marginRight:"10px"}} type="tag" />
            			<p style={{margin:"0"}}>{item.tags.map(tag=>(
				        	<Tag color={colors[Math.round(Math.random()*10)]} >
              				{tag}
            				</Tag>
				        ))
            			}</p>
            			</Col>
            			<Col span={24}>
            			<p style={{margin:"0"}}>{item.summary}</p>
            			</Col>
            			<Col span={24}>
            			<p style={{textAlign:"right"}}><Link to={"/Article/"+item.article_id} >查看</Link></p>
            			</Col>
            			</Row>
				      </List.Item>
				    )}
			  		/>
		  	</div>
  		)
    }
}

function mapStateToProps(state) {
    return {
      count:state.articleState.count,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        onSet:(o)=>dispatch(setCount(o)),
    }
}
ArticleList=connect(mapStateToProps, mapDispatchToProps)(ArticleList);

export default ArticleList;