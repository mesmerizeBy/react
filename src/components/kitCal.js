import React from 'react';
import ReactDOM from 'react-dom';
import { Calendar } from 'antd';
import QueueAnim from 'rc-queue-anim';
function onPanelChange(value, mode) {
  console.log(value, mode);
}

class KitCal extends React.Component {
	shouldComponentUpdate(){
		 return this.props.location.action === "POP";
	}
	render() {
    	return (
    		<div>
	    	  <QueueAnim>
				  <div key="a" style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
				    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
				  </div>
			  </QueueAnim>
		  	</div>
  		)
    }
}

export default KitCal;