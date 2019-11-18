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
import { putBizType, getBizTypeDetail } from '../../api/ApiBizType'
import moment from 'moment'
import '@/assets/css/article.scss'
import { getArticleDetail } from '../../api/ApiArticle';

const { TextArea } = Input;
// 表单布局
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 13 },
};


class BizTypeEdit extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getBizTypeDetail()
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
   * 类型详情
   */
  getBizTypeDetail () {
    const id = this.props.match.params.id;
    this.setState({
      loading: true,
      id: id
    });
    getBizTypeDetail(id).then(res => {
      if (res.status === 200) {
        const data = res.data.data;
        this.props.form.setFieldsValue({
          name: data.name,
          description: data.description,
        });
        this.setState({
            loading: false
          }
        )
      }
    })

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
        putBizType(params).then(res => {
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

const BizTypeEditForm = Form.create({})(BizTypeEdit)

export default  withRouter(BizTypeEditForm)
