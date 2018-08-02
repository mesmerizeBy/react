 import React from 'react';
import QueueAnim from 'rc-queue-anim';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Editor from 'wangeditor';
import {connect } from 'react-redux';
import EditableTagGroup from './tags.js';
import TypeTag from './typetags.js';
import { Form, Icon, Input, Button, Checkbox , Row, Col,Switch} from 'antd';
import {addType,removeType} from './action/maina.js';
import request from './util/request.js';


const FormItem = Form.Item;

class EditorMo extends React.Component{
	state={
		checked:[],
		title:""
	}

	constructor(props){
		super(props);
		this.checkbox=this.checkbox.bind(this);
		this._div=React.createRef();
		if(!props.isLogin){
			console.log("重定向");
			
			props.history.push("/console");
			return ;
		}
	}
	handleInputChange=(e)=>{
		this.setState({ title: e.target.value });
		console.log(this.state.title)
	}
	checkbox(value){
		if(value.length>this.state.checked.length){
			this.props.onAdd(value.filter((v)=>this.state.checked.indexOf(v)== -1)[0])
		}
		else{
			this.props.onRemove(this.state.checked.filter((v)=>value.indexOf(v)== -1)[0])
		}
		this.setState({
	      checked: value,
	    });
	}
	handleSubmit = (e) => {
	    e.preventDefault();
	    var p=this.props;
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        values['content']=this.editor.txt.html()
	        request.post('/publish',values).then((response)=>response.json()).then(function(res){
	        	console.log(res);
	        	// p.history.push("/Article/"+res['id']);
		      	
		    }).catch(console.log);
	      }
	      else{
	      	console.log(err)
	      }
	    });
	  }
	
	componentDidMount() {
		
		// console.log(this.props)
		this. editor = new Editor(this._div.current);
		this. editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
		this.editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
		this.editor.customConfig.uploadFileName = 'article'
		
		this.editor.create();
		this.editor.$textElem[0].parentNode.style.height="600px";
  	}
  	
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: { span: 3 },
	      wrapperCol: { span: 14 },
	    };
		return (
			<div style={{overflow:'auto'}}>
				<Form onSubmit={this.handleSubmit} className="login-form">
				<FormItem
				wrapperCol={{ span: 24 }}
				>
				{getFieldDecorator('title', 
					{rules: [{ required: true, message: '请输入文章标题'}],initialValue:this.state.title}
					)(
		            <Input size="large" onChange={this.handleInputChange} value={this.state.title} placeholder="输入文章标题" />
		          )}
				
				</FormItem>
				<div key="console" ref={this._div} style={{width:"100%",height:"100%"}}>

				</div>
				
				
		        <FormItem label="Tags" {...formItemLayout}>
		          {getFieldDecorator('tags', {
		            rules: [{ required: true, message: 'Please add a tag',type:'array'}],

		          })(
		            <EditableTagGroup />
		          )}
		        </FormItem>
		        <FormItem
		          {...formItemLayout}
		          label="Type"
		        >
		          {getFieldDecorator('types',{
		          	rules: [{ required: true, message: 'Please select a type or add ones'}]
		          })(
		          <div>
		          	<TypeTag/>
		            <Checkbox.Group style={{ width: '100%' }} value={this.state.checked} onChange={this.checkbox}>
						<Row>
						  <Col span={2}><Checkbox value="A">A</Checkbox></Col>
						  <Col span={2}><Checkbox value="B">B</Checkbox></Col>
						  <Col span={2}><Checkbox value="C">C</Checkbox></Col>
						  <Col span={2}><Checkbox value="D">D</Checkbox></Col>
						  <Col span={2}><Checkbox value="E">E</Checkbox></Col>
						</Row>
					</Checkbox.Group>

		          </div>
		          )}
		        </FormItem>
		        <FormItem
		          {...formItemLayout}
		          label="文章类型"
		        >
		          {getFieldDecorator('isPublic', { valuePropName: 'checked', initialValue: false})(
		            <Switch defaultChecked checkedChildren="私密"  unCheckedChildren="公开"/>
		          )}
		        </FormItem>
		        <FormItem wrapperCol={{ span: 14 ,offset:3}}>
		        	<Button type="primary" htmlType="submit"  className="login-form-button">
	                发布
	          		</Button>
          		</FormItem>
				</Form>
			</div>
		)
	}
}
EditorMo = Form.create({
  mapPropsToFields(props) {

		return {
		  tags: Form.createFormField({
		    ...props.tags,
		    value: props.tags,
		  }),
		  types: Form.createFormField({
		    ...props.types,
		    value: props.types,
		  })
		};
	}
})(EditorMo);

function mapStateToProps(state) {
    return {
    	tags:state.articleState.tags,
  		isLogin:state.mainState.isLogin,
  		types:state.articleState.types
    }
}

function mapDispatchToProps(dispatch){
    return{
        onAdd:(types)=>dispatch(addType(types)),
        onRemove:(types)=>dispatch(removeType(types))
    }
}

EditorMo=connect(mapStateToProps, mapDispatchToProps)(EditorMo);

export default EditorMo;