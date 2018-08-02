import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import QueueAnim from 'rc-queue-anim';
import 'es6-promise';
import Editor from 'wangeditor';
import {connect } from 'react-redux';
import {Login} from './action/maina.js';
import request from './util/request.js';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login();
      }
    });
  }
  login =()=>{
    var user=this.props.form.getFieldsValue()['userName'];
    var pwd=this.props.form.getFieldsValue()['password'];
    var props =this.props;
    
    request.post('/login',{"user":user,"pwd":pwd}).then((response)=>response.json()).then(function(res){
      
      if(res.status==1){
        props.onLogin();
        props.history.push('/console/write');
      }
    }).catch(console.log);
  }
  componentDidMount(){
    if(this.props.isLogin)
    this.props.history.push("/console/write")
  }
  componentWillReceiveProps(props){
    
    if(props.isLogin)
    props.history.push("/console/write")
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <QueueAnim>
        <div key="login" style={{ width: 300, margin: '200px auto'}}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <Button type="primary" htmlType="submit"  className="login-form-button">
                进入
              </Button>
            </FormItem>
          </Form>
        </div>
      </QueueAnim>
    );
  }
}

var LoginForm = Form.create()(NormalLoginForm);

function mapStateToProps(state) {
    return {
      isLogin:state.mainState.isLogin,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        onLogin:()=>dispatch(Login),
    }
}
LoginForm=connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LoginForm;