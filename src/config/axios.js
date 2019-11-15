import {baseUrl} from './env'
import axios from 'axios'
import { message } from 'antd'
import store from '../redux/store'

export default async (type = 'GET', url = '', data = {}, callback) => {
  const state = store.getState()
  url = baseUrl + url
  if (type.toUpperCase() === 'GET') { // 拼接参数
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }
	return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': state.token
      },
      data: data
    }).then(res => {
      let result = res.data
        resolve(result)
    }).catch(res => {
      // resolve(res.response.data)
      message.error('请求失败！');
    })
  })
}
