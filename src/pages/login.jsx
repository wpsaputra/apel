import React, { Component } from 'react'
// import 'antd/dist/antd.css';
import './login.css';
import { Form, Icon, Input, Button, Checkbox, Card, Popover } from 'antd';
import { url_login } from '../constant/constant';

const axios = require('axios');
// const url_login = "http://localhost/login.php";
// const url_login = "http://10.74.8.176/login.php";

export class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth,
      visible: false,
    };
    this.signIn = this.signIn.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.signIn(values);
      }

    });
  };

  signIn(values) {
    var self = this;
    axios.post(url_login, values)
      .then(function (response) {
        // handle success
        console.log(response.data);
        if (JSON.stringify(response.data).includes('Error')) {
          self.props.form.setFields({
            password: {
              errors: [new Error('Incorrect username or password')],
            },
          });
          return;
        }

        let newAuth = self.state.auth;
        newAuth.isSignedIn = true;
        newAuth.id_gol = response.data.id_gol;
        newAuth.id_org = response.data.id_org;
        newAuth.id_satker = response.data.id_satker;
        newAuth.nama = response.data.nama;
        newAuth.niplama = response.data.niplama;
        newAuth.id_level = response.data.id_level;
        newAuth.nm_satker = response.data.nm_satker;
        newAuth.date = new Date();

        self.setState({ auth: newAuth });
        localStorage.setItem("apel-state", JSON.stringify(self.state));
        self.props.history.push("/");

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });


  }

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // console.log(localStorage.getItem("apel-state"));
    return (
      <div className="Aligner">
        <div className="Aligner-item">
          <Card style={{ width: "300px" }}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <Popover
                  content={<a onClick={this.hide}>Close</a>}
                  title="Forget Password"
                  content="Gunakan username dan password yang sama dengan daily activity"
                  trigger="click"
                  visible={this.state.visible}
                  onVisibleChange={this.handleVisibleChange}
                >
                  <a className="login-form-forgot" href="javascript:;">
                    Forgot password
                  </a>
                </Popover>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                {/* Or <a href="">register now!</a> */}
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(login);

// export default login
export default WrappedNormalLoginForm
