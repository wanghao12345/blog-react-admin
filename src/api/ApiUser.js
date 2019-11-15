import axios from '../config/axios'

// 登录
export const postLogin = (data) => axios('post', `/login`, data);
