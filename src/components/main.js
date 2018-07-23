 import React from 'react';
import ReactDOM from 'react-dom';
import KitCal from './kitCal.js';
import Article from './article.js';
import { Layout, Menu, Icon,Switch ,Avatar } from 'antd';
import { Route,Link ,Switch as Sroute,Redirect} from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import {connect } from 'react-redux';
import {reducer} from './reducer/mainr.js';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class SideMenu extends React.Component {
  state = {
    collapsed: false,
    theme: 'dark',
    current: '1',
  };
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  shouldComponentUpdate(nextProps,nextState){
    if(nextState.theme!=this.state.theme||nextState.collapsed!=this.state.collapsed){
      return true;
    }
    else{
      return this.props.location.action === "POP"
    }
  }
  // shouldComponentUpdate(){
  //    return this.props.location.action === "POP";
  // }
  render() {
    const k = this.props.match.path;

    const {collapsed,theme,current}=this.props;
    console.log(k);
    return (
      <Layout
      className="components-layout-demo-custom-trigger"
      style={{height:'100%'}}
      >
     
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          className={this.state.theme}
        >
         <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="暗黑"
          unCheckedChildren="纯白"
        />
          <Menu theme={this.state.theme} onClick={this.handleClick} mode="inline" defaultSelectedKeys={['2']} >
          <SubMenu key="0" style={{borderBottom:'solid 1px #666'}} title={<span><Avatar src={require('../images/person.jpg')}/>&emsp;<span>&emsp;邹鹏辉</span></span>}>
            <Menu.Item key="1" ><Icon type="profile" />我的简历</Menu.Item>
          </SubMenu>

            <Menu.Item key="2">
            <Link to="/">
              <Icon type="file-text" />
              <span>文章</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to="/BlockWallet">
              <Icon type="api" />
              <span>区块链</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4" >
            <Link to="/">
              <Icon type="ellipsis" />
              <span>推荐</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5" >
            <Link to="/tool">
              <Icon type="tool" />
              <span>小工具</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content  style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          
            <QueueAnim className="demo-content" type={['right', 'left']}>
            <div key={this.props.location.pathname}>
              <Sroute>
                    <Route  path='/' exact component={Article}/>
                    <Route  path='/tool' exact component={KitCal}/>
                    <Route  path='/BlockWallet'  component={KitCal}/>
              </Sroute>
            </div>
            </QueueAnim>

          </Content>
        </Layout>
      </Layout>
    );
  }
}

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
    	collapsed: state.collapsed,
    	theme:state.theme,
    	current:state.current
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        onButtonClick:()=>dispatch(buttonClickAction),
        onChangeText:()=>dispatch(changeTextAction)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);