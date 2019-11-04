import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { getArticleList } from '../../axios/ApiArticle'

class ArticleList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      data: [],
      pagination: {},
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
          width: 170,
          render: () => (
            <span>
              <Button type="primary">编辑</Button>
              <Button type="danger" style={{'marginLeft' : '9px'}}>删除</Button>
            </span>
          )
        }
      ]
    };
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

  /**
   * 获取文章列表数据
   */
  getArticleData () {
    this.setState({
      loading: true
    })
    getArticleList().then((res) => {
      this.setState({
        data: res.data,
        loading: false
      })
    })
  }

  render() {
    return (
      <div className="shadow-radius">
        <Table
          bordered
          columns={this.state.columns}
          dataSource={this.state.data}
          rowKey={record => record.id}
        />
      </div>
    );
  }
}

export default ArticleList;
