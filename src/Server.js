import axios from 'axios'
// CREATE A CLASS TO GET AVAIBLE ACCESS

class ApiConnection {
  constructor (route) {
    this.url = 'http://20.102.31.112:10801'
    this.route = route
  }

  async getToken () {
    const { data } = await axios.post(`${this.url}/auth/login`, {
      email: 'elesclenderlugo@gmail.com',
      password: '12345M'
    })
    return data.token
  }

  async getInstance () {
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

    return data
  }

  async createData (body) {
    const instance = await this.getInstance()
    const { data } = await instance.post(this.route.post, body)

    return data
  }

  async deleteData (id) {
    const instance = await this.getInstance()
    const { data } = await instance.delete(`${this.route.delete}/${id}`)
    return data
  }

  async updateData (id, body) {
    const instance = await this.getInstance()
    const { data } = await instance.put(`${this.route.put}/${id}`, body)
    return data
  }
}

export default ApiConnection
