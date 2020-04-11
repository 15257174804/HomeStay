'use strict'
import axios from 'axios'
// import { loadOpen, loadClose } from '@/utils/message'
// init
const service = axios.create({
  timeout: 9000,
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
})
// request
service.interceptors.request.use(config => {
  return config
}, error => {
  Promise.reject(error)
})
// response
service.interceptors.response.use(
  (response) => {
    // loadClose()
  },
  error => {
    // loadClose()
    return Promise.reject(error)
  })

// ajax entry
const suffix = '' // 后缀
const screenProxy = ''
const ajax = function (obj) {
  // loadOpen()
  const _suffix = obj.suffix !== undefined ? obj.suffix : suffix
  let url = screenProxy + obj.url + _suffix
  let type = obj.type ? obj.type.toUpperCase() : 'POST'
  const headers = {
    headers: { 'Content-Type': 'application/json' }
  }
  let params = obj.params
  switch (type) {
    case 'GET':
      return service.get(url, { params: params })
    case 'POST':
      return service.post(url, params)
    case 'PUT':
      return service.put(url, params, headers)
    case 'DELETE':
      return service.delete(url, params, headers)
    default:
      break
  }
}
export default ajax
