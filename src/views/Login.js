import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Form, Icon, Input, Button, message, Spin } from 'antd';
import { connect } from 'react-redux';
import { setUserInfo } from '@/redux/actions/userInfo';
import { setToken } from '@/redux/actions/token';
import { postLogin } from '@/api/ApiUser'
import '@/assets/css/login';

const FormItem = Form.Item;
class Login extends Component {
	state = {
		clientHeight: document.documentElement.clientHeight || document.body.clientHeight,
		loading: false
	};
	constructor(props) {
		super(props);
		this.onResize = this.onResize.bind(this);
	}
	login = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({loading: true})
        postLogin(values).then(res => {
					this.setState({loading: false})
          if (res.status === 200) {
						message.success(res.message);

            this.props.setToken(res.data.token);
            this.props.setUserInfo(Object.assign({}, values, { role: { type: res.data.result.id, name: res.data.result.nickname } }));
            localStorage.setItem('isLogin', '1');
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userInfo', JSON.stringify(Object.assign({}, values, { role: { type: res.data.result.id, name: res.data.result.nickname } })));
            this.props.history.push('/dashboard');
          } else {
						message.error(res.message);
					}
        });
			} else {
				console.log(err);
			}
		});
	};
	componentDidMount() {
		window.addEventListener('resize', this.onResize);
	}
	componentWillUnmount() {
		window.addEventListener('resize', this.onResize);
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}
	onResize() {
		this.setState({ clientHeight: document.documentElement.clientHeight || document.body.clientHeight });
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Spin spinning={this.state.loading}>
				<div className="container">
					<Particles
						height={this.state.clientHeight - 5 + 'px'}
						params={{
							number: { value: 50 },
							ize: { value: 3 },
							interactivity: {
								events: {
									onhover: { enable: true, mode: 'repulse' }
								}
							}
						}}
					/>
					<div className="content">
						<div className="title">后台管理系统</div>
						<Form className="login-form">
							<FormItem>
								{getFieldDecorator('username', {
									rules: [{ required: true, message: '请填写用户名！' }]
								})(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('password', {
									rules: [{ required: true, message: '请填写密码！' }]
								})(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />)}
							</FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit" block onClick={this.login}>
									登录
								</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Spin>
		);
	}
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setUserInfo: data => {
		dispatch(setUserInfo(data));
	},
  setToken: data => {
	  dispatch(setToken(data))
  }
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form.create()(Login));
