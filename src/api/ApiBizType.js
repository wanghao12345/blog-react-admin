import axios from '../config/axios'

// 类型列表
export const getBizTypeList = (data) => axios('get', `/bizType/list`, data)

// 类型增加
export const addBizType = (data) => axios('post', `/bizType/add`, data)

// 类型删除
export const deleteBizType = (id) => axios('delete', `/bizType/delete/${id}`, {})

// 类型详情
export const getBizTypeDetail = (id) => axios('get', `/bizType/detail/${id}`, {})

// 类型更新
export const putBizType = (data) => axios('put', `/bizType/update`, data)
