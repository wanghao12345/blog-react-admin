/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl：域名地址
 * routerMode：路由模式
 */
let baseUrl
let routerMode

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://127.0.0.1:8080'
  routerMode = 'hash'
} else {
  baseUrl = 'https://api.sunjingxuetang.com'
  routerMode = 'hash'
}

export {
  baseUrl,
  routerMode
}
