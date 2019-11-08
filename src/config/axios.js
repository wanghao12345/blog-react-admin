import {baseUrl} from './env'
import axios from 'axios'

export default async (type = 'GET', url = '', data = {}, callback) => {
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
	console.log(url);
	return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: data
    }).then(res => {
      let result = res.data
        resolve(result)
    }).catch(res => {
      resolve(res.response.data)
    })
  })
}
