/**
 * Created by wanghao on 2019/11/8
 */
import React from 'react'
import {
	Form,
	Input,
	Button,
	Upload,
	Icon,
	Checkbox,
	Select
} from 'antd'
import { withRouter } from 'react-router'
import E from 'wangeditor'
import { beforeUpload } from '@/utils/FormMethods'
import { baseUrl } from '@/config/env'
import { addArticle } from '../../api/ApiArticle'
import { getBizTypeList } from '../../api/ApiBizType'
import moment from 'moment'
import '@/assets/css/article.scss'

const { TextArea } = Input;
const { Option } = Select
// 表单布局
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 13 },
};


class ArticleAdd extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			editorContent: '',
			checkedTop: false,
			fileList: [],
			editor: null,
      uploadImgUrl: '',
			articleTypeList: []
		};
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount () {
	  this.getBizTypeList()
		this.initWangEditor()
	}

	render () {
		const { getFieldDecorator } = this.props.form;
		const { imageUrl, articleTypeList } = this.state;

		// 上传图片的loading
		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'} />
				<div className="ant-upload-text">上传</div>
			</div>
		);

		return (
			<div className="shadow-radius">
				<Form
					{...formItemLayout}
					onSubmit={this.handleSubmit.bind(this)}
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
					<Form.Item label="文章类型：">
						{
							getFieldDecorator('typeId', {
								rules: [
									{
										required: true,
										message: '请选择文章类型'
									}
								]
							})(
								<Select placeholder="请选择文章类型">

									{
										articleTypeList.map((res) => {
											return <Option value={res.id} key={res.id}>{res.name}</Option>
										})
									}
								</Select>
							)}
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
									fileList={this.state.fileList}
									showUploadList={false}
									action= {baseUrl + '/upload/file'}
									beforeUpload={beforeUpload}
									onChange={this.handleChange}
									data={(file) => {
										return {
											file: file
										}
									}}
								>
									{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
								</Upload>
							)}
					</Form.Item>
					<Form.Item label="文章简介：">
						{
							getFieldDecorator('description', {
								rules: [
									{
										required: true,
										message: '请输入文章简介'
									}
								]
							})(<TextArea rows={4} placeholder="请输入文章简介" />)}
					</Form.Item>
					<Form.Item label="文章内容：">
						{
							getFieldDecorator('content', {
								rules: [
									{
										required: true,
										message: '请选择创建时间'
									}
								]
							})(<div className="text-area" >
								<div
									ref="editorElemMenu"
									style={{backgroundColor:'#f1f1f1',border:"1px solid #ccc"}}
									className="editorElem-menu">
								</div>
								<div
									style={{
										padding:"0 10px",
										height:300,
										border:"1px solid #ccc",
										overflow: "auto",
										borderTop: "none"
									}}
									ref="editorElemBody"
									className="editorElem-body">
								</div>
							</div>)}
					</Form.Item>
					<Form.Item label="置顶：">
						{
							getFieldDecorator('top', {
								valuePropName: 'checked'
							})(<Checkbox onChange={() => {}}>是否置顶</Checkbox>)}
					</Form.Item>
					<Form.Item wrapperCol={{ span: 4, offset: 6 }}>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}

  /**
   * 类型列表
   */
	getBizTypeList() {
    getBizTypeList().then(res => {
      if (res.status === 200) {
        this.setState({
          articleTypeList: res.data.result.list
        })
      }
    })
  }

	/**
	 * 提交
	 */
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.setFieldsValue({
			content: this.state.editor.txt.html(),
      coverImage: this.state.uploadImgUrl
		});
		this.props.form.validateFields((err, values) => {
			if (!err) {
        let params = values;
        let userInfo = localStorage.getItem('userInfo')
				params.userId = JSON.parse(userInfo).role.type
        params.createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        addArticle(params).then(res => {
          if (res.status === 200) {
            this.props.history.push('/article/list')
          }
        })
			}
		});
	};

	/**
	 * 上传图片后
	 */
	handleChange = info => {
    if (info.file.status === 'uploading') {
			this.setState({ loading: true });
		}
		if (info.file.status === 'done') {
      this.setState({
        imageUrl: baseUrl + info.file.response.data.url,
        uploadImgUrl: info.file.response.data.url,
        loading: false
      })
		}

		this.setState({
      fileList: [info.fileList[info.fileList.length - 1]]
    })
	};

	/**
	 * 初始化富文本编辑器
	 */
	initWangEditor = () => {
		const elemMenu = this.refs.editorElemMenu;
		const elemBody = this.refs.editorElemBody;
		const editor = new E(elemMenu,elemBody)
		// 使用 onchange 函数监听内容的变化，并实时更新到 state 中
		editor.customConfig.onchange = html => {
			this.setState({
				editorContent: editor.txt.html()
			})
		}
		editor.customConfig.menus = [
			'head',  // 标题
			'bold',  // 粗体
			'fontSize',  // 字号
			'fontName',  // 字体
			'italic',  // 斜体
			'underline',  // 下划线
			'strikeThrough',  // 删除线
			'foreColor',  // 文字颜色
			'backColor',  // 背景颜色
			'link',  // 插入链接
			'list',  // 列表
			'justify',  // 对齐方式
			'quote',  // 引用
			'emoticon',  // 表情
			'image',  // 插入图片
			'table',  // 表格
			'video',  // 插入视频
			'code',  // 插入代码
			'undo',  // 撤销
			'redo'  // 重复
		]
		editor.customConfig.uploadImgShowBase64 = true
		editor.create()
		this.setState({
			editor: editor
		})
	}

}

const ArticleAddForm = Form.create({})(ArticleAdd)

export default  withRouter(ArticleAddForm)
