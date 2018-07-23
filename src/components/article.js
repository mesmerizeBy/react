import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
class Article extends React.Component {
	render() {
		console.log("article");
    	return (
    		<div>
	    		<QueueAnim>
				  <div key="b" style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
				    <span>123456</span>
				  </div>
			  	</QueueAnim>
		  	</div>
  		)
    }
}

export default Article;