import React, { Component } from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { post } from '../server/request';
import { NavLink } from 'react-router-dom';
class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { userName, password } = values;
                post('/login', {
                    userName,
                    password
                }).then(res => {
                    window.localStorage.setItem('token', res.token);
                    if (res.code === 1) {
                        this.props.history.push('/home/login');
                    }
                })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                {/* 用户名：<input type="text" value={userName} onChange={(e) => {
                    this.setState({
                        userName: e.target.value
                    })
                }} />
                密码：<input type="text" value={password} onChange={(e) => {
                    this.setState({
                        password: e.target.value
                    })
                }} />
                <NavLink to="/register">
                    尚未注册
                </NavLink>
                <button onClick={this.login.bind(this)}>
                    登录
                </button>
                <img src={this.state.list} /> */}

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
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
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住我</Checkbox>)}
                        {/* <a className="login-form-forgot" href="" style={{ float: "right" }}>
                            忘记密码
          </a> */}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                    </Button>
                        或 <NavLink to="/register">
                            立即注册
                    </NavLink>
                    </Form.Item>
                </Form>

            </div>
        );
    }
    login() {
        // post('/login', {
        //     userName: this.state.userName,
        //     password: this.state.password
        // }).then(res => {
        //     window.localStorage.setItem('token', res.token);
        //     if (res.code === 1) {
        //         this.props.history.push('/home/login');
        //     }
        // })
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;