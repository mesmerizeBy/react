 import React from 'react';
import ReactDOM from 'react-dom';
import KitCal from './kitCal.js';
import Article from './article.js';
import { Layout, Menu, Icon,Switch ,Avatar,Breadcrumb } from 'antd';
import { Route,Link ,Switch as Sroute,Redirect} from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import {connect } from 'react-redux';

import {changeTheme,changePath} from './action/maina.js';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;



class Main extends React.Component {
  state = {
    collapsed: false,
    current: '1',
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

  render() {
    
    return (
      <Layout className="components-layout-demo-custom-trigger" style={{height:'100%'}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme={this.props.theme} >
            <Switch checked={this.props.theme === 'dark'} onChange={this.props.onchangeTheme}  checkedChildren="Dark"  unCheckedChildren="Light"/>
            <Menu theme={this.props.theme} onClick={this.handleClick} defaultOpenKeys={['sub1']}  selectedKeys={[this.state.current]} mode="inline">
                <SubMenu key="sub1" style={{borderBottom:'solid 1px #666'}} title={<span><Avatar src={require('../images/person.jpg')}/>&emsp;<span>&emsp;邹鹏辉</span></span>}>
                    <Menu.Item key="1" ><Link to="/" onClick={this.props.onchangePath.bind(this,["MyProfile"])}><Icon type="profile" />我的简历</Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="2">
                    <Link to="/" onClick={this.props.onchangePath.bind(this,["Article"])}>
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
                    <Link to="/collection">
                        <Icon type="appstore" />
                        <span>收藏柜</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="6" >
                    <Link to="/tool">
                        <Icon type="tool" />
                        <span>小工具</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
                <div style={{float:'left'}}><Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} /></div>
                <div style={{float:'left'}}>
                <Breadcrumb style={{ "line-height": '64px' }}>
                {
                    this.props.bread.length>0?this.props.bread.map((item, index)=>{
                        return  <Breadcrumb.Item>{item}</Breadcrumb.Item>
                    }):""
                    
                }
                </Breadcrumb>
                </div>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            
          </Content>
        </Layout>
      </Layout>
    );
  }
}

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
    	theme:state.theme,
        bread:state.bread
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        onchangeTheme:()=>dispatch(changeTheme),
        onchangePath:(path)=>dispatch(changePath(path))
    }
}

Main=connect(mapStateToProps, mapDispatchToProps)(Main);

export default Main;