import { Api } from './axios'
import { refreshClientToken, getToken } from './utils'

class ApiClientConnection extends Api {
  constructor (route, username, password) {
    super()

    this.route = route
    this.username = username
    this.password = password

    this.handleRequest()
    this.handleResponse()

    this.instance.interceptors.request.use(async (config) => {
      return getToken({
        config,
        tokenId: 'tokenClient',
        refresher: refreshClientToken,
        header: 'X-API-KEY',
        getTokenType: (token) => `${token}`
      })
    })
  }

  async getAllData () {
    const { data } = await this.instance.get(this.route.get)

    return data.data
  }

  async createData (body) {
    const { data } = await this.instance.post(this.route.post, body)

    return data
  }

  async deleteData () {
    const { data } = await this.instance.delete(`${this.route.delete}`)
    return data
  }

  async updateData (body) {
    const { data } = await this.instance.put(`${this.route.put}`, body)
    return data
  }
}

export default ApiClientConnection
