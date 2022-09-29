import axios from 'axios'

let callback401: any = null

export function set401Callback(cb: any) {
  callback401 = cb
}

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error

    if (response && response.status === 401 && callback401) {
      callback401(response.data.message)
    }

    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use(
  config => {
    console.log(`[${config.method}]: ${config.url}`)
    config.headers = {
      ...config.headers
      // authorization: getToken(),
    }

    return config
  },
  error => Promise.reject(error)
)

export { axiosInstance as axios }
