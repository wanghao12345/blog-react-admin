import {baseUrl} from './env'
import axios from 'axios'
import { message } from 'antd'
// import store from '../redux/store'
import { createHashHistory } from 'history';
const history = createHashHistory()

export default async (type = 'GET', url = '', data = {}, callback) => {
  // const state = store.getState()
	let axiosBaseUrl = baseUrl;
	if (url !== '/login') {
		axiosBaseUrl = axiosBaseUrl + '/api'
	}


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
			baseURL: axiosBaseUrl,
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': localStorage.getItem('token')
      },
      data: JSON.stringify(data)
    }).then(res => {
      let result = res.data
        resolve(result)
    }).catch(res => {
    	if (!res.response) {
    		return;
			}
			switch(res.response.status){
				case 401:
					history.push('/login')
					break;
				default:
					break;
			}
      message.error(res.response.data.message);
    })
  })
}
