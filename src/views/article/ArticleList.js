import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Table, Button } from 'antd';
import { getArticleList } from '../../api/ApiArticle'
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
          key: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          width: 180,
          render: () => (
            <span>
              <Button type="primary"><Link to="/article/edit">编辑</Link></Button>
              <Button type="danger" style={{'marginLeft' : '9px'}}>删除</Button>
            </span>
          )
        }
      ]
    };
    this.handleTableChange = this.handleTableChange.bind(this)
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

}

export default ArticleList;
