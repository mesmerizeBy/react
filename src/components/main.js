 import React from 'react';
import ReactDOM from 'react-dom';
import KitCal from './kitCal.js';
import Article from './article.js';
import { Layout, Menu, Icon,Switch ,Avatar,Breadcrumb ,Row, Col} from 'antd';
import { Route,Link ,Switch as Sroute,Redirect} from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import {connect } from 'react-redux';
import LoginForm from './login.js';
import {changeTheme,changePath} from './action/maina.js';
import {Login} from './action/maina.js';
import EditorMo from './write.js';
import request from './util/request.js';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


var link={
    "":["1","我"],
    "MyProfile":['1','我'],
    "Article":['2','文章'],
    "BlockWallet":['3','区块链'],
    "recommend":['4','推荐'],
    "collection":['5','收藏柜'],
    "tool":['6','工具箱'],
    "aboutBT":["2","区块链技术"],
    "console":["7","入口"],
    "write":["7","控制台"]
  }
class Main extends React.Component {
  state = {
    collapsed: false,
    current: '1',
    manage:[
        <Menu.Item key="7" >
            <Link to="/console/write" >
                <Icon type="select" />
                <span>入口</span>
            </Link>
        </Menu.Item>
    ],
    top:[
        <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to="/console/write" ><Icon type="edit" /><span>写文章</span></Link></Menu.Item>
        <Menu.Item key="2"><Icon type="eye-o" /><span>掌控</span></Menu.Item>
        <Menu.Item key="3"><Icon type="loading-3-quarters" /><span>未定</span></Menu.Item>
      </Menu>
    ]
  }
  constructor(props){
    super(props);
    request.post('/login',{}).then((response)=>response.json()).then(function(res){
        
        if(res.status==1){
            props.onLogin();
        }
    })
  }
  
  
  componentDidMount() {
    
    var n=this.props.location.pathname.split("/");
    if(typeof(link[n[1]])!=='undefined')
    this.setState({current:link[n[1]][0]});
  }
  componentWillReceiveProps(props){
    
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
    // console.log(this.props)
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
                    <Menu.Item key="1" ><Link to="/MyProfile" ><Icon type="profile" />我</Link></Menu.Item>
                </SubMenu>
                    <Menu.Item key="2">
                        <Link to="/Article" >
                            <Icon type="file-text" />
                            <span>文章</span>
                        </Link>
                    </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/BlockWallet" >
                        <Icon type="api" />
                        <span>区块链</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" >
                    <Link to="/recommend">
                        <Icon type="ellipsis" />
                        <span>推荐</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5" >
                    <Link to="/collection" >
                        <Icon type="appstore" />
                        <span>收藏柜</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="6" >
                    <Link to="/tool" >
                        <Icon type="tool" />
                        <span>小工具</span>
                    </Link>
                </Menu.Item>
                {
                    this.props.theme=="light"?this.state.manage:null
                }
            </Menu>
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
          <Row>
                <Col span={1}><Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} /></Col>
                <Col span={4}>
                
                <Breadcrumb style={{ "line-height": '64px' }}>
                    <QueueAnim className="demo-content" type={['left', 'right']}>
                        <div key={this.props.location.pathname} style={{position:"absolute",top:"0"}}>
                            <QueueAnim className="demo-content" type={['left', 'right']}>
                            {
                                this.props.location.pathname.split("/").filter(e=> e!=""&&typeof(link[e])!=='undefined').map(e=>link[e][1]).map((item, index)=>{
                                    return  <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                                })
                            }
                            </QueueAnim >
                        </div>
                    </QueueAnim >
                </Breadcrumb>
                </Col>
                <Col span={10}>
                {
                    this.props.isLogin?this.state.top:null
                }
                </Col>
            </Row>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,overflow:'auto' }}>
                <Sroute>
                    <Route  path='/Article' component={Article}/>
                    <Route  path='/console' exact component={LoginForm}/>
                    <Route  path='/console/write' exact render={(props)=>this.props.isLogin?<EditorMo {...props} />:(<Redirect to={{pathname: '/console'}} />)}/>
                    <Redirect  to={{pathname: '/MyProfile'}} />
                </Sroute>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        isLogin:state.mainState.isLogin,
    	theme:state.mainState.theme
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        onLogin:()=>dispatch(Login),
        onchangeTheme:()=>dispatch(changeTheme),
    }
}

Main=connect(mapStateToProps, mapDispatchToProps)(Main);

export default Main;