import axios from '../config/axios'

// 文章列表
export const getArticleList = (data) => axios('get', `/api/article/list`, data)
