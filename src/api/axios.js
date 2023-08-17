import axios from 'axios'
import { refreshToken, getToken } from '../utils'

export class Api {
  instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 1000
  })

  handleRequest () {
    this.instance.interceptors.request.use(async function (config) {
      return getToken({
        config,
        tokenId: 'token',
        refresher: refreshToken,
        header: 'Authorization',
        getTokenType: (token) => `Bearer ${token}`
      })
    })
  }

  handleResponse () {
    this.instance.interceptors.response.use(config => config,
      async (error) => {
        const newToken = await refreshToken()
        error.config.headers.Authorization = `Bearer ${newToken}`

        return axios.request(error.config)
      })
  }
}
