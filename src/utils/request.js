import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    switch (res.code) {
      case 50008:
        MessageBox.confirm("大佬请重新登陆！", {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          })
        })
        return Promise.reject(new Error(res.message || 'er'))
      case 200003:
        res.data.map(item => {
          setTimeout(() => {
            Message({
              message: item.msg || 'Error',
              type: 'error',
              duration: 5 * 1000
            })
          }, 0);
        })

        return Promise.reject(new Error(res.message || 'Error'))
      default:
        return res

    }
  },
  error => {
    // 现在的话 代码是没有走上面 直接来到这里请求失败了
    // 因为请求失败了 所以直接去看看官方文档中 对应的错误拦截是否有案例 然后直接复制案例 看看输出的结果有没有符合预期的值
    console.log('请求失败', error) // for debug
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('请求失败1', error.response.data);
      console.log('请求失败1', error.response.status);
      switch (error.response.status) {
        case 50008:
          // MessageBox.confirm 这个是弹出窗口
          // MessageBox.confirm("大佬请重新登陆！", {
          //   confirmButtonText: 'Re-Login',
          //   cancelButtonText: 'Cancel',
          //   type: 'warning'
          // }).then(() => {
          //   store.dispatch('user/resetToken').then(() => {
          //     location.reload();
          //   })
          // })
          // Message  是弹出一个通知 error.message 是错误消息（前端或者浏览器的）
          // error.response.data 这个是后端返回的数据 如果返回字符串可以直接使用 返回对象 就需要 对象.属性来使用
          Message({
            // message: error.response.data,//这时候 因为状态码50008的返回内容是没有传Token  所以就会弹出这个文字内容
            message: '请登录哦！使用更多的功能~(可能是登陆超时）',
            type: 'info',
            duration: 5 * 1000
          })
          return
        case 200003:
          error.response.data.map(item => {
            setTimeout(() => {
              Message({
                message: item.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
              })
            }, 0);
          })
          return
        case 500:
          Message({
            message:'操作繁忙',
            type: 'error',
            duration: 5 * 1000
          })
          return
        default:
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
      }
    }
    console.log(error.config);

    return Promise.reject(error)
  }
)

export default service
