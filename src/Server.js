import axios from 'axios'
import { refreshToken, createToken } from './utils'
// CREATE A CLASS TO GET AVAIBLE ACCESS

class Api {
  url = 'http://localhost:10801'

  instance = axios.create({
    baseURL: this.url,
    timeout: 1000
  })

  async createToken () {
    const { data } = await axios.post(`${this.url}/auth/login`, {
      email: 'elesclenderlugo@gmail.com',
      password: '12345M'
    })
    return data.token
  }

  setToken () {
    this.createToken()
      .then(res => localStorage.setItem(res))
  }
}

class ApiConnection extends Api {
  constructor (route) {
    super()
    this.route = route

    this.handleRequest()
    // this.handleRsponse()
  }

  async getAllData () {
    try {
      const { data } = await this.instance.get(this.route.get)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  async createData (body) {
    // const instance = await this.getInstance()
    const { data } = await this.instance.post(this.route.post, body)

    return data
  }

  async deleteData (id) {
    // const instance = await this.getInstance()
    const { data } = await this.instance.delete(`${this.route.delete}/${id}`)
    return data
  }

  async updateData (id, body) {
    // const instance = await this.getInstance()
    const { data } = await this.instance.put(`${this.route.put}/${id}`, body)
    return data
  }

  // HANDLE BEAR AUTHORIZATION
  handleRequest () {
    this.instance.interceptors.request.use(async function (config) {
      if (!localStorage.getItem('token')) {
        const token = await refreshToken()
        config.headers.Authorization = `Bearer ${token}`

        return config
      }

      const token = JSON.parse(localStorage.getItem('token'))

      if (token.expirationTime <= Date.now()) {
        const newToken = await refreshToken()
        config.headers.Authorization = `Bearer ${newToken}`
      } else {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })
  }
}
export default ApiConnection
