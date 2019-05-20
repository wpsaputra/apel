import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from './pages/home'
import Login from './pages/login'
import Penilaian from './pages/penilaian'
import Rekapb from './pages/rekapb';
import Rekapp from './pages/rekapp';
import Admin from './pages/admin';

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
                <div className="logo"> <Icon type="apple" theme="filled" style={{ fontSize: '40px', color: 'grey' }}/> </div>
                <Menu theme="dark" selectedKeys={[props.location.pathname]} mode="inline">
                  <Menu.Item key="/">
                    <Icon type="home" />
                    <span>Home</span>
                    <NavLink to='/' exact={true}> Home </NavLink>
                  </Menu.Item>
                  <Menu.Item key="/penilaian">
                    <Icon type="calculator" />
                    <span>Penilaian</span>
                    <NavLink to='/penilaian'> Penilaian </NavLink>
                  </Menu.Item>
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="line-chart" />
                        <span>Rekapitulasi</span>
                      </span>
                    }
                  >
                    <Menu.Item key="/rekapp">Per Pegawai <NavLink to='/rekapp'> Per Pegawai </NavLink></Menu.Item>
                    <Menu.Item key="/rekapb">Bulanan <NavLink to='/rekapb'> Bulanan </NavLink></Menu.Item>
                    {/* <Menu.Item key="5">Alex</Menu.Item> */}
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="team" />
                        <span>Registrasi</span>
                      </span>
                    }
                  >
                    <Menu.Item key="/admin">Administrator <NavLink to='/admin'> Administrator </NavLink></Menu.Item>
                    {/* <Menu.Item key="8">Team 2</Menu.Item> */}
                  </SubMenu>
                  {/* <Menu.Item key="9">
                    <Icon type="file" />
                    <span>File</span>
                  </Menu.Item> */}
                </Menu>
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Apel</Breadcrumb.Item>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                  </Breadcrumb>
                  {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
                  <Route exact path="/" component={Home} />
                  <Route path="/penilaian" component={Penilaian} />
                  <Route path="/rekapp" component={Rekapp} />
                  <Route path="/rekapb" component={Rekapb} />
                  <Route path="/admin" component={Admin} />
                  <Route path="/login" component={Login} />

                </Content>
                <Footer style={{ textAlign: 'center' }}>Copyright ©2019 Created by Developers</Footer>
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
