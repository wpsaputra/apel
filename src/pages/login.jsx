import React, { Component } from 'react'
// import 'antd/dist/antd.css';
import './login.css';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';

export class login extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   auth: this.props.auth
    // };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      let newAuth = this.state.auth;
      // newAuth.isSignedIn = true;
      // this.setState({auth: newAuth});
      
      // console.log("this.props");
      // console.log(this.state.auth);

      // this.props.signIn();
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props);
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
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
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

const WrappedNormalLoginForm = Form.create({ name: 'normal_login'})(login);

// export default login
export default WrappedNormalLoginForm
