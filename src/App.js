import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from './pages/home'
import Login from './pages/login'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    // console.log(collapsed);
    // console.log(location);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Route render={(props) => {
          // console.log(props.location)
          return (
            <Layout style={{ minHeight: '100vh' }}>
              <Sider breakpoint="lg" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" selectedKeys={[props.location.pathname]} mode="inline">
                  <Menu.Item key="/">
                    <Icon type="pie-chart" />
                    <span>Home</span>
                    <NavLink to='/' exact={true}> Home </NavLink>
                  </Menu.Item>
                  <Menu.Item key="/login">
                    <Icon type="desktop" />
                    <span>Login</span>
                    <NavLink to='/login'> Home </NavLink>
                  </Menu.Item>
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="user" />
                        <span>User</span>
                      </span>
                    }
                  >
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="team" />
                        <span>Team</span>
                      </span>
                    }
                  >
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="9">
                    <Icon type="file" />
                    <span>File</span>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                  {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />

                </Content>
                <Footer style={{ textAlign: 'center' }}>Apel ©2019 Created by Developers</Footer>
              </Layout>
            </Layout>
          )
        }} />

      </Router>
    );
  }
}

// export default App;
export default App;
