/**
 * axios请求的拦截及响应的统一
 */
export default ({ isDev, $axios, redirect, token, devProxy, message }) => {
  // 请求回调
  $axios.onRequest((config) => {
    if (isDev) {
      if (token) {
        config.headers.common.Authorization = 'Bearer ' + token
      }
      // 开发环境下动态代理到不同的服务
      devProxy.map((r) => {
        if (config.url.startsWith(r.startsWith)) {
          config.baseURL = r.baseURL // prefix
        }
      })
    }
  })
  // 响应回调
  $axios.onResponse((res) => {
    // debugger
    // return res.data
  })
  // 错误处理
  $axios.onError((err) => {
    if (err && err.response) {
      const { status } = err.response
      if (status === 401 && !isDev) {
        redirect(200, getLoginUrl())
      } else {
        message.error(err.message)
      }
    }
    return false
  })

  // jsonp
  $axios.jsonp = (url) => {
    return new Promise((resolve, reject) => {
      if (!url) {
        reject(new Error('Axios.JSONP 至少需要一个url参数!'))
      } else {
        const jsonCallBack = `jsonCallBack${new Date().getTime()}`
        window[jsonCallBack] = (result) => {
          resolve(result)
        }
        const JSONP = document.createElement('script')
        JSONP.type = 'text/javascript'
        JSONP.src = `${url}?callback=${jsonCallBack}`
        document.getElementsByTagName('head')[0].appendChild(JSONP)
        setTimeout(() => {
          document.getElementsByTagName('head')[0].removeChild(JSONP)
        }, 500)
      }
    })
  }
}

const getLoginUrl = () => {
  let dnsUrl = '/login'
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location
    dnsUrl = `${protocol}//${host}/login`
  }
  return dnsUrl
}
