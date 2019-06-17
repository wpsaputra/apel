import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { Avatar } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Login extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };

    onLogout = () => {
        localStorage.removeItem("apel-state");
        this.props.history.push("/login");
    }


    render() {
        const { children, ...rest } = this.props;
        let path = "404";
        switch (this.props.location.pathname) {
            case "/":
                path = "Home";
                break;
            case "/panduan":
                path = "Panduan";
                break;
            case "/penilaian":
                path = "Penilaian";
                break;
            case "/rekapb":
                path = "Rekap Bulanan";
                break;
            case "/rekapp":
                path = "Rekap per Pegawai";
                break;
            case "/rekapu":
                path = "Rekap per Unit Kerja";
                break;
            case "/admin":
                path = "Administrator";
                break;
            case "/faq":
                path = "FAQ";
                break;
        }
        let avatarLink = "https://sultradata.com/project/daily-activity/images/foto/$niplama.jpg";
        let niplama = this.props.auth.niplama;
        avatarLink = avatarLink.replace("$niplama", niplama);
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider breakpoint="lg" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo"> <Icon type="apple" theme="filled" style={{ fontSize: '40px', color: 'grey' }} /> </div>
                        <Menu theme="dark" selectedKeys={[this.props.location.pathname]} mode="inline">
                            <Menu.Item key="/">
                                <Icon type="home" />
                                <span>Home</span>
                                {/* <NavLink to='/' exact={true}> Home </NavLink> */}
                                <NavLink to='/'> Home </NavLink>
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
                                <Menu.Item key="/rekapu">Per Unit Kerja <NavLink to='/rekapu'> Per Unit Kerja </NavLink></Menu.Item>
                                {/* <Menu.Item key="5">Alex</Menu.Item> */}
                            </SubMenu>
                            {/* <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="team" />
                                        <span>Registrasi</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="/admin">Administrator <NavLink to='/admin'> Administrator </NavLink></Menu.Item>
                            </SubMenu> */}
                            <Menu.Item key="/faq">
                                <Icon type="book" />
                                <span>FAQ</span>
                                <NavLink to='/faq'> FAQ </NavLink>
                            </Menu.Item>
                            {/* <Menu.Item key="/login">
                                <Icon type="login" />
                                <span>Login</span>
                                <NavLink to='/login'> Login </NavLink>
                            </Menu.Item> */}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <Menu
                                theme="light"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                style={{ lineHeight: '64px', background: '#fff', padding: 0, float: 'right', marginRight: '15px' }}
                            >

                                <Menu.Item key="/logout" onClick={this.onLogout}>
                                    {/* <NavLink to='/login'><Icon type="rocket" />Logout</NavLink> */}
                                    <Icon type="rocket" />Logout
                                </Menu.Item>
                            </Menu>
                            <Avatar
                                icon="user"
                                src={avatarLink}
                                // style={{ position: 'relative', lineHeight: '64px', background: '#fff', padding: 0, float: 'right' }}
                                style={{ position: 'relative', marginTop: '20px', padding: 0, float: 'right' }}
                            />
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Apel</Breadcrumb.Item>
                                {/* <Breadcrumb.Item>Home</Breadcrumb.Item> */}
                                <Breadcrumb.Item>{path}</Breadcrumb.Item>
                                {/* <Breadcrumb.Item>{this.props.location.pathname}</Breadcrumb.Item> */}
                            </Breadcrumb>
                            {children}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Copyright ©2019 Created by Developers</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

const dashboard = withRouter(props => <Login {...props} />);

export default dashboard;