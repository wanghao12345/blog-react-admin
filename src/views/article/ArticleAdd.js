/**
 * Created by wanghao on 2019/11/8
 */
import React from 'react'
import {
	Form,
	Input,
	Button,
	Upload,
	Icon
} from 'antd'

import { beforeUpload } from '@/utils/FormMethods'
import { getBase64 } from '@/utils/base64'

// 表单布局
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 },
};


class ArticleAdd extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	render () {
		const { getFieldDecorator } = this.props.form;
		const { imageUrl } = this.state;

		// 上传图片的loading
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">Upload</div>
			</div>
		);

		return (
			<div>
				<Form
					{...formItemLayout}
					onSubmit={this.handleSubmit}
				>
					<Form.Item label="文章标题：">
						{
							getFieldDecorator('title', {
								rules: [
									{
										required: true,
										message: '请输入文章标题'
									}
								]
							})(<Input placeholder="请输入文章标题" />)}
					</Form.Item>
					<Form.Item label="封面图片：">
						{
							getFieldDecorator('coverImage', {
								rules: [
									{
										required: true,
										message: '请选择文章封面图片'
									}
								]
							})(
								<Upload
									name="avatar"
									listType="picture-card"
									className="avatar-uploader"
									showUploadList={false}
									action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
									beforeUpload={beforeUpload}
									onChange={this.handleChange}
								>
									{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
								</Upload>
							)}
					</Form.Item>
					<Form.Item wrapperCol={{ span: 12, offset: 6 }}>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}

	/**
	 * 提交
	 */
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	/**
	 * 上传图片后
	 */
	handleChange = info => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
					imageUrl,
					loading: false,
				}),
			);
		}
	};

}

const ArticleAddForm = Form.create({})(ArticleAdd)

export default ArticleAddForm
