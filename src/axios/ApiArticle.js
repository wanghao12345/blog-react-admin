import axios from './$axios'

// 文章列表
export const getArticleList = (data) => axios({method: 'get', url: '/api/article/list', data: data})
