import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import {Row, Col,Icon} from 'antd';
import { Route,Link ,Switch as Sroute,Redirect} from 'react-router-dom';
import ArticleContent from './ArticleContent.js'
import ArticleList from './ArticleList.js'

class Article extends React.Component {
	
	render() {
		
    	return (
    		<div>
	    		<QueueAnim>
	    		<div key="art" style={{ width: '100%',height:'100%',overflow:"auto"}} >
		    			<Row>
		    				
		    				<Col span={16} >
		    					<Sroute>
		    						
				                    <Route  path='/Article/:id' component={ArticleContent}/>
				                    <Route  path='/Article' component={ArticleList}/>
				                </Sroute>
		    				</Col>
		    				<Col span={8} >
		    					<div style={{margin:"10px 10px", boxShadow:'0 0 5px #888888',padding:"10px 20px",display:"flex",flex:"1 0 auto",alignItems: 'center',justifyContent:"center"}}>
		    						<Icon style={{marginRight:"10px"}} type="bars" /><h3 style={{fontWeight:"600",margin:"0"}}>分类</h3>
		    					</div>
		    					<div style={{margin:"10px 10px", boxShadow:'0 0 5px #888888',padding:"10px 20px"}}>

		    					</div>
		    				</Col>
							

						
						</Row>
				</div>
			  	</QueueAnim>
		  	</div>
  		)
    }
}

export default Article;