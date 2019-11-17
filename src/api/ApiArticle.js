import axios from '../config/axios'

// 文章列表
export const getArticleList = (data) => axios('get', `/article/list`, data)

// 文章增加
export const addArticle = (data) => axios('post', `/article/add`, data)

// 文章删除
export const deleteArticle = (id) => axios('delete', `/article/delete/${id}`, {})

// 文章详情
export const getArticleDetail = (id) => axios('get', `/article/detail/${id}`, {})

// 文章更新
export const putArticle = (data) => axios('put', `/article/update`, data)
