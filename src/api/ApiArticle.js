import axios from '../config/axios'

// 文章列表
export const getArticleList = (data) => axios('get', `/api/article/list`, data)

// 文章增加
export const addArticle = (data) => axios('post', `/api/article/add`, data)
