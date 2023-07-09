import axios from 'axios'
// CREATE A CLASS TO GET AVAIBLE ACCESS

class ApiClientConnection {
  constructor (route, username, password) {
    this.url = 'http://localhost:10801'
    this.route = route
    this.username = username
    this.password = password
  }

  async getToken () {
    const { data } = await axios.post(`${this.url}/auth/login`, {
      email: 'elesclenderlugo@gmail.com',
      password: '12345M'
    })
    return data.token
  }

  async getClientToken () {
    const token = await this.getToken()
    const { data } = await axios.post(`${this.url}/regularClient/login`, {
      username: this.username,
      password: this.password
    }, {
      headers: { Authorization: token }
    })
    return data.token
  }

  async getInstance () {
    const token = await this.getToken()
    const tokenClient = await this.getClientToken()
    const api = axios.create({
      baseURL: this.url,
      timeout: 1000,
      headers: { Authorization: token, 'X-API-KEY': tokenClient }
    })

    return api
  }

  async getRegisterInstance () {
    const token = await this.getToken()
    const api = axios.create({
      baseURL: this.url,
      timeout: 1000,
      headers: { Authorization: token }
    })

    return api
  }

  async getAllData () {
    const instance = await this.getInstance()
    const { data } = await instance.get(this.route.get)

    return data.data
  }

  async createData (body) {
    const instance = await this.getRegisterInstance()
    const { data } = await instance.post(this.route.post, body)

    return data
  }

  async deleteData () {
    const instance = await this.getInstance()
    const { data } = await instance.delete(`${this.route.delete}`)
    return data
  }

  async updateData (body) {
    const instance = await this.getInstance()
    const { data } = await instance.put(`${this.route.put}`, body)
    return data
  }
}

export default ApiClientConnection
