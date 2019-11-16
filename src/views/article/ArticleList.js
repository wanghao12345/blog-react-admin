import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Table, Button, Popconfirm, message } from 'antd';
import { getArticleList, deleteArticle } from '../../api/ApiArticle'
import '@/assets/css/article.scss'

class ArticleList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      data: [],
      pagination: {
      	size: 10,
				total: 0,
				current: 1
			},
      loading: false,
      columns: [
        {
          title: '文章标题',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '简介',
          dataIndex: 'description',
          key: 'description'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
					width: 200,
        },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          fixed: 'right',
          width: 180,
          render: (text, record) => (
            <span>
              <Button type="primary">
								<Link to={'/article/edit/' + record.id}>编辑</Link>
							</Button>
              <Popconfirm
                title="确定删除吗？"
                onConfirm={() => {
                  this.handleDeleteClick(record)
                }}
                okText="确定"
                cancelText="取消"
              >
                <Button
                  type="danger"
                  style={{'marginLeft' : '9px'}}
                >删除</Button>
              </Popconfirm>
            </span>
          )
        }
      ]
    };
    this.handleTableChange = this.handleTableChange.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  componentWillMount() {
    this.getArticleData()
  }

  componentWillUnmount() {
    // componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
    this.setState = () => {
      return;
    };
  }


	render() {
		return (
			<div className="shadow-radius">
				<div className="btn-box">
					<Button size='large'><Link to="/article/add">增加</Link></Button>
				</div>
				<Table
					bordered
					columns={this.state.columns}
          loading={this.state.loading}
					dataSource={this.state.data}
					rowKey={record => record.id}
					pagination={this.state.pagination}
					onChange={this.handleTableChange}
				/>
			</div>
		);
	}

	/**
	 * 分页
	 */
	handleTableChange (pagination) {
		const pager = { ...this.state.pagination };
		pager.current = pagination.current;
		this.setState({
			pagination: pager
		}, () => {
			this.getArticleData()
		});
	}

  /**
   * 获取文章列表数据
   */
  getArticleData () {
    this.setState({
      loading: true
    })
    getArticleList({
			p: this.state.pagination.current,
			size: this.state.pagination.size
		}).then((res) => {
		  if (res.status === 200) {
        const pagination = { ...this.state.pagination };
        pagination.total = res.data.result.total;
        this.setState({
          data: res.data.result.list,
          pagination
        })
      }
      this.setState({
        loading: false,
      })
    })
  }


  /**
   * 删除
   */
  handleDeleteClick(record) {
    deleteArticle(record.id).then(res => {
      if (res.status === 200) {
        message.success("删除成功", 1, () => {
          this.getArticleData()
        })
      }
    })
  }

}

export default ArticleList;
