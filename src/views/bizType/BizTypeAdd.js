/**
 * Created by wanghao on 2019/11/8
 */
import React from 'react'
import {
  Form,
  Input,
  Button, Spin
} from 'antd';
import { withRouter } from 'react-router'
import { addBizType } from '../../api/ApiBizType'
import moment from 'moment'
import '@/assets/css/article.scss'

const { TextArea } = Input;
// 表单布局
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 13 },
};


class BizTypeAdd extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	render () {
		const { getFieldDecorator } = this.props.form;
		return (
      <Spin spinning={this.state.loading}>
        <div className="shadow-radius">
          <Form
            {...formItemLayout}
            onSubmit={this.handleSubmit.bind(this)}
          >
            <Form.Item label="类型名称：">
              {
                getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: '请输入类型名称'
                    }
                  ]
                })(<Input placeholder="请输入类型名称" />)}
            </Form.Item>
            <Form.Item label="类型简介：">
              {
                getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: '请输入类型简介'
                    }
                  ]
                })(<TextArea rows={4} placeholder="请输入类型简介" />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 4, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
		)
	}

	/**
	 * 提交
	 */
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
			  this.setState({
          loading: true
        });
        let params = values;
        params.createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        addBizType(params).then(res => {
          if (res.status === 200) {
            this.setState({
              loading: false
            });
            this.props.history.push('/bizType/list')
          }
        })
			}
		});
	};
}

const BizTypeAddForm = Form.create({})(BizTypeAdd)

export default  withRouter(BizTypeAddForm)
